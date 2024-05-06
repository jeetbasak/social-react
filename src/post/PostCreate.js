import React, { useState, useEffect } from 'react';
import validate from 'jquery-validation'
import $ from "jquery";
import { toast } from "react-toastify";
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Header from '../user/Header';



function PostCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate=useNavigate();

  useEffect(() => {
    

    //validations
    $("#frm").validate({
      rules: {
        title: {
          required: true,
        },
        content: {
          required: true,
        },
        image: {
            required: true,
          },
       

      }
    });

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ($('#frm').valid()) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', image);

        axios.post('http://localhost:5000/backend/posts/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}` // Include token in headers
            }
        })
        .then(data => {
        console.log(data);
        if(data.data.code === 500){
          toast.error(data.data.message);
        }else{
          toast.success(data.data.message);
          navigate("/posts");
        }
        
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('An error occurred. Please try again later.');
      });
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImageUrl(URL.createObjectURL(selectedImage));
  };

  return (
    <>
        <Header/>
    
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Create Post</h2>
          <form onSubmit={handleSubmit} id='frm'>
            <div className="form-group">
              <label htmlFor="name">Title:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Description:</label>
              <input
              name="content"
                type="text"
                className="form-control"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
           
            <br></br>
            <div className="form-group">
              <label htmlFor="image">Post Picture:</label>
              <input
              name='image'
                type="file"
                className="form-control-file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {imageUrl && (
              <img src={imageUrl} alt="Selected" className="img-fluid mb-3" />
            )}
            <br></br>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <button type="submit" className="btn btn-primary">Create Post</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default PostCreate;
