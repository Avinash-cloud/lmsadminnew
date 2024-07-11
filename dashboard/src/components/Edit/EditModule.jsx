import React, { useState, useEffect } from 'react';
import './editcourse.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditModule = () => {

    // const [user, setUser] = useState({
        
       
    // });

    const { id } = useParams();
    // console.log("data is",id);
    const [user, setUser] = useState({});

    useEffect(() => {   

        const fetchContacts = async () => {
          try {
            const result = axios.get(`http://localhost:5000/api/module?id=${id}`);
            setUser((await result).data);
            console.log((await result).data);
          } catch (error) {
            console.log("the erro is ",error);
            if (error.response && error.response.status === 401) {
              
            }
          }
        }; 
        fetchContacts();
        
      }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/module/${id}`, user);
      console.log('Updated Course:', response.data);
      alert('Course updated successfully');
    } catch (error) {
      console.error('Error updating Course:', error);
      alert('Failed to update Course');
    }
  };

  return (
    <div>
      <div className="edit ">
        <div className="edit_wrapper">
            <h1 className=' h1 text-white'>Edit Course</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title </label>
                    <input
                        type="text"
                        name="title"
                        value={user.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Course</label>
                    <input
                        type="text"
                        name="course"
                        value= {user.course}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Tag </label>
                    <input
                        type="text"
                        name="tag"
                        value={user.tag}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Discription </label>
                    <input
                        type="text"
                        name="discription"
                        value={user.discription}
                        onChange={handleChange}
                    />
                </div>
                <input className='update_btn' type="submit" value="Update" />
            </form>
        </div>
      </div>
    </div>
  )
}

export default EditModule
