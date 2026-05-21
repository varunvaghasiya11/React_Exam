import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPost, updatePost, clearPostToEdit } from '../redux/postSlice';

export default function PostForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentPostToEdit = useSelector(state => state.posts.currentPostToEdit);
    const { user } = useSelector(state => state.auth);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentPostToEdit) {
            setTitle(currentPostToEdit.title || '');
            setDescription(currentPostToEdit.description || currentPostToEdit.content || '');
            setError('');
        } else {
            setTitle('');
            setDescription('');
            setError('');
        }
    }, [currentPostToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title.trim()) {
            setError('Post name (title) is required');
            return;
        }

        if (!description.trim()) {
            setError('Post description is required');
            return;
        }

        const postPayload = {
            title: title.trim(),
            description: description.trim(),
            content: description.trim(),
            author: user?.name || user?.email || 'Anonymous User'
        };

        try {
            if (currentPostToEdit) {
                await dispatch(updatePost({
                    id: currentPostToEdit.id,
                    ...postPayload,
                    author: currentPostToEdit.author
                })).unwrap();
                dispatch(clearPostToEdit());
            } else {
                await dispatch(addPost(postPayload)).unwrap();
                setTitle('');
                setDescription('');
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Failed to submit post');
        }
    };

    const handleCancelEdit = () => {
        dispatch(clearPostToEdit());
        navigate('/dashboard');
    };

    return (
        <div className="container mt-5 text-start" style={{ maxWidth: '600px' }}>
            <div className="card shadow border-0 rounded-3">
                <div className="card-body p-4 p-md-5">
                    <h2 className="card-title fw-bold text-dark mb-4 text-center">
                        {currentPostToEdit ? 'Edit Post' : 'Add New Post'}
                    </h2>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="post-title" className="form-label fw-semibold text-secondary">Post Name</label>
                            <input
                                id="post-title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter post name"
                                className="form-control form-control-lg rounded-3 fs-6"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="post-description" className="form-label fw-semibold text-secondary">Description</label>
                            <textarea
                                id="post-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter post description"
                                className="form-control rounded-3 fs-6"
                                rows="6"
                            />
                        </div>

                        {error && (
                            <div className="alert alert-danger rounded-3 py-2 px-3 fs-6 mb-4" role="alert">
                                ⚠️ {error}
                            </div>
                        )}

                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary btn-lg rounded-pill fs-6 py-2 shadow-sm fw-semibold">
                                {currentPostToEdit ? 'Save Changes' : 'Add Post'}
                            </button>
                            <button type="button" onClick={handleCancelEdit} className="btn btn-outline-secondary btn-lg rounded-pill fs-6 py-2 fw-semibold">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
