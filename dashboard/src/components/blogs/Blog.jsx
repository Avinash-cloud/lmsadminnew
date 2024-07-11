import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const quillModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blogs")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the blogs!", error);
      });
  }, []);

  const handleEdit = (_id) => {
    navigate(`/blogs/${_id}`);
  };

  let subtitle;

  const openModal = () => {
    setIsOpen(true);
  };

  const handleFileChangeimg = (e) => {
    setFile(e.target.files[0]);
  };

  const afterOpenModal = () => {
    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) {
      formData.append("cardImage", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/blogs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ); // Replace with your API endpoint
      console.log("Response:", response.data);
      setBlogs([...blogs, response.data]); // Update the list of blogs
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    closeModal();
  };

  const handleDelete = async (courseId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/blogs/${courseId}`
      );

      if (response.status === 200) {
        alert("Course deleted:");
        setBlogs(blogs.filter((blog) => blog._id !== courseId)); // Update the list of blogs
      } else {
        alert("Blog to delete course:");
      }
    } catch (error) {
      console.log(error);
      console.error("Error deleting Blog:", error);
    }
  };

  return (
    <div>
      <div className="courses ml-2 rounded-sm">
        <div className="courses_page_header">
          <div className="courses_page_head">
            <h2 className="h2 text-stone-50 ml-3">Available blogs</h2>
          </div>
          <div className="courses_page_button">
            <input type="button" value="Add Webinar" onClick={openModal} />
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal_wrapper mt-2">
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
              Fill the details!
            </h2>
            <button className="close_btn" onClick={closeModal}>
              <IoIosCloseCircleOutline />
            </button>
            <form className="modal_form" onSubmit={handleSubmit}>
              <label>
                Upload Image
                <input
                  type="file"
                  id="cardImage"
                  name="cardImage"
                  onChange={handleFileChangeimg}
                />
              </label>
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label>Content:</label>
                <ReactQuill
                  value={content}
                  onChange={setContent}
                  modules={quillModules}
                  formats={quillFormats}
                />
              </div>
              <button type="submit">Save</button>
            </form>
          </div>
        </Modal>

        <div className="table mt-4">
          <table className="rounded-md">
            <div className="table_wrapper">
              <tr className="heading_row">
                <th>IMAGE</th>
                <th>TITLE</th>
                <th>DATE</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
              {blogs.map((course) => (
                <tr key={course._id}>
                  <td>
                    <img
                      src={course.cardImage}
                      alt={course.name}
                      height={100}
                      width={100}
                    />
                  </td>
                  <td>{course.title}</td>
                  <td>
                    {course.date}&nbsp; {course.year}
                  </td>
                  <td className="edit_btn">
                    <input
                      type="button"
                      value="Edit Info"
                      onClick={() => handleEdit(course._id)}
                    />
                  </td>
                  <td className="delete_btn">
                    <input
                      type="button"
                      value="Delete"
                      onClick={() => handleDelete(course._id)}
                    />
                  </td>
                </tr>
              ))}
            </div>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
