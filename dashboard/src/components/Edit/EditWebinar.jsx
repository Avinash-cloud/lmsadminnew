import React, { useState, useEffect } from 'react';
// import './editcourse.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditWebinar = () => {

    // const [user, setUser] = useState({
        
       
    // });

    const { id } = useParams();
    // console.log("data is",id);
    const [user, setUser] = useState({});

    useEffect(() => {   

        const fetchContacts = async () => {
          try {
            const result = axios.get(`http://localhost:5000/api/webinar?id=${id}`);
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
            const response = await axios.put(`http://localhost:5000/api/webinar/${id}`, user);
            console.log('Updated Course:', response.data);
            alert('webinar updated successfully');
        } catch (error) {
            console.error('Error updating webinar:', error);
            alert('Failed to update course');
        }
    };

  return (
    <div>
      <div className="edit">
        <div className="edit_wrapper">
            <h1>Edit Course</h1>
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
                    <label>Price: ₹ </label>
                    <input
                        type="text"
                        name="price"
                        value= {user.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Date </label>
                    <input
                        type="date"
                        name="date"
                        value={user.date}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Time </label>
                    <input
                        type="text"
                        name="time"
                        value={user.time}
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

export default EditWebinar
