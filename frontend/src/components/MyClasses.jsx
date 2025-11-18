import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyClasses.css';

const API_URL = 'http://localhost:5000/api/classes';

function MyClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClasses();

    // Listen for class creation events to refresh the list
    const handleClassCreated = () => {
      fetchClasses();
    };

    window.addEventListener('classCreated', handleClassCreated);
    
    return () => {
      window.removeEventListener('classCreated', handleClassCreated);
    };
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteClass = async (id) => {
    if (!window.confirm('Are you sure you want to delete this class?')) {
      return;
    }
    try {
      await axios.delete(`${API_URL}/${id}`);
      setClasses(classes.filter(c => c._id !== id));
    } catch (error) {
      console.error('Error deleting class:', error);
      alert('Failed to delete class');
    }
  };

  if (loading) {
    return <div className="loading">Loading classes...</div>;
  }

  return (
    <div className="my-classes">
      <h2>📋 My Classes</h2>
      {classes.length === 0 ? (
        <div className="empty-state">
          <p>No classes yet. Create a class from the Exercises section!</p>
        </div>
      ) : (
        <div className="classes-grid">
          {classes.map((classItem) => (
            <div key={classItem._id} className="class-card">
              <div className="class-header">
                <h3>{classItem.className}</h3>
                <button
                  onClick={() => deleteClass(classItem._id)}
                  className="btn-delete"
                >
                  🗑️
                </button>
              </div>
              <div className="class-exercises">
                <h4>Exercises ({classItem.exercises.length}):</h4>
                {classItem.exercises.map((exercise, index) => (
                  <div key={index} className="exercise-item">
                    <strong>{exercise.name}</strong>
                    <div className="exercise-details">
                      <span>Sets: {exercise.sets}</span>
                      <span>Reps: {exercise.reps}</span>
                      {exercise.weight > 0 && <span>Weight: {exercise.weight} lbs</span>}
                    </div>
                    {exercise.exerciseId?.gifUrl && (
                      <img
                        src={exercise.exerciseId.gifUrl}
                        alt={exercise.name}
                        className="exercise-gif-small"
                      />
                    )}
                  </div>
                ))}
              </div>
              {classItem.duration > 0 && (
                <p className="class-duration">⏱️ Duration: {classItem.duration} minutes</p>
              )}
              {classItem.notes && classItem.notes.trim() && (
                <p className="class-notes">📝 {classItem.notes}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyClasses;

