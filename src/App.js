
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import FeedbackForm from './components/FeedbackForm';
import Dashboard from './components/Dashboard';
import './index.css';
import useAuthStore from './store/auth';
import axios from 'axios';


const App = () => {
  const {authenticated,setAuthenticated} = useAuthStore()
  const [userRole, setUserRole] = useState(null);
  const {pathname} = useLocation()
console.log("authenticated",authenticated)
  useEffect(() => {
    
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [pathname]);

  useEffect(() => {
    initializeAdmin();
  }, []);

  const initializeAdmin = async () => {
    try {
      const adminDetails = {
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin'
      };
  
      const response = await axios.post('http://localhost:5000/api/auth/init-admin', adminDetails);
      console.log(response.data.msg);
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.msg);
      } else if (error.request) {
        console.error('No response received from server');
      } else {
        console.error('Error during request setup:', error.message);
      }
    }
  };


  return (
  
      // <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            
           
            {authenticated ? (
              <>
                <Route path="/feedback-form" element={<FeedbackForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </>
            ) : (
              <>
               <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Login />} />
              </>
            )}
           
          </Routes>
        </div>
      // </Router>
   
  );
};

export default App;