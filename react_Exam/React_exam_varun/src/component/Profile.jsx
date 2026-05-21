import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';

export default function Profile() {
    const { user } = useSelector(state => state.auth);
    const { posts } = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userPosts = posts.filter(post => post.author === (user?.name || user?.email));

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    if (!user) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning text-center" role="alert">
                    Please log in to view your profile.
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-body p-5 text-center">
                            <div className="d-flex justify-content-center mb-4">
                                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fs-1 shadow-sm" style={{ width: '80px', height: '80px' }}>
                                    {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <h2 className="card-title fw-bold text-dark mb-1">{user.name || 'User'}</h2>
                            <p className="text-muted mb-4">{user.email}</p>
                            
                            <hr className="my-4" />
                            
                            <div className="row text-start mb-4">
                                <div className="col-6 text-muted">Account Status:</div>
                                <div className="col-6 text-end fw-semibold text-success">Active</div>
                                
                                <div className="col-6 text-muted mt-2">Member Since:</div>
                                <div className="col-6 text-end mt-2">May 2026</div>

                                <div className="col-6 text-muted mt-2">Your Posts Created:</div>
                                <div className="col-6 text-end mt-2 fw-bold">{userPosts.length}</div>
                            </div>
                            
                            <div className="d-grid gap-2">
                                <button onClick={() => navigate('/dashboard')} className="btn btn-primary btn-lg rounded-pill fs-6 py-2 shadow-sm">
                                    Go to Dashboard
                                </button>
                                <button onClick={handleLogout} className="btn btn-outline-danger btn-lg rounded-pill fs-6 py-2">
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
