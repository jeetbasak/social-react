import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import Header from './Header';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {

        userlist();

    }, []);

    async function userlist() {
        // Fetch user list from the API
        axios.get('http://localhost:5000/backend/user/users', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Get token from local storage
            }
        })
            .then(response => {
                setUsers(response.data); // Set the fetched users to state
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }



    const handleFollow = (userId) => {
        const formData = new FormData();
        formData.append('followto_user_id', userId);

        // Call the API to create a follow relationship
        axios.post('http://localhost:5000/backend/follows/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}` // Include token in headers
            }
        })
            .then(response => {
                // console.log(response.data);
                if (response.data.code == 200) {
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
                // Update the user list or show a success message if needed
                userlist();
            })
            .catch(error => {
                console.error('Error following user:', error);
                // Show an error message if needed
            });
    };


    const handleUnfollow = (userId) => {
        const formData = new FormData();
        formData.append('followto_user_id', userId);

        axios.post('http://localhost:5000/backend/follows/delete', formData, {
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
                userlist();
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
            <h2 className="my-4">User List</h2>
            
            <ul className="list-group">
                {users.map(user => (
                    <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <img src={`http://localhost:5000/user/${user.image}`} alt="User" className="rounded-circle mr-2" style={{ width: '40px', height: '40px' }} />
                            <span>&nbsp;&nbsp;{user.name}</span>
                        </div>
                        {user.following ? (
                            <button onClick={() => handleUnfollow(user.id)} className="btn btn-success">Following</button>
                        ) : (
                            <button onClick={() => handleFollow(user.id)} className="btn btn-primary">Follow</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default UserList;
