import React, { useState, useEffect } from 'react';
import './WorkoutForm.css';

function WorkoutForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState('');
  const [exercises, setExercises] = useState([{ name: '', sets: 0, reps: 0, weight: 0, duration: 0, notes: '' }]);
  const [duration, setDuration] = useState(0);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setExercises(initialData.exercises && initialData.exercises.length > 0 
        ? initialData.exercises 
        : [{ name: '', sets: 0, reps: 0, weight: 0, duration: 0, notes: '' }]);
      setDuration(initialData.duration || 0);
      setNotes(initialData.notes || '');
    }
  }, [initialData]);

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: 0, reps: 0, weight: 0, duration: 0, notes: '' }]);
  };

  const removeExercise = (index) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const workoutData = {
      title,
      exercises: exercises.filter(ex => ex.name.trim() !== ''),
      duration,
      notes
    };
    
    if (onSubmit(workoutData)) {
      // Reset form if successful
      if (!initialData) {
        setTitle('');
        setExercises([{ name: '', sets: 0, reps: 0, weight: 0, duration: 0, notes: '' }]);
        setDuration(0);
        setNotes('');
      }
    }
  };

  return (
    <div className="workout-form-container">
      <form className="workout-form" onSubmit={handleSubmit}>
        <h2>{initialData ? 'Edit Workout' : 'Create New Workout'}</h2>
        
        <div className="form-group">
          <label>Workout Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Upper Body, Leg Day, Cardio"
            required
          />
        </div>

        <div className="exercises-section">
          <div className="section-header">
            <h3>Exercises</h3>
            <button type="button" onClick={addExercise} className="btn-add">
              + Add Exercise
            </button>
          </div>

          {exercises.map((exercise, index) => (
            <div key={index} className="exercise-card">
              <div className="exercise-header">
                <h4>Exercise {index + 1}</h4>
                {exercises.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExercise(index)}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="exercise-fields">
                <div className="form-group">
                  <label>Exercise Name</label>
                  <input
                    type="text"
                    value={exercise.name}
                    onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                    placeholder="e.g., Bench Press, Squats"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Sets</label>
                    <input
                      type="number"
                      value={exercise.sets}
                      onChange={(e) => handleExerciseChange(index, 'sets', parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>

                  <div className="form-group">
                    <label>Reps</label>
                    <input
                      type="number"
                      value={exercise.reps}
                      onChange={(e) => handleExerciseChange(index, 'reps', parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>

                  <div className="form-group">
                    <label>Weight (lbs)</label>
                    <input
                      type="number"
                      value={exercise.weight}
                      onChange={(e) => handleExerciseChange(index, 'weight', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.5"
                    />
                  </div>

                  <div className="form-group">
                    <label>Duration (min)</label>
                    <input
                      type="number"
                      value={exercise.duration}
                      onChange={(e) => handleExerciseChange(index, 'duration', parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    value={exercise.notes}
                    onChange={(e) => handleExerciseChange(index, 'notes', e.target.value)}
                    placeholder="Any notes about this exercise..."
                    rows="2"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Total Duration (minutes)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
              min="0"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Workout Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Overall notes about this workout..."
            rows="3"
          />
        </div>

        <div className="form-actions">
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn-cancel">
              Cancel
            </button>
          )}
          <button type="submit" className="btn-submit">
            {initialData ? 'Update Workout' : 'Create Workout'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default WorkoutForm;


