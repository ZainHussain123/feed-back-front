import React, { useState, useEffect } from 'react';
import { Input, Select, Table } from 'antd';

const { Option } = Select;

const FeedbackList = ({setTotalFeedback,setNegativeFeedback,setPositiveFeedback}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('all');
  const [feedbackData, setFeedbackData] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/feedback/list');
        if (!response.ok) {
          throw new Error('Failed to fetch feedback');
        }
        const data = await response.json();
        setTotalFeedback(data?.length)
        setNegativeFeedback(data?.filter(item => item.sentiment === 'Negative').length)
        setPositiveFeedback(data?.filter(item => item.sentiment === 'Positive').length)
        setFeedbackData(data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  useEffect(() => {
    let filtered = feedbackData.filter(item =>
      item.feedback.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sentimentFilter !== 'all') {
      filtered = filtered.filter(item => item.sentiment === sentimentFilter);
    }

    setFilteredFeedback(filtered);
  }, [feedbackData, searchTerm, sentimentFilter]);

  

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Feedback',
      dataIndex: 'feedback',
      key: 'feedback',
    },
    {
      title: 'Sentiment',
      dataIndex: 'sentiment',
      key: 'sentiment',
    },
  ];

  return (
    <div className=" mx-auto p-4">
      <div className="flex justify-between mb-4">
        <Input.Search
          placeholder="Search feedback"
          onSearch={value => setSearchTerm(value)}
          style={{ width: 200 }}
        />
        <Select
          defaultValue="all"
          style={{ width: 120 }}
          onChange={value => setSentimentFilter(value)}
        >
          <Option value="all">All</Option>
          <Option value="Positive">Positive</Option>
          <Option value="Neutral">Neutral</Option>
          <Option value="Negative">Negative</Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={filteredFeedback}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default FeedbackList;
