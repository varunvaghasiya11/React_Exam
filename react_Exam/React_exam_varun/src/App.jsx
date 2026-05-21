import Register from './component/Register.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './component/login.jsx'
import PostForm from './component/PostForm.jsx'
import PostList from './component/PostList.jsx'
import Profile from './component/Profile.jsx'
import Navbar from './component/Navbar.jsx'
import PrivateRoute from './component/PrivateRoute.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="main-content container-fluid px-3 px-md-5 my-4">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <PostList />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/add-post" 
            element={
              <PrivateRoute>
                <PostForm />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
