import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import Modal from 'react-modal';
import { IoIosCloseCircleOutline } from "react-icons/io";

import CourseIMG from '../../assets/courses.jpg'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Webinar = () => {
  const navigate = useNavigate();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [module, setModule] = useState([]);
  const [course, setCourse] = useState("");
  const [title, setTitle] = useState("");
  const [webinar, setWebinar] = useState([]);
  const [img, setImg] = useState("");
  const [videonumber, setVideoNumber] = useState("");
  const [modulenumber, setModuleNumber] = useState("");
  const [discription, setDiscription] = useState("");
  const [tag, setTag] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const result = await axios.get('http://localhost:5000/api/webinar');
        setWebinar(result.data);
        console.log(result.data);
      } catch (error) {
        console.log("the erro is ", error);
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
      }
    };
    fetchContacts();

  }, []);

  const handleEdit = (_id) => {
    navigate(`/webinar/${_id}`);
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

  const [user, setUser] = useState({
    title: '',
    price: '',
    date: '',
    time: '',
    

  });


  const handleChange = (e) => {
    const { name, value} = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]:  value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/webinar', user); // Replace with your API endpoint
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    closeModal();
  };


  const handleDelete = async (courseId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/webinar/${courseId}`);

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
    <div >
      <div className="courses ml-2 rounded-sm">
        <div className="courses_page_header">
          <div className="courses_page_head">
            <h2 className='h2 text-stone-50 ml-3'>Available Webinars</h2>

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
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Fill the details!</h2>
            <button className='close_btn' onClick={closeModal}>
              <IoIosCloseCircleOutline />
            </button>
            <form className='modal_form'>
              {/* <label>
              Upload Image
              <input type="file" id="myFile" name="image" onChange={handleFileChange} />
            </label> */}
              <label>
                Title
                <input type="text" placeholder='Enter title of webinar' name="title" value={user.title} onChange={handleChange} />
              </label>
              <label>
                Price
                <input type="text" placeholder='Enter price' name="price" value={user.price} onChange={handleChange} />
              </label>
              <label>
                Date
                <input type="date" placeholder='Enter date' name="date" value={user.date} onChange={handleChange} />
              </label>
              <label>
                Date
                <input type="text" placeholder='Enter time' name="time" value={user.time} onChange={handleChange} />
              </label>
              <input className='create_course_btn' type="button" value="Create Course" onClick={handleSubmit} />
            </form>
          </div>
        </Modal>

        <div className="table mt-4">
          <table className='rounded-md'>
            <div className="table_wrapper">
              <tr className='heading_row'>
                {/* <th>#ID</th> */}
                <th>IMAGE</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>DATE</th>
                <th>TIME</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
              {webinar.map((course) => (
                <tr key={course.id}>
                  {/* <td>{`000${course.id}`}</td> */}
                  <td><img src={course.image} alt={course.name} /></td>
                  <td>{course.title}</td>
                  <td className='price'>${course.price}</td>
                  <td>{course.date}&nbsp; {course.year}</td>
                  <td>{course.time}</td>
                  <td className='edit_btn'>
                    <input type="button" value="Edit Info" onClick={() => handleEdit(course._id)} />
                  </td>
                  <td className='delete_btn'><input type="button" value="Delete" 
                  onClick={() => handleDelete(course._id)} /></td>
                </tr>
              ))}
            </div>
          </table>
        </div>
      </div>
    </div>
  )
}


export default Webinar
