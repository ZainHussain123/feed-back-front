// import React from 'react';
// import { Input, Button, Form, message } from 'antd';

// const FeedbackForm = ({ onFeedbackSubmit }) => {
//   const [form] = Form.useForm();

//   const onFinish = async (values) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/feedback/submit', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(`Failed to submit feedback. Server responded with ${response.status}: ${errorMessage}`);
//       }

//       const data = await response.json();
//       message.success('Feedback submitted successfully!');
//       form.resetFields();
//       onFeedbackSubmit(data); // Pass submitted values to parent component
//     } catch (error) {
//       console.error('Error submitting feedback:', error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-2 shadow-md rounded-lg">
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         labelCol={{ style: { fontWeight: 'bold' } }}
//         requiredMark={false} // Remove asterisks for required fields
//         style={{ backgroundColor: '#e0f2fe', padding: '20px', borderRadius: '8px' }}
//       >
//         <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter your name' }]}>
//           <Input placeholder="Name" />
//         </Form.Item>
//         <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email' }]}>
//           <Input placeholder="Email" />
//         </Form.Item>
//         <Form.Item name="product" label="Product/Service" rules={[{ required: true, message: 'Please enter the product or service' }]}>
//           <Input placeholder="Product/Service" />
//         </Form.Item>
//         <Form.Item name="feedback" label="Feedback" rules={[{ required: true, message: 'Please enter your feedback' }]}>
//           <Input.TextArea placeholder="Feedback" rows={4} />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit" className="w-full bg-[#0369a1]">Submit</Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default FeedbackForm;


import { Input, Button, Form, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const FeedbackForm = ({ onFeedbackSubmit }) => {
  const [form] = Form.useForm();
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch('http://localhost:5000/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to submit feedback. Server responded with ${response.status}: ${errorMessage}`);
      }

      const data = await response.json();
      message.success('Feedback submitted successfully!');
      form.resetFields();
      onFeedbackSubmit(data);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  useEffect(() => {
    const name = localStorage.getItem('username');
    setUserName(name || 'User');
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem('token');
      navigate('/login');
  };
  

  return (
    <div className='bg-[#bae6fd] h-screen'>
      
      {/* Navbar */}
      <div className="bg-[#0369a1] text-white p-4 flex justify-between items-center">
        <div className="text-lg font-semibold">
         
          {`Welcome ${userName}`}
        </div>
        <Button type="primary" onClick={handleLogout} className="bg-[#0284c7]">
          Logout
        </Button>
      </div>
      <div className="max-w-md w-full mx-auto bg-white shadow-md rounded-lg bg-[#e0f2fe] mt-20">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        labelCol={{ style: { fontWeight: 'bold' } }}
        requiredMark={false}
        style={{ backgroundColor: '#e0f2fe', padding: '20px', borderRadius: '8px' }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter your name' }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email' }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="product" label="Product/Service" rules={[{ required: true, message: 'Please enter the product or service' }]}>
          <Input placeholder="Product/Service" />
        </Form.Item>
        <Form.Item name="feedback" label="Feedback" rules={[{ required: true, message: 'Please enter your feedback' }]}>
          <Input.TextArea placeholder="Feedback" rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full bg-[#0369a1]">Submit</Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};

export default FeedbackForm;
