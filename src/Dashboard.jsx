import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line,
  ComposedChart, AreaChart, Area, ResponsiveContainer,
} from 'recharts';

const timeOptions = ['1 day', '1 week', '1 month', '1 year'];
const dataColors = ['#8884d8', '#82ca9d', '#ffc658'];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('1 week');
  const [statsData, setStatsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        let filteredData = [];
        if (timeRange === '1 day') {
          filteredData = response.data.slice(0, 5);
        } else if (timeRange === '1 week') {
          filteredData = response.data.slice(0, 14);
        } else if (timeRange === '1 month') {
          filteredData = response.data.slice(0, 30);
        } else if (timeRange === '1 year') {
          filteredData = response.data.slice(0, 365); 
        }
        setStatsData(filteredData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [timeRange]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">CRM Statistics Dashboard</h1>

      <div className="flex ml-2 mb-8">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border p-2 rounded-md">
          {timeOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">Sales Distribution</h2>
          {isLoading ? <p>Loading...</p> : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={statsData} dataKey="price" nameKey="title" cx="50%" cy="50%" outerRadius={80}>
                  {statsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={dataColors[index % dataColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">Customer Growth</h2>
          {isLoading ? <p>Loading...</p> : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="price" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">Revenue Over Time</h2>
          {isLoading ? <p>Loading...</p> : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Stacked Area Chart */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">Revenue Trends</h2>
          {isLoading ? <p>Loading...</p> : (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="price" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="rating.rate" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
        {/* Combined Chart */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">Combined Metrics</h2>
          {isLoading ? <p>Loading...</p> : (
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="price" fill="#8884d8" />
                <Line type="monotone" dataKey="price" stroke="#82ca9d" />
                <Area type="monotone" dataKey="rating.rate" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Cards */}
        <div className='bg-white shadow-lg rounded-lg'>
        <h2 className="text-xl font-bold mb-4 mt-4 ml-2">Product Details</h2>
        <div className="grid grid-cols-2 gap-4 mx-5 mb-2">
          {isLoading ? <p>Loading...</p> : statsData.map((stat) => (
            <div key={stat.id} className="bg-gray-100 p-4 shadow-lg rounded-lg transform transition-transform hover:scale-105 hover:cursor-pointer">
              <details>
              <summary className="text-base font-semibold mb-2">{stat.title}</summary>
              <p className='ml-3 text-sm'>{stat.description ? stat.description.slice(0, 60) : 'No description available'}...</p>
              </details>
              
            </div>
          ))}
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
