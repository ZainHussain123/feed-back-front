//login
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();


  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', values);
      const { token ,username,role} = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('auth', values.email);
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
      message.success('Login successful');

      
      if (role === 'admin') {
          navigate('/dashboard');
      } else {
          navigate('/feedback-form');
      }
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.msg);
      } else if (error.request) {
        console.log(error.request);
        message.error('No response received from server');
      } else {
        console.log('Error', error.message);
        message.error('Error during request setup: ' + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#bae6fd]">
      <div className="max-w-md w-full mx-auto p-4 bg-white shadow-md rounded-lg bg-[#e0f2fe]">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#0369a1]">Login</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          labelCol={{ style: { fontWeight: 'bold' } }}
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-[#0369a1]"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4 mb-2">
          <span>Don't have an account?</span>{' '}
          <Link to="/signup" className="text-[#0369a1] hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;



//authorization
// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { Form, Input, Button, message } from 'antd';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../App'; // Adjust the path according to your project structure

// const Login = () => {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const { setAuthenticated, setUserRole } = useContext(AuthContext);

//   const onFinish = async (values) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', values);
//       const { token } = response.data;
//       localStorage.setItem('token', token);
//       const user = JSON.parse(atob(token.split('.')[1]));
//       setAuthenticated(true);
//       setUserRole(user.role);
//       message.success('Login successful');
//       navigate(user.role === 'admin' ? '/dashboard' : '/feedback-form');
//     } catch (error) {
//       if (error.response) {
//         message.error(error.response.data.msg);
//       } else if (error.request) {
//         console.log(error.request);
//         message.error('No response received from server');
//       } else {
//         console.log('Error', error.message);
//         message.error('Error during request setup: ' + error.message);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#bae6fd]">
//       <div className="max-w-md w-full mx-auto p-4 bg-white shadow-md rounded-lg bg-[#e0f2fe]">
//         <h2 className="text-2xl font-bold mb-4 text-center text-[#0369a1]">Login</h2>
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={onFinish}
//           labelCol={{ style: { fontWeight: 'bold' } }}
//           requiredMark={false}
//         >
//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[{ required: true, message: 'Please enter your email' }]}
//           >
//             <Input placeholder="Email" />
//           </Form.Item>
//           <Form.Item
//             name="password"
//             label="Password"
//             rules={[{ required: true, message: 'Please enter your password' }]}
//           >
//             <Input.Password placeholder="Password" />
//           </Form.Item>
//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               className="w-full bg-[#0369a1]"
//             >
//               Login
//             </Button>
//           </Form.Item>
//         </Form>
//         <div className="text-center mt-4 mb-2">
//           <span>Don't have an account?</span>{' '}
//           <Link to="/signup" className="text-[#0369a1] hover:underline">
//             Sign Up
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

