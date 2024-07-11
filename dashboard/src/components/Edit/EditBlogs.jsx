import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

function EditBlogs() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/blogs/${id}`)
        .then(response => {
          setTitle(response.data.title);
          setContent(response.data.content);
        })
        .catch(error => {
          console.error('There was an error fetching the blog!', error);
        });
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const blogData = {
      title,
      content
    };

    if (id) {
      axios.put(`http://localhost:5000/api/blogs/${id}`, blogData)
        .then(() => {
          navigate('/dashboard');
        })
        .catch(error => {
          console.error('There was an error updating the blog!', error);
        });
    } else {
      axios.post('/api/blogs', blogData)
        .then(() => {
          navigate('/dashboard');
        })
        .catch(error => {
          console.error('There was an error creating the blog!', error);
        });
    }
  };

  return (
    <div className='bg-white h-full p-4'>
      <h1 className="h-1 mb-10  font-bold text-3xl" >{id ? 'Edit Blog' : 'Create Blog'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
          className='className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content:</label>
          <ReactQuill
          className='h-96'
            value={content}
            onChange={setContent}
            modules={quillModules}
            formats={quillFormats}
          />
        <button type="submit" className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mt-14 ml-96" >Save</button>
        </div>
      </form>
    </div>
  );
}

// Modules and formats for react-quillconst customStyles = {
   

const quillModules = {
    toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
         {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']                                         
    ],
};

const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];


export default EditBlogs;
