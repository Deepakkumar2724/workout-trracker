import React from 'react';
import './WorkoutList.css';

function WorkoutList({ workouts, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (workouts.length === 0) {
    return (
      <div className="workout-list-empty">
        <p>No workouts yet. Create your first workout above!</p>
      </div>
    );
  }

  return (
    <div className="workout-list">
      <h2 className="workout-list-title">Your Workouts</h2>
      <div className="workouts-grid">
        {workouts.map((workout) => (
          <div key={workout._id} className="workout-card">
            <div className="workout-card-header">
              <h3>{workout.title}</h3>
              <div className="workout-actions">
                <button
                  onClick={() => onEdit(workout)}
                  className="btn-edit"
                  title="Edit workout"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(workout._id)}
                  className="btn-delete"
                  title="Delete workout"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="workout-date">
              {formatDate(workout.createdAt)}
            </div>

            {workout.duration > 0 && (
              <div className="workout-duration">
                ⏱️ {workout.duration} minutes
              </div>
            )}

            {workout.exercises && workout.exercises.length > 0 && (
              <div className="exercises-list">
                <h4>Exercises:</h4>
                {workout.exercises.map((exercise, index) => (
                  <div key={index} className="exercise-item">
                    <div className="exercise-name">
                      <strong>{exercise.name}</strong>
                    </div>
                    <div className="exercise-details">
                      {exercise.sets > 0 && <span>Sets: {exercise.sets}</span>}
                      {exercise.reps > 0 && <span>Reps: {exercise.reps}</span>}
                      {exercise.weight > 0 && <span>Weight: {exercise.weight} lbs</span>}
                      {exercise.duration > 0 && <span>Duration: {exercise.duration} min</span>}
                    </div>
                    {exercise.notes && (
                      <div className="exercise-notes">{exercise.notes}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {workout.notes && (
              <div className="workout-notes">
                <strong>Notes:</strong> {workout.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutList;


