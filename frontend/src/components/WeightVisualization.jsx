import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './WeightVisualization.css';

const API_URL = 'http://localhost:5000/api/class-records/stats/weight-by-exercise';

function WeightVisualization() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading statistics...</div>;
  }

  if (stats.length === 0) {
    return (
      <div className="visualization-container">
        <h2>📈 Weight Progress Visualization</h2>
        <div className="empty-state">
          <p>No workout data yet. Start logging your workouts to see progress!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="visualization-container">
      <h2>📈 Weight Progress Visualization</h2>
      
      <div className="stats-grid">
        <div className="chart-card">
          <h3>Total Weight Lifted by Exercise</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalWeight" fill="#667eea" name="Total Weight (lbs)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Maximum Weight by Exercise</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="maxWeight" fill="#764ba2" name="Max Weight (lbs)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="stats-table">
        <h3>Exercise Statistics</h3>
        <table>
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Total Weight (lbs)</th>
              <th>Max Weight (lbs)</th>
              <th>Sessions</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat, index) => (
              <tr key={index}>
                <td><strong>{stat.name}</strong></td>
                <td>{stat.totalWeight.toFixed(1)}</td>
                <td>{stat.maxWeight.toFixed(1)}</td>
                <td>{stat.sessions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WeightVisualization;

