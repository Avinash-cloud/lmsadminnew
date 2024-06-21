import React, { useState, useEffect } from 'react';
import './editcourse.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditCourse = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        title: '',
        price: '',
        tag: '',
        discription: ''
    });

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/courses?id=${id}`);
                setUser(response.data); // Assuming response.data is an object containing course details
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };
        fetchCourse();
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
            const response = await axios.put(`http://localhost:5000/api/courses/${id}`, user);
            console.log('Updated Course:', response.data);
            alert('Course updated successfully');
        } catch (error) {
            console.error('Error updating course:', error);
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
                                value={user.price}
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
                            <label>Description </label>
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
    );
};

export default EditCourse;
