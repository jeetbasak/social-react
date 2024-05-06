import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import Header from '../user/Header';

const Post_list = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);


  // Fetch post list from the backend API
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/backend/posts/list', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response)
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };






  const handleLike = (postid) => {
    const formData = new FormData();
    formData.append('post_id', postid);

    // Call the API to create a follow relationship
    axios.post('http://localhost:5000/backend/likes/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}` // Include token in headers
      }
    })
      .then(response => {
        console.log(response);
        if (response.data.code == 200) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
        // Update the user list or show a success message if needed
        fetchPosts();
      })
      .catch(error => {
        console.error('Error following user:', error);
        // Show an error message if needed
      });
  };





  const handleDisLike = (postid) => {
    const formData = new FormData();
    formData.append('post_id', postid);

    axios.post('http://localhost:5000/backend/likes/delete', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}` // Include token in headers
      }
    })
      .then(response => {
        if (response.data.code == 200) {
          toast.warning(response.data.message);
        } else {
          toast.error(response.data.message);
        }
        // Update the user list or show a success message if needed
        fetchPosts();
      })
      .catch(error => {
        console.error('Error following user:', error);
        // Show an error message if needed
      });
  };


  return (
    <>
      <Header />
      <div className="container">
        <h2 className="my-4">Post List</h2>
        {posts.map(post => (
          <div key={post.id} className="card my-2">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                {post.userDetails && (
                  <>
                    <img src={`http://localhost:5000/user/${post.userDetails.image}`} alt="User" className="rounded-circle mr-2" style={{ width: '40px', height: '40px' }} />
                    <span>&nbsp; Post created by: <b>{post.userDetails.name}</b></span>
                  </>
                )}
              </div>
              <h5 className="card-title">Post title: {post.title}</h5>
             <p className="card-text">  Post description: {post.content}</p>
              <img src={`http://localhost:5000/posts/${post.image}`} alt="Post" className="img-fluid mb-3" style={{ maxWidth: '200px' }} />
              <br />
              {post.loginUserLike ? (
                <button onClick={() => handleDisLike(post.id)} className="btn btn-success">Dislike</button>
              ) : (
                <button onClick={() => handleLike(post.id)} className="btn btn-primary">Like</button>
              )}
              <span> total likes : {post.like_count}</span>
            </div>
          </div>
        ))}
      </div>

    </>
  );
};

export default Post_list;
