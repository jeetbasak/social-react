import React, { useState, useEffect } from 'react';
import validate from 'jquery-validation'
import $ from "jquery";
import { toast } from "react-toastify";
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';



function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate=useNavigate();

  useEffect(() => {
    $.validator.addMethod("validate_email", function (value, element) {
      if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)) {
        return true;
      } else {
        return false;
      }
    }, "Please enter a valid email address.");

    //validations
    $("#frm").validate({
      rules: {
        name: {
          required: true,
        },
        email: {
          required: true,
          validate_email: true
        },
        password: {
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
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('image', image);

      fetch('http://localhost:5000/backend/user/register', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.code);
        if(data.code === 500){
          toast.error(data.message);
        }else{
          toast.success(data.message);
          navigate("/");
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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Register</h2>
          <form onSubmit={handleSubmit} id='frm'>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address:</label>
              <input
              name="email"
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
              name="password"
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="image">Profile Picture:</label>
              <input
              name="image"
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
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
          <br></br>
            <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
