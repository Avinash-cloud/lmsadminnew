import React, { useState } from 'react';
import './reviews.css'

import { useNavigate } from 'react-router-dom';

import Modal from 'react-modal';
import { IoIosCloseCircleOutline } from "react-icons/io";

import CourseIMG from  '../../assets/courses.jpg'

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

const Reviews = () => {
  const navigate = useNavigate();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState([
    { id: 1, name: 'Marvin McKinney', price: 9.00, detail: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', image: CourseIMG },
    // Add initial courses here if needed
  ]);

  const [newCourse, setNewCourse] = useState({ name: '', price: '', detail: '', image: null });

  const handleEdit = (id) => {
    navigate(`/editcourse/${id}`);
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
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewCourse({ ...newCourse, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSubmit = () => {
    const newId = courses.length ? courses[courses.length - 1].id + 1 : 1;
    const courseToAdd = { ...newCourse, id: newId, price: parseFloat(newCourse.price) };
    setCourses([...courses, courseToAdd]);
    setNewCourse({ name: '', price: '', detail: '', image: null });
    closeModal();
  };


  return (
    <div>
    <div className="courses">
      <div className="courses_page_header">
        <div className="courses_page_head">
          <h2>Available Courses</h2>
          <p>Whole data about your business here</p>
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
          <button className='close_btn' onClick={closeModal}>
            <IoIosCloseCircleOutline />
          </button>
          <form className='modal_form'>
            <label>
              Upload Image
              <input type="file" id="myFile" name="image" onChange={handleFileChange} />
            </label>
            <label>
              Name
              <input type="text" placeholder='Enter name' name="name" value={newCourse.name} onChange={handleInputChange} />
            </label>
            <label>
              Price
              <input type="text" placeholder='Enter price' name="price" value={newCourse.price} onChange={handleInputChange} />
            </label>
            <label>
              Detail
              <input type="text" placeholder='Enter detail' name="detail" value={newCourse.detail} onChange={handleInputChange} />
            </label>
            <input className='create_course_btn' type="button" value="Create Course" onClick={handleSubmit} />
          </form>
        </div>
      </Modal>

      <div className="table">
        <table>
          <div className="table_wrapper">
            <tr className='heading_row'>
              <th>#ID</th>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>DETAIL</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{`000${course.id}`}</td>
                <td><img src={course.image} alt={course.name} /></td>
                <td>{course.name}</td>
                <td className='price'>${course.price.toFixed(2)}</td>
                <td>{course.detail}</td>
                <td className='edit_btn'>
                  <input type="button" value="Edit Info" onClick={() => handleEdit(course.id)} />
                </td>
                <td className='delete_btn'><input type="button" value="Delete" /></td>
              </tr>
            ))}
          </div>
        </table>
      </div>
    </div>
  </div>
  )
}

export default Reviews
