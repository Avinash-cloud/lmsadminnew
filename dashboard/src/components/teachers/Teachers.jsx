import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './teachers.css'
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

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [discription, setDiscription] = useState('');
  const [tag, setTag] = useState('');
  const [moduleCount, setModuleCount] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const result = await axios.get('http://localhost:5000/api/teacher');
        setCourses(result.data);
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

  const [newCourse, setNewCourse] = useState({ name: '', price: '', discription: '',tag: '', moduleCount: '', image: null });

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
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewCourse({ ...newCourse, image: URL.createObjectURL(e.target.files[0]) });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const newContact = { title, price, discription, tag, moduleCount};
    await axios.post('http://localhost:5000/api/module', newContact);
    setTitle('');
    setImage('');
    setPrice('');
    setModuleCount('');
    setDiscription('');
    setTag('');

    closeModal();
  };


  return (
    <div>
      <div className="courses">
        <div className="courses_page_header">
          <div className="courses_page_head">
            <h2>Available Teachers</h2>
            <p>Whole data about your business here</p>
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
            <form className='modal_form' onSubmit={handleSubmit}>
              <label>
                Upload Image
                <input type="file" id="myFile" name="image" onChange={handleFileChange} />
              </label>
              <label>
                Title
                <input type="text" placeholder='Enter name' name="name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} />
              </label>
              <label>
                Price
                <input type="text" placeholder='Enter price' 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}/>
              </label>
              <label>
                Discription
                <input type="text" placeholder='Enter detail' name="detail" value={discription}
                  onChange={(e) => setDiscription(e.target.value)} />
              </label>
              <input className='create_course_btn' type='submit' value="Create Course" />
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
                  <td>{course.position}</td>
                  
                  <td className='edit_btn'>
                    <input type="button" value="Edit Info" onClick={() => handleEdit(course._id)} />
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

export default Modules
