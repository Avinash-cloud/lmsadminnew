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
            const result = axios.get(`http://localhost:5000/api/teacher?id=${id}`);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated User Info:', user);
        alert('User info updated successfully');
    };

  return (
    <div>
      <div className="edit">
        <div className="edit_wrapper">
            <h1>Edit Course</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Teachers Name </label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Experience </label>
                    <input
                        type="email"
                        name="email"
                        value= {user.Experience}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Discription </label>
                    <input
                        type="text"
                        name="phone"
                        value={user.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Image </label>
                    
                    <img src={user.image} height={100} width={100} />
                </div>
                <input className='update_btn' type="button" value="Update" />
            </form>
        </div>
      </div>
    </div>
  )
}

export default EditModule
