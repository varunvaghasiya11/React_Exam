import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../redux/authSlice'

function Register() {
  const [formData, setFormData] = useState({name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }
    setError('')
    
   
    dispatch(loginSuccess({ email: formData.email, name: formData.name }))
    navigate('/dashboard');
  }

  return (
    <div className="container mt-5 text-start" style={{ maxWidth: '480px' }}>
      <div className="card shadow border-0 rounded-3">
        <div className="card-body p-4 p-md-5">
          <h2 className="card-title fw-bold text-dark mb-4 text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold text-secondary">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control rounded-3 py-2 fs-6"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold text-secondary">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email"
                className="form-control rounded-3 py-2 fs-6"
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-semibold text-secondary">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control rounded-3 py-2 fs-6"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
            {error && (
              <div className="alert alert-danger rounded-3 py-2 px-3 fs-6 mb-3" role="alert">
                ⚠️ {error}
              </div>
            )}
            
            <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill fs-6 py-2 fw-semibold shadow-sm mb-3">
              Register
            </button>
          </form>
          <div className="text-center text-secondary mt-3">
            Already have an account? <Link to="/login" className="text-decoration-none fw-semibold">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;