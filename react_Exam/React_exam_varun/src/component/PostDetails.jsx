import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePost, setPostToEdit } from '../redux/postSlice';

export default function PostDetails({ post }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!post) return null;

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete the post "${post.title}"?`)) {
            dispatch(deletePost(post.id));
        }
    };

    const handleEdit = () => {
        dispatch(setPostToEdit(post));
        navigate('/add-post');
    };

    return (
        <div className="card h-100 border-0 shadow-sm rounded-3 hover-shadow transition">
            <div className="card-body d-flex flex-column p-4">
                <h4 className="card-title fw-bold text-dark mb-3">{post.title}</h4>
                <p className="card-text text-secondary flex-grow-1" style={{ whiteSpace: 'pre-line' }}>
                    {post.description || post.content}
                </p>
                <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top border-light">
                    <button onClick={handleEdit} className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-semibold">
                        ✏️ Edit
                    </button>
                    <button onClick={handleDelete} className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-semibold">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
