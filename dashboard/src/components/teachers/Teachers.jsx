import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './teachers.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { IoIosCloseCircleOutline } from "react-icons/io";
import CourseIMG from '../../assets/courses.jpg';

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

const Modules = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const [user, setUser] = useState({
    name: '',
    Experience: '',
    description: '',
    Position: '',
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const result = await axios.get('http://localhost:5000/api/teacher');
        setCourses(result.data);
      } catch (error) {
        console.log("Error: ", error);
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
      }
    };
    fetchContacts();
  }, [navigate]);

  const handleEdit = (_id) => {
    navigate(`/editteacher/${_id}`);
  };

  let subtitle;

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    subtitle.style.color = '#f00';
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('Experience', user.Experience);
    formData.append('description', user.description);
    formData.append('Position', user.Position);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/teacher', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
      setCourses([...courses, response.data]); // Update the courses list
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    closeModal();
  };

  const handleDelete = async (courseId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/teacher/${courseId}`);
      if (response.status === 200) {
        alert("Teacher deleted:");
        setCourses(courses.filter(course => course._id !== courseId)); // Update the courses list
      } else {
        alert("Failed to delete teacher:");
      }
    } catch (error) {
      console.log(error);
      console.error("Error deleting teacher:", error);
    }
  };

  return (
    <div className='p-2'>
      <div className="courses">
        <div className="courses_page_header">
          <div className="courses_page_head">
            <h2 className='h2 text-white'>Available Teachers</h2>
          </div>
          <div className="courses_page_button">
            <input type="button" value="Add Teacher" onClick={openModal} />
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
            <button className='close_btn' onClick={closeModal}>
              <IoIosCloseCircleOutline />
            </button>
            <form className='modal_form mt-4' onSubmit={handleSubmit}>
              <label>
                Upload Image
                <input type="file" id="myFile" name="image" onChange={handleFileChange} />
              </label>
              <label>
                Name
                <input type="text" placeholder='Enter name of teacher' name="name" value={user.name} onChange={handleInputChange} />
              </label>
              <label>
                Experience
                <input type="text" placeholder='Enter Experience' name="Experience" value={user.Experience} onChange={handleInputChange} />
              </label>
              <label>
                Details
                <input type="text" placeholder='Enter description' name="description" value={user.description} onChange={handleInputChange} />
              </label>
              <label>
                Position
                <input type="text" placeholder='Enter Position' name="Position" value={user.Position} onChange={handleInputChange} />
              </label>
              <button className='create_course_btn' type="submit">Create Teacher</button>
            </form>
          </div>
        </Modal>

        <div className="table mt-5">
          <table>
            <div className="table_wrapper">
              <tr className='heading_row'>
                <th>#ID</th>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>Experience</th>
                <th>DETAIL</th>
                <th>Position</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td>{`${course._id}`}</td>
                  <td><img src={course.image} alt={course.title} /></td>
                  <td>{course.name}</td>
                  <td className='price'>{course.Experience} years</td>
                  <td>{course.description}</td>
                  <td>{course.Position}</td>
                  <td className='edit_btn'>
                    <input type="button" value="Edit Info" onClick={() => handleEdit(course._id)} />
                  </td>
                  <td className='delete_btn'><input type="button" value="Delete" onClick={() => handleDelete(course._id)} /></td>
                </tr>
              ))}
            </div>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Modules;
