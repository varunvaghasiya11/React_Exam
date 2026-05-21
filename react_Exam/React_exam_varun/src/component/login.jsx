import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        const name = email.split('@')[0];
        dispatch(loginSuccess({ email, name }));
        
        setError('');
        navigate('/dashboard');
    };

    return (
        <div className="container mt-5 text-start" style={{ maxWidth: '480px' }}>
            <div className="card shadow border-0 rounded-3">
                <div className="card-body p-4 p-md-5">
                    <h2 className="card-title fw-bold text-dark mb-4 text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-semibold text-secondary">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control rounded-3 py-2 fs-6"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label fw-semibold text-secondary">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control rounded-3 py-2 fs-6"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>
                        
                        {error && (
                            <div className="alert alert-danger rounded-3 py-2 px-3 fs-6 mb-3" role="alert">
                                ⚠️ {error}
                            </div>
                        )}
                        
                        <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill fs-6 py-2 fw-semibold shadow-sm mb-3">
                            Login
                        </button>
                    </form>
                    <div className="text-center text-secondary mt-3">
                        Don't have an account? <Link to="/" className="text-decoration-none fw-semibold">Register here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}