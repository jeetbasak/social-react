import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location = '/';
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <Link className="navbar-brand" to="/posts">Social Media</Link>
                <Link className="navbar-brand" to="/post/create">Post Create</Link>
                <Link className="navbar-brand" to="/users">Users</Link>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        {/* Other navigation links */}
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header