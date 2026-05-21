import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
        setIsNavCollapsed(true);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm px-3 py-2">
            <div className="container-fluid px-md-5">
                <Link to={isAuthenticated ? "/dashboard" : "/login"} className="navbar-brand fw-bold fs-4 d-flex align-items-center" onClick={() => setIsNavCollapsed(true)}>
                    <span className="me-2">📝</span> BlogApp
                </Link>
                <button 
                    className="navbar-toggler border-0" 
                    type="button" 
                    aria-controls="navbarNav" 
                    aria-expanded={!isNavCollapsed} 
                    aria-label="Toggle navigation"
                    onClick={handleNavCollapse}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'show'}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-lg-center">
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item px-2">
                                    <Link to="/dashboard" className="nav-link text-white fw-medium" onClick={() => setIsNavCollapsed(true)}>
                                        Post List
                                    </Link>
                                </li>
                                <li className="nav-item px-2">
                                    <Link to="/add-post" className="nav-link text-white fw-medium" onClick={() => setIsNavCollapsed(true)}>
                                        Post Form
                                    </Link>
                                </li>
                                <li className="nav-item px-2">
                                    <Link to="/profile" className="nav-link text-white fw-medium" onClick={() => setIsNavCollapsed(true)}>
                                        User Profile
                                    </Link>
                                </li>
                                <li className="nav-item px-2 mt-2 mt-lg-0 d-flex align-items-center gap-3">
                                    <button 
                                        onClick={handleLogout} 
                                        className="btn btn-outline-danger btn-sm rounded-pill px-3 py-1 fw-semibold"
                                    >
                                        Sign Out
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item px-2">
                                    <Link to="/login" className="nav-link text-white fw-medium" onClick={() => setIsNavCollapsed(true)}>
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item px-2 mt-2 mt-lg-0">
                                    <Link to="/" className="btn btn-primary btn-sm rounded-pill px-3 py-1 fw-semibold text-white" onClick={() => setIsNavCollapsed(true)}>
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
