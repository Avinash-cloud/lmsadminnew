import React, { useState, useEffect } from "react";
import axios from "axios";
import "../courses/courses.css";
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

const ModulesData = () => {
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
                const result = await axios.get("http://localhost:5000/api/moduledata");
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
        navigate(`/editmoduledata/${_id}`);
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
        course: '',
        title: '',
        price: '',
        priceDis: '',
        description: '',
        certificate: false,
        discription1: '',
        points1: [''],
        points2: [''],
        discription2: '',
        requirements: [''],
        rating: '',
        description3: [''],
        teacher: '',
        lecture: '',
        quizzes: '',
        skillLevel: '',
        topic: [{ name: '', lession: [''], files: [''] }],
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleArrayChange = (e, field, index) => {
        const { value } = e.target;
        setUser((prevData) => {
            const updatedArray = [...prevData[field]];
            updatedArray[index] = value;
            return { ...prevData, [field]: updatedArray };
        });
    };

    const handleAddPoint = (field) => {
        setUser((prevData) => ({
            ...prevData,
            [field]: [...prevData[field], ''],
        }));
    };

    const handleRemovePoint = (field, index) => {
        setUser((prevData) => {
            const updatedArray = [...prevData[field]];
            updatedArray.splice(index, 1);
            return { ...prevData, [field]: updatedArray };
        });
    };

    const handleObjectArrayChange = (e, field, objectIndex, subField, subIndex) => {
        const { value } = e.target;
        setUser((prevData) => {
            const updatedObjectArray = [...prevData[field]];
            const updatedObject = { ...updatedObjectArray[objectIndex] };
            const updatedSubArray = [...updatedObject[subField]];
            updatedSubArray[subIndex] = value;
            updatedObject[subField] = updatedSubArray;
            updatedObjectArray[objectIndex] = updatedObject;
            return { ...prevData, [field]: updatedObjectArray };
        });
    };

    const handleObjectChange = (e, field, objectIndex, subField) => {
        const { value } = e.target;
        setUser((prevData) => {
            const updatedObjectArray = [...prevData[field]];
            const updatedObject = { ...updatedObjectArray[objectIndex] };
            updatedObject[subField] = value;
            updatedObjectArray[objectIndex] = updatedObject;
            return { ...prevData, [field]: updatedObjectArray };
        });
    };
    
    const handleFileChange = (e, topicIndex, lessonIndex) => {
        const file = e.target.files[0];
        setUser((prevData) => {
            const updatedTopics = [...prevData.topic];
            const updatedLessons = [...updatedTopics[topicIndex].lession];
            updatedLessons[lessonIndex] = file.name;
            updatedTopics[topicIndex].files[lessonIndex] = file;
            return { ...prevData, topic: updatedTopics };
        });
    };

    const handleAddLesson = (topicIndex) => {
        setUser((prevData) => {
            const updatedTopics = [...prevData.topic];
            updatedTopics[topicIndex].lession.push('');
            updatedTopics[topicIndex].files.push('');
            return { ...prevData, topic: updatedTopics };
        });
    };

    const handleRemoveLesson = (topicIndex, lessonIndex) => {
        setUser((prevData) => {
            const updatedTopics = [...prevData.topic];
            updatedTopics[topicIndex].lession.splice(lessonIndex, 1);
            updatedTopics[topicIndex].files.splice(lessonIndex, 1);
            return { ...prevData, topic: updatedTopics };
        });
    };

    const handleAddTopic = () => {
        setUser((prevData) => ({
            ...prevData,
            topic: [...prevData.topic, { name: '', lession: [''], files: [''] }],
        }));

        setIsOpen(false);
    };

    const handleRemoveTopic = (topicIndex) => {
        setUser((prevData) => {
            const updatedTopics = [...prevData.topic];
            updatedTopics.splice(topicIndex, 1);
            return { ...prevData, topic: updatedTopics };
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append("image", file);
    //     formData.append("course", course);
    //     formData.append("title", title);
    //     formData.append("videonumber", videonumber);
    //     formData.append("modulenumber", modulenumber);
    //     formData.append("discription", discription);
    //     formData.append("tag", tag);

    //     try {
    //         console.log("form data ", formData);
    //         const response = await axios.post(
    //             "http://localhost:5000/api/moduledata",
    //             formData,
    //             {
    //                 headers: {
    //                     "Content-Type": "multipart/form-data",
    //                 },
    //             }
    //         );
    //         setModule([...module, response.data]);
    //         console.log(response.data);
    //     } catch (error) {
    //         console.log(error);
    //         console.error("Error uploading the course data", error);
    //     }

    //     setCourse("");
    //     setTitle("");
    //     setVideoNumber("");
    //     setModuleNumber("");
    //     setDiscription("");
    //     setTag("");
    //     setFile(null);

    //     closeModal();
    // };

    const handleDelete = async (courseId) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/module/${courseId}`
            );

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/api/moduledata', user); // Replace with your API endpoint
          console.log('Response:', response.data);
        } catch (error) {
          console.error('Error submitting form:', error);
        }
        closeModal();
      };
    return (
        <div>
            <div className="courses ml-2">
                <div className="courses_page_header">
                    <div className="courses_page_head">
                        <h2 className="h2 text-white">Available Module</h2>

                    </div>
                    <div className="courses_page_button">
                        <input type="button" value="Add Module" onClick={openModal} />
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
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                            Fill the details!
                        </h2>
                        <button className="close_btn" onClick={closeModal}>
                            <IoIosCloseCircleOutline />
                        </button>
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
                                <label>Title: </label>
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
                                <label>Discounted Price: ₹ </label>
                                <input
                                    type="text"
                                    name="priceDis"
                                    value={user.priceDis}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Category: </label>
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
                                <label>Certificate: </label>
                                <input
                                    type="checkbox"
                                    name="certificate"
                                    checked={user.certificate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Description 1: </label>
                                <textarea
                                    name="discription1"
                                    value={user.discription1}
                                    onChange={handleChange}
                                    cols={90}
                                    rows={5}
                                />
                            </div>
                            <div>
                                <label>Points 1: </label>
                                {user.points1.map((point, index) => (
                                    <div key={index} >
                                        <input
                                            type="text"
                                            value={point}
                                            onChange={(e) => handleArrayChange(e, 'points1', index)}
                                        />
                                        <button type="button" onClick={() => handleRemovePoint('points1', index)}>Remove</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => handleAddPoint('points1')}>Add Point</button>
                            </div>
                            <div>
                                <label>Points 2: </label>
                                {user.points2.map((point, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            value={point}
                                            onChange={(e) => handleArrayChange(e, 'points2', index)}
                                        />
                                        <button type="button" onClick={() => handleRemovePoint('points2', index)}>Remove</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => handleAddPoint('points2')}>Add Point</button>
                            </div>
                            <div>
                                <label>Description 2: </label>
                                <textarea
                                    name="discription2"
                                    value={user.discription2}
                                    onChange={handleChange}
                                    cols={90}
                                    rows={5}
                                />
                            </div>
                            <div>
                                <label>Requirements: </label>
                                {user.requirements.map((point, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            value={point}
                                            onChange={(e) => handleArrayChange(e, 'requirements', index)}
                                        />
                                        <button type="button" onClick={() => handleRemovePoint('requirements', index)}>Remove</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => handleAddPoint('requirements')}>Add Point</button>
                            </div>
                            <div>
                                <label>Rating: </label>
                                <input
                                    type="text"
                                    name="rating"
                                    value={user.rating}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Description 3: </label>
                                {user.description3.map((point, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            value={point}
                                            onChange={(e) => handleArrayChange(e, 'description3', index)}
                                        />
                                        <button type="button" onClick={() => handleRemovePoint('description3', index)}>Remove</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => handleAddPoint('description3')}>Add Point</button>
                            </div>
                            <div>
                                <label>Teacher: </label>
                                <input
                                    type="text"
                                    name="teacher"
                                    value={user.teacher}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Number of Lectures: </label>
                                <input
                                    type="text"
                                    name="lecture"
                                    value={user.lecture}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Number of Quizzes: </label>
                                <input
                                    type="text"
                                    name="quizzes"
                                    value={user.quizzes}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Required Skill Level: </label>
                                <input
                                    type="text"
                                    name="skillLevel"
                                    value={user.skillLevel}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Topics: </label>
                                {user.topic.map((topic, topicIndex) => (
                                    <div key={topicIndex}>
                                        <label>Topic Name: </label>
                                        <input
                                            type="text"
                                            
                                            value={topic.name}
                                            onChange={(e) => handleObjectChange(e, 'topic', topicIndex, 'name')}
                                        />
                                        <div>
                                            <label>Lessons: </label>
                                            {topic.lession.map((lesson, lessonIndex) => (
                                                <div key={lessonIndex}>
                                                    <input
                                                        type="text"
                                                        value={lesson}
                                                        onChange={(e) => handleObjectArrayChange(e, 'topic', topicIndex, 'lession', lessonIndex)}
                                                    />
                                                    <input type="file" onChange={(e) => handleFileChange(e, topicIndex, lessonIndex)} />
                                                    <button type="button" onClick={() => handleRemoveLesson(topicIndex, lessonIndex)}>Remove Lesson</button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => handleAddLesson(topicIndex)}>Add Lesson</button>
                                        </div>
                                        <button type="button" onClick={() => handleRemoveTopic(topicIndex)}>Remove Topic</button>
                                    </div>
                                ))}
                                <button type="button" onClick={handleAddTopic}>Add Topic</button>
                            </div>
                            <input type="submit" value="Update" />
                        </form>
                    </div>
                </Modal>

                <div className="table mt-4 rounded-sm">
                    <table className="rounded-sm">
                        <thead>
                            <tr className="heading_row">
                                <th>#ID</th>
                                <th>IMAGE</th>
                                <th>COURSES</th>
                                <th>NAME</th>
                                <th> Discounted PRICE</th>
                                <th>PRICE</th>
                                <th>RATING</th>
                                <th>EDIT</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {module.map((course) => (
                                <tr key={course._id}>
                                    <td>{`0${course._id}`}</td>
                                    <td>
                                        <img src={course.image} alt={course.title} />
                                    </td>
                                    <td>{course.course}</td>
                                    <td>{course.title}</td>

                                    <td >₹{course.priceDis}</td>
                                    <td >₹{course.price}</td>
                                    <td>{course.rating}</td>
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ModulesData;
