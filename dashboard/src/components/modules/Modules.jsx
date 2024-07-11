import React, { useState, useEffect } from "react";
import axios from "axios";
import "./modules.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import CourseIMG from "../../assets/courses.jpg";

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

const Modules = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [module, setModule] = useState([]);

  const [course, setCourse] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [videonumber, setVideoNumber] = useState("");
  const [modulenumber, setModuleNumber] = useState("");
  const [discription, setDiscription] = useState("");
  const [tag, setTag] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const result = await axios.get("http://localhost:5000/api/module");
        setModule(result.data);
        console.log(result.data);
      } catch (error) {
        console.log("the error is ", error);
        if (error.response && error.response.status === 401) {
          navigate("/");
        }
      }
    };
    fetchContacts();
  }, []);

  const handleEdit = (_id) => {
    navigate(`/editmodule/${_id}`);
  };

  let subtitle;

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleFileChangeImg = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "course":
        setCourse(value);
        break;
      case "title":
        setTitle(value);
        break;
      case "videonumber":
        setVideoNumber(value);
        break;
      case "modulenumber":
        setModuleNumber(value);
        break;
      case "discription":
        setDiscription(value);
        break;
      case "tag":
        setTag(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("course", course);
    formData.append("title", title);
    formData.append("videonumber", videonumber);
    formData.append("modulenumber", modulenumber);
    formData.append("discription", discription);
    formData.append("tag", tag);

    try {
      console.log("form data ",formData )
      const response = await axios.post(
        "http://localhost:5000/api/module",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setModule([...module, response.data]);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      console.error("Error uploading the course data", error);
    }

    setCourse("");
    setTitle("");
    setVideoNumber("");
    setModuleNumber("");
    setDiscription("");
    setTag("");
    setFile(null);

    closeModal();
  };

  const handleDelete = async (courseId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/module/${courseId}`);

      if (response.status === 200) {
        alert("Course deleted:");
        window.location.reload();
      } else {
        alert("Failed to delete course:");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="p-2">
      <div className="courses">
        <div className="courses_page_header">
          <div className="courses_page_head">
            <h2 className="h2 text-white">Available Courses</h2>
            {/* <p>Whole data about your business here</p> */}
          </div>
          <div className="courses_page_button">
            <input type="button" value="Add Courses" onClick={openModal} />
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal_wrapper">
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Fill the details!</h2>
            <button className="close_btn" onClick={closeModal}>
              <IoIosCloseCircleOutline />
            </button>
            <form className="modal_form" onSubmit={handleSubmit}>
              <label>
                Upload Image
                <input
                  type="file"
                  id="myFile"
                  name="image"
                  onChange={handleFileChangeImg}
                />
              </label>
              <label>
                Course
                <input
                  type="text"
                  placeholder="Enter course name"
                  name="course"
                  value={course}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Title
                <input
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  value={title}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Video Number
                <input
                  type="text"
                  placeholder="Enter video number"
                  name="videonumber"
                  value={videonumber}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Module Number
                <input
                  type="text"
                  placeholder="Enter module number"
                  name="modulenumber"
                  value={modulenumber}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Description
                <input
                  type="text"
                  placeholder="Enter description"
                  name="discription"
                  value={discription}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Tag
                <input
                  type="text"
                  placeholder="Enter tag"
                  name="tag"
                  value={tag}
                  onChange={handleInputChange}
                />
              </label>
              <input
                className="create_course_btn"
                type="submit"
                value="Create Course"
              />
            </form>
          </div>
        </Modal>

        <div className="table">
          <table>
            <div className="table_wrapper">
              <tr className="heading_row">
                <th>#ID</th>
                <th>IMAGE</th>
                <th>COURSES</th>
                <th>NAME</th>
                {/* <th>PRICE</th> */}
                <th>DETAIL</th>
                <th>Tag</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
              {module.map((course) => (
                <tr key={course._id}>
                  <td>{`0${course._id}`}</td>
                  <td>
                    <img src={course.image} alt={course.title} />
                  </td>
                  <td>{course.course}</td>
                  <td>{course.title}</td>
                  {/* <td className="price">₹{course.price}</td> */}
                  <td>{course.discription}</td>
                  <td>{course.tag}</td>
                  <td className="edit_btn">
                    <input
                      type="button"
                      value="Edit Info"
                      onClick={() => handleEdit(course._id)}
                    />
                  </td>
                  <td className="delete_btn">
                    <input
                      onClick={() => handleDelete(course._id)}
                      type="button"
                      value="Delete"
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
};

export default Modules;
