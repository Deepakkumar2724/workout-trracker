import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './WeightVisualization.css';

const EXERCISE_STATS_API = 'http://localhost:5000/api/class-records/stats/weight-by-exercise';
const CLASS_STATS_API = 'http://localhost:5000/api/class-records/stats/weight-by-class';

function WeightVisualization() {
  const [exerciseStats, setExerciseStats] = useState([]);
  const [classStats, setClassStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('class'); // 'class' or 'exercise'

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [exerciseResponse, classResponse] = await Promise.all([
        axios.get(EXERCISE_STATS_API),
        axios.get(CLASS_STATS_API)
      ]);
      setExerciseStats(exerciseResponse.data);
      setClassStats(classResponse.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading statistics...</div>;
  }

  const currentStats = viewMode === 'class' ? classStats : exerciseStats;
  const statsLabel = viewMode === 'class' ? 'Class' : 'Exercise';

  if (currentStats.length === 0) {
    return (
      <div className="visualization-container">
        <h2>📈 Weight Progress Visualization</h2>
        <div className="empty-state">
          <p>No workout data yet. Start logging your workouts to see progress!</p>
        </div>
      </div>
    );
  }

  // Prepare data for line chart showing progress over time (for classes)
  const prepareClassProgressData = () => {
    if (viewMode !== 'class' || classStats.length === 0) return [];
    
    // Get all unique dates
    const allDates = new Set();
    classStats.forEach(classStat => {
      classStat.dates.forEach(dateEntry => {
        allDates.add(new Date(dateEntry.date).toISOString().split('T')[0]);
      });
    });
    
    const sortedDates = Array.from(allDates).sort();
    
    // Create data points for each date
    return sortedDates.map(date => {
      const dataPoint = { date: new Date(date).toLocaleDateString() };
      classStats.forEach(classStat => {
        const dateEntry = classStat.dates.find(
          d => new Date(d.date).toISOString().split('T')[0] === date
        );
        dataPoint[classStat.name] = dateEntry ? dateEntry.weight : null;
      });
      return dataPoint;
    });
  };
  
  const classProgressData = prepareClassProgressData();

  return (
    <div className="visualization-container">
      <h2>📈 Weight Progress Visualization</h2>
      
      <div className="view-toggle">
        <button
          className={viewMode === 'class' ? 'active' : ''}
          onClick={() => setViewMode('class')}
        >
          📋 By Class
        </button>
        <button
          className={viewMode === 'exercise' ? 'active' : ''}
          onClick={() => setViewMode('exercise')}
        >
          💪 By Exercise
        </button>
      </div>
      
      <div className="stats-grid">
        <div className="chart-card">
          <h3>Total Weight Lifted by {statsLabel}</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={currentStats}>
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
          <h3>Maximum Weight by {statsLabel}</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={currentStats}>
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

      {viewMode === 'class' && classProgressData.length > 0 && (
        <div className="chart-card">
          <h3>Weight Progress Over Time by Class</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={classProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              {classStats.map((classStat, index) => {
                const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'];
                return (
                  <Line
                    key={index}
                    type="monotone"
                    dataKey={classStat.name}
                    name={classStat.name}
                    stroke={colors[index % colors.length]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    connectNulls={false}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="stats-table">
        <h3>{statsLabel} Statistics</h3>
        <table>
          <thead>
            <tr>
              <th>{statsLabel}</th>
              <th>Total Weight (lbs)</th>
              <th>Max Weight (lbs)</th>
              <th>Sessions</th>
            </tr>
          </thead>
          <tbody>
            {currentStats.map((stat, index) => (
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

