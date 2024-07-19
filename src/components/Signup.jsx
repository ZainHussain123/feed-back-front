// src\components\Signup.jsx
import React from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', values);
      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', values.username);
      message.success('Signup successful');
    } catch (error) {
      if (error.response && error.response.data) {
        message.error(error.response.data.msg);
      } else {
        message.error('Failed to signup. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#bae6fd]">
      <div className="max-w-md w-full mx-auto p-4 bg-white shadow-md rounded-lg bg-[#e0f2fe]">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#0369a1]">Sign Up</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter your username' }]}
            labelCol={{ style: { fontWeight: 'bold' } }}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter your email' }]}
            labelCol={{ style: { fontWeight: 'bold' } }}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
            labelCol={{ style: { fontWeight: 'bold' } }}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className='w-full bg-[#0369a1]'>
              Signup
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4 mb-2">
          <span>Don't have an account?</span>{' '}
          <Link to="/login" className="text-[#0369a1] hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

//authorization
// import React from 'react';
// import axios from 'axios';
// import { Form, Input, Button, message } from 'antd';
// import { Link } from 'react-router-dom';

// const Signup = () => {
//   const [form] = Form.useForm();
//   const onFinish = async (values) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/signup', values);
//       const { token } = response.data;
//       localStorage.setItem('token', token);
//       message.success('Signup successful');
//       window.location.reload(); // Refresh the page to trigger useEffect in App component
//     } catch (error) {
//       if (error.response && error.response.data) {
//         message.error(error.response.data.msg);
//       } else {
//         message.error('Failed to signup. Please try again later.');
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#bae6fd]">
//       <div className="max-w-md w-full mx-auto p-4 bg-white shadow-md rounded-lg bg-[#e0f2fe]">
//         <h2 className="text-2xl font-bold mb-4 text-center text-[#0369a1]">Sign Up</h2>
//         <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
//           <Form.Item
//             name="username"
//             label="Username"
//             rules={[{ required: true, message: 'Please enter your username' }]}
//             labelCol={{ style: { fontWeight: 'bold' } }}
//           >
//             <Input placeholder="Username" />
//           </Form.Item>
//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[{ required: true, message: 'Please enter your email' }]}
//             labelCol={{ style: { fontWeight: 'bold' } }}
//           >
//             <Input placeholder="Email" />
//           </Form.Item>
//           <Form.Item
//             name="password"
//             label="Password"
//             rules={[{ required: true, message: 'Please enter your password' }]}
//             labelCol={{ style: { fontWeight: 'bold' } }}
//           >
//             <Input.Password placeholder="Password" />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" className="w-full bg-[#0369a1]">
//               Signup
//             </Button>
//           </Form.Item>
//         </Form>
//         <div className="text-center mt-4 mb-2">
//           <span>Already have an account?</span>{' '}
//           <Link to="/login" className="text-[#0369a1] hover:underline">
//             Login
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
