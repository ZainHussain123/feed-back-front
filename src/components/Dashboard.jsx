import React, { useState, useEffect } from 'react';
import { Card, Statistic, Row, Col, Button } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import FeedbackList from '../components/FeedBackLists';

const Dashboard = () => {
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [positiveFeedback, setPositiveFeedback] = useState(0);
  const [negativeFeedback, setNegativeFeedback] = useState(0);
  const [feedbackData, setFeedbackData] = useState([]);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the username from local storage
    const name = localStorage.getItem('username');
    setUserName(name || 'User');
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      navigate('/dashboard');
    } else {
      navigate('/feedback-form');
    }
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

      <div className="max-w-4xl mx-auto p-4 mt-4">
        <Row gutter={16} className='mt-16'>
          <Col span={8}>
            <Card className='bg-[#e0f2fe]'>
              <Statistic
                title="Total Feedback"
                value={totalFeedback}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className='bg-[#e0f2fe]'>
              <Statistic
                title="Positive Feedback"
                value={positiveFeedback}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className='bg-[#e0f2fe]'>
              <Statistic
                title="Negative Feedback"
                value={negativeFeedback}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
        </Row>
        <FeedbackList 
          feedbackData={feedbackData} 
          setPositiveFeedback={setPositiveFeedback} 
          setNegativeFeedback={setNegativeFeedback} 
          setTotalFeedback={setTotalFeedback} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
