import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExercisesList.css';

const API_URL = 'http://localhost:5000/api/exercises';

function ExercisesList() {
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [className, setClassName] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ muscleGroup: '', difficulty: '' });

  useEffect(() => {
    fetchExercises();
  }, [filter]);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filter.muscleGroup) params.muscleGroup = filter.muscleGroup;
      if (filter.difficulty) params.difficulty = filter.difficulty;
      
      const response = await axios.get(API_URL, { params });
      setExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExercise = (exercise) => {
    if (selectedExercises.find(e => e._id === exercise._id)) {
      setSelectedExercises(selectedExercises.filter(e => e._id !== exercise._id));
    } else {
      setSelectedExercises([...selectedExercises, {
        exerciseId: exercise._id,
        name: exercise.name,
        sets: 3,
        reps: 10,
        weight: 0,
        restTime: 60
      }]);
    }
  };

  const updateSelectedExercise = (id, field, value) => {
    setSelectedExercises(selectedExercises.map(ex => 
      ex.exerciseId === id ? { ...ex, [field]: value } : ex
    ));
  };

  const createClass = async () => {
    if (!className.trim()) {
      alert('Please enter a class name');
      return;
    }
    if (selectedExercises.length === 0) {
      alert('Please select at least one exercise');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/classes', {
        className,
        exercises: selectedExercises
      });
      alert('Class created successfully!');
      setClassName('');
      setSelectedExercises([]);
    } catch (error) {
      console.error('Error creating class:', error);
      alert('Failed to create class');
    }
  };

  return (
    <div className="exercises-list">
      <h2>💪 Exercises Library</h2>
      
      <div className="filters">
        <select
          value={filter.muscleGroup}
          onChange={(e) => setFilter({ ...filter, muscleGroup: e.target.value })}
        >
          <option value="">All Muscle Groups</option>
          <option value="chest">Chest</option>
          <option value="back">Back</option>
          <option value="shoulders">Shoulders</option>
          <option value="arms">Arms</option>
          <option value="legs">Legs</option>
          <option value="core">Core</option>
        </select>
        <select
          value={filter.difficulty}
          onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
        >
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="selected-exercises-section">
        <h3>Create Class from Selected Exercises</h3>
        <input
          type="text"
          placeholder="Enter class name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="class-name-input"
        />
        {selectedExercises.length > 0 && (
          <div className="selected-list">
            {selectedExercises.map((ex) => (
              <div key={ex.exerciseId} className="selected-exercise">
                <strong>{ex.name}</strong>
                <div className="exercise-inputs">
                  <input
                    type="number"
                    placeholder="Sets"
                    value={ex.sets}
                    onChange={(e) => updateSelectedExercise(ex.exerciseId, 'sets', parseInt(e.target.value) || 0)}
                  />
                  <input
                    type="number"
                    placeholder="Reps"
                    value={ex.reps}
                    onChange={(e) => updateSelectedExercise(ex.exerciseId, 'reps', parseInt(e.target.value) || 0)}
                  />
                  <input
                    type="number"
                    placeholder="Weight (lbs)"
                    value={ex.weight}
                    onChange={(e) => updateSelectedExercise(ex.exerciseId, 'weight', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            ))}
            <button onClick={createClass} className="btn-create-class">
              Create Class
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="loading">Loading exercises...</div>
      ) : (
        <div className="exercises-grid">
          {exercises.map((exercise) => {
            const isSelected = selectedExercises.find(e => e.exerciseId === exercise._id);
            return (
              <div
                key={exercise._id}
                className={`exercise-card ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleExercise(exercise)}
              >
                {exercise.gifUrl && (
                  <img src={exercise.gifUrl} alt={exercise.name} className="exercise-gif" />
                )}
                <div className="exercise-info">
                  <h3>{exercise.name}</h3>
                  <p className="muscle-group">{exercise.muscleGroup}</p>
                  <div className="exercise-tags">
                    <span className={`difficulty ${exercise.difficulty}`}>{exercise.difficulty}</span>
                    <span className="equipment">{exercise.equipment}</span>
                  </div>
                  {isSelected && <div className="selected-badge">✓ Selected</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ExercisesList;

