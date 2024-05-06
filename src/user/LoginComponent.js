import React, { useState, useEffect } from 'react';
import validate from 'jquery-validation'
import $ from "jquery";
import { toast } from "react-toastify";
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';



function LoginComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
     
        email: {
          required: true,
          validate_email: true
        },
        password: {
          required: true,
        },

      }
    });

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ($('#frm').valid()) {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      fetch('http://localhost:5000/backend/user/login', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.code === 500){
          toast.error(data.message);
        }else{
          toast.success(data.message);
        //   navigate("/");
        localStorage.setItem("token",data.access_token)
        window.location="/posts"
        }
        
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('An error occurred. Please try again later.');
      });
    }
  };



  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Login</h2>
          <form onSubmit={handleSubmit} id='frm'>
           
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
           
            <button type="submit" className="btn btn-primary">Login</button>
            
            <br></br>
            <Link to="/register">Register</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
