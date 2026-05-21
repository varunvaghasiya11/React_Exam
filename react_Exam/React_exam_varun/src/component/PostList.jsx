import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../redux/postSlice';
import PostDetails from './PostDetails';

function PostList() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading posts...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center shadow-sm" role="alert">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="container mt-5 text-center" style={{ maxWidth: '600px' }}>
        <div className="card p-5 border-0 shadow-sm rounded-3 bg-light">
          <div className="card-body">
            <h3 className="text-dark fw-bold mb-3">No posts yet.</h3>
            <p className="text-secondary mb-4">Be the first to share something with the community!</p>
            <Link to="/add-post" className="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-sm">
              Create New Post
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4 text-start">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <h2 className="fw-bold text-dark m-0">Recent Posts</h2>
        <Link to="/add-post" className="btn btn-primary rounded-pill px-3 py-2 fw-semibold shadow-sm">
          + Add New Post
        </Link>
      </div>
      <div className="row g-4">
        {posts.map(post => (
          <div key={post.id} className="col-12 col-md-6 col-lg-4">
            <PostDetails post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;