import React, { useState, useEffect } from 'react';
import './editcourse.css';
import '../Edit/EditModuleData.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { IoIosRemoveCircle } from "react-icons/io";

const EditModuleData = () => {
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
                const response = await axios.get(`http://localhost:5000/api/moduledata?id=${id}`);
                setUser(response.data); // Assuming response.data is an object containing course details
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };
        fetchCourse();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    


    const handleArrayChange = (e, field, index) => {
        const { value } = e.target;
        setUser((prevData) => ({
            ...prevData,
            [field]: prevData[field].map((item, i) => (i === index ? value : item)),
        }));
    };


    //   Points 1 handalling

    const handleAddPoint = (field) => {
        setUser((prevData) => ({
            ...prevData,
            [field]: [...prevData[field], ''],
        }));
    };

    const handleRemovePoint = (field, index) => {
        setUser((prevData) => ({
            ...prevData,
            [field]: prevData[field].filter((item, i) => i !== index),
        }));
    };


    //   Points 2 handalling

    const handleAddPoint2 = (field) => {
        setUser((prevData) => ({
            ...prevData,
            [field]: [...prevData[field], ''],
        }));
    };

    const handleRemovePoint2 = (field, index) => {
        setUser((prevData) => ({
            ...prevData,
            [field]: prevData[field].filter((item, i) => i !== index),
        }));
    };

    //   .......... requirements

    const handleRequirements = (field) => {
        setUser((prevData) => ({
            ...prevData,
            [field]: [...prevData[field], ''],
        }));
    };

    const handleRemoveRequirements = (field, index) => {
        setUser((prevData) => ({
            ...prevData,
            [field]: prevData[field].filter((item, i) => i !== index),
        }));
    };

    // ............description

    const handleDescription3 = (field) => {
        setUser((prevData) => ({
            ...prevData,
            [field]: [...prevData[field], ''],
        }));
    };

    const handleRemoveDescription3 = (field, index) => {
        setUser((prevData) => ({
            ...prevData,
            [field]: prevData[field].filter((item, i) => i !== index),
        }));
    };


    //..............Lesions

    const handleObjectArrayChange = (e, field, objIndex, subField, subIndex) => {
        const { value } = e.target;
        setUser((prevData) => ({
            ...prevData,
            [field]: prevData[field].map((obj, i) =>
                i === objIndex
                    ? {
                        ...obj,
                        [subField]: obj[subField].map((item, j) =>
                            j === subIndex ? value : item
                        ),
                    }
                    : obj
            ),
        }));
    };

    const handleAddTopic = () => {
        setUser((prevData) => ({
          ...prevData,
          topic: [...prevData.topic, { name: '', lession: [''] }],
        }));
      };
    
      const handleRemoveTopic = (index) => {
        setUser((prevData) => ({
          ...prevData,
          topic: prevData.topic.filter((_, i) => i !== index),
        }));
      };
    
      const handleAddLesson = (index) => {
        setUser((prevData) => ({
          ...prevData,
          topic: prevData.topic.map((item, i) =>
            i === index ? { ...item, lession: [...item.lession, ''] } : item
          ),
        }));
      };
    
      const handleRemoveLesson = (topicIndex, lessonIndex) => {
        setUser((prevData) => ({
          ...prevData,
          topic: prevData.topic.map((item, i) =>
            i === topicIndex ? { ...item, lession: item.lession.filter((_, j) => j !== lessonIndex) } : item
          ),
        }));
      };
    
      const handleFileChange = (e, topicIndex, lessonIndex) => {
        const file = e.target.files[0];
        setUser((prevData) => ({
          ...prevData,
          topic: prevData.topic.map((item, i) =>
            i === topicIndex ? { ...item, lession: item.lession.map((lesson, j) => (j === lessonIndex ? file.name : lesson)) } : item
          ),
        }));
      };



      const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await axios.put(`http://localhost:5000/api/moduledata/${id}`, user);
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
                    <h1 className='text-black h1'>Edit Module</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Course: </label>
                            <input
                                type="text"
                                name="module"
                                value={user.module}
                                onChange={handleChange}
                            />


                        </div>
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
                            <label>Discounted Price : ₹ </label>
                            <input
                                type="text"
                                name="tag"
                                value={user.priceDis}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Category </label>
                            <input
                                type="text"
                                name="course"
                                value={user.course}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                                <label>Language: </label>
                                <input
                                    type="text"
                                    name="language"
                                    value={user.language}
                                    onChange={handleChange}
                                />
                            </div>

                        <div>
                            <label class="form-check form-switch"> Certificate: </label>

                            <input type="checkbox"
                                name="certificate"
                                checked={user.certificate}
                                onChange={handleChange}
                                role="switch"
                            />

                        </div>

                        <div>
                            <label> Description 1: </label>
                            <textarea name="discription1" value={user.discription1} onChange={handleChange} cols={90}
                                rows={5} />
                        </div>

                        <div>
                            <label>Points 1:</label>
                            {user.points1?.map((point, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        value={point}
                                        onChange={(e) => handleArrayChange(e, 'points1', index)}
                                    />
                                    <span className='remove' onClick={() => handleRemovePoint('points1', index)}> <IoIosRemoveCircle /></span>
                                </div>
                            ))}
                            <button className='update_btn' type="button" onClick={() => handleAddPoint('points1')}>Add Point</button>
                        </div>

                        <div>
                            <label>Points 2 :</label>
                            {user.points2?.map((point, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        value={point}
                                        onChange={(e) => handleArrayChange(e, 'points2', index)}
                                    />
                                    <span className='remove' onClick={() => handleRemovePoint2('points2', index)}> <IoIosRemoveCircle /></span>
                                </div>
                            ))}
                            <button className='update_btn' type="button" onClick={() => handleAddPoint2('points2')}>Add Point</button>
                        </div>

                        <div>
                            <label> Description 2: </label>
                            <textarea name="discription2" value={user.discription2} onChange={handleChange} cols={90} rows={5} />
                        </div>

                        <div>
                            <label>Requirements</label>
                            {user.requirements?.map((point, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        value={point}
                                        onChange={(e) => handleArrayChange(e, 'requirements', index)}
                                    />
                                    <span className='remove' onClick={() => handleRemoveRequirements('requirements', index)}> <IoIosRemoveCircle /></span>
                                </div>
                            ))}
                            <button className='update_btn' type="button" onClick={() => handleRequirements('requirements')}>Add Point</button>
                        </div>

                        <div>
                            <label class="form-check form-switch"> Rating: </label>
                            <input
                                type="text"
                                name="rating"
                                value={user.rating}
                                onChange={handleChange}
                            />


                        </div>

                        <div>
                            <label>Description</label>
                            {user.description3?.map((point, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        value={point}
                                        onChange={(e) => handleArrayChange(e, 'description3', index)}
                                    />
                                    <span className='remove' onClick={() => handleRemoveDescription3('description3', index)}> <IoIosRemoveCircle /></span>
                                </div>
                            ))}
                            <button className='update_btn' type="button" onClick={() => handleDescription3('description3')}>Add Point</button>

                        </div>

                        <div>
                            <label>Teacher </label>
                            <input
                                type="text"
                                name="teacher"
                                value={user.teacher}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>Number of Lecture </label>
                            <input
                                type="text"
                                name="Lecture"
                                value={user.lecture}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label> NUmber of Quizzes </label>
                            <input
                                type="text"
                                name="discription"
                                value={user.quizzes}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>Required Skill Level </label>
                            <input
                                type="text"
                                name="discription"
                                value={user.skillLevel}
                                onChange={handleChange}
                            />
                        </div>

                        <div>

                            {/* <div>
                                Topics:
                                {user.topic.map((topic, topicIndex) => (
                                    <div key={topicIndex}>
                                        <label>
                                            Topic Name:
                                            <input
                                                type="text"
                                                value={topic.name}
                                                onChange={(e) =>
                                                    setUser((prevData) => ({
                                                        ...prevData,
                                                        topic: prevData.topic.map((t, i) =>
                                                            i === topicIndex ? { ...t, name: e.target.value } : t
                                                        ),
                                                    }))
                                                }
                                            />
                                        </label>
                                        <div>
                                            Lessons:
                                            {topic.lession.map((lesson, lessonIndex) => (
                                                <input
                                                    key={lessonIndex}
                                                    type="text"
                                                    value={lesson}
                                                    onChange={(e) => handleObjectArrayChange(e, 'topic', topicIndex, 'lession', lessonIndex)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div> */}

                            

                            <div>
                                <label >Topics:</label>
                                {user.topic?.map((topic, topicIndex) => (
                                    <div key={topicIndex}>
                                        <label>
                                            Topic Name:
                                            <input
                                                type="text"
                                                value={topic.name}
                                                onChange={(e) =>
                                                    setUser((prevData) => ({
                                                        ...prevData,
                                                        topic: prevData.topic.map((t, i) =>
                                                            i === topicIndex ? { ...t, name: e.target.value } : t
                                                        ),
                                                    }))
                                                }
                                            />
                                        </label>
                                        <div>
                                            Lessons:
                                            {topic.lession.map((lesson, lessonIndex) => (
                                                <div key={lessonIndex}>
                                                    <input
                                                        type="text"
                                                        value={lesson}
                                                        onChange={(e) => handleObjectArrayChange(e, 'topic', topicIndex, 'lession', lessonIndex)}
                                                    />
                                                    <input type="file" onChange={(e) => handleFileChange(e, topicIndex, lessonIndex)} />
                                                    <button type="button" className='bg-red-500 p-2 rounded my-3 ml-5 text-white' onClick={() => handleRemoveLesson(topicIndex, lessonIndex)}>Remove Lesson</button>
                                                </div>
                                            ))}
                                            <button className='bg-green-600 text-white p-2 my-3 ml-3 rounded' type="button"  onClick={() => handleAddLesson(topicIndex)}>Add Lesson</button>
                                        </div>
                                        <button className='bg-red-600 p-2 rounded my-3 ml-5 text-white' type="button" onClick={() => handleRemoveTopic(topicIndex)}>Remove Topic</button>
                                    </div>
                                ))}
                                <button type="button" className='bg-blue-700 p-2 rounded text-white' onClick={handleAddTopic}>Add Topic</button>
                            </div>

                        </div>







                        <input className='update_btn' type="submit" value="Update" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditModuleData;
