import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TrainersList.css';

const API_URL = 'http://localhost:5000/api/trainers';

function TrainersList() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTrainers(response.data);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading trainers...</div>;
  }

  return (
    <div className="trainers-list">
      <h2>🏋️ Fitness Trainers & Influencers</h2>
      {trainers.length === 0 ? (
        <div className="empty-state">
          <p>No trainers available. Add some trainers to the database!</p>
        </div>
      ) : (
        <div className="trainers-grid">
          {trainers.map((trainer) => (
            <div key={trainer._id} className="trainer-card">
              {trainer.image && (
                <img src={trainer.image} alt={trainer.name} className="trainer-image" />
              )}
              <div className="trainer-info">
                <h3>{trainer.name}</h3>
                <p className="specialization">{trainer.specialization}</p>
                <div className="trainer-stats">
                  <span>⭐ {trainer.rating.toFixed(1)}</span>
                  <span>👥 {trainer.followers} followers</span>
                  <span>💼 {trainer.experience} years</span>
                </div>
                {trainer.bio && <p className="trainer-bio">{trainer.bio}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrainersList;

