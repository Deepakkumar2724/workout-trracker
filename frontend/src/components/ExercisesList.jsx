import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExercisesList.css';

const API_URL = 'http://localhost:5000/api/exercises';
const CHEST_GIF_URL = 'https://media1.tenor.com/m/FupNUfpi7HQAAAAd/%E0%A4%95%E0%A4%B8%E0%A4%B0%E0%A4%A4-%E0%A4%B5%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AF%E0%A4%BE%E0%A4%AE.gif';
const BACK_GIF_URL = 'https://i.pinimg.com/736x/b3/20/a9/b320a94dfbf39d9998c01a7abbf17055.jpg';
const SHOULDERS_GIF_URL = 'https://tse3.mm.bing.net/th/id/OIP.3nwvxaR04rPVTvAnY4w5tQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3';
const ARMS_GIF_URL = 'https://i.pinimg.com/originals/42/ad/d8/42add80cac4d1a532abd1f60c23fb0a6.jpg';
const LEGS_GIF_URL = 'https://tse4.mm.bing.net/th/id/OIP.c4o4kbRMrVMznhQi8X_etgHaHZ?w=735&h=734&rs=1&pid=ImgDetMain&o=7&rm=3';
const CORE_GIF_URL = 'https://tse1.mm.bing.net/th/id/OIP.FaLYYGc-nzHAZiXBiHt_2wHaNL?w=750&h=1334&rs=1&pid=ImgDetMain&o=7&rm=3';

const MUSCLE_GIF_MAP = {
  chest: {
    url: CHEST_GIF_URL,
    title: 'Chest Workout Preview',
    description: 'Explosive push motion to target upper and lower pecs.'
  },
  back: {
    url: BACK_GIF_URL,
    title: 'Back Workout Preview',
    description: 'Controlled row to engage lats and rear delts with perfect form.'
  },
  shoulders: {
    url: SHOULDERS_GIF_URL,
    title: 'Shoulder Workout Preview',
    description: 'Overhead press focus to build capped delts and stability.'
  },
  arms: {
    url: ARMS_GIF_URL,
    title: 'Arms Workout Preview',
    description: 'Isolation curls to fire up biceps, triceps, and forearms.'
  },
  legs: {
    url: LEGS_GIF_URL,
    title: 'Legs Workout Preview',
    description: 'Deep squat stance to build quads, glutes, and hamstrings.'
  },
  core: {
    url: CORE_GIF_URL,
    title: 'Core Workout Preview',
    description: 'Hollow hold variation to light up your abs and stabilizers.'
  }
};

function ExercisesList() {
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [className, setClassName] = useState('');
  const [classDuration, setClassDuration] = useState(0);
  const [classNotes, setClassNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ muscleGroup: '', difficulty: '' });
  const [zoomImage, setZoomImage] = useState(null);

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
    console.log('Exercise clicked:', exercise.name);
    const isAlreadySelected = selectedExercises.find(e => e.exerciseId === exercise._id);
    if (isAlreadySelected) {
      setSelectedExercises(selectedExercises.filter(e => e.exerciseId !== exercise._id));
      console.log('Exercise deselected:', exercise.name);
    } else {
      setSelectedExercises([...selectedExercises, {
        exerciseId: exercise._id,
        name: exercise.name,
        sets: 3,
        reps: 10,
        weight: 0,
        restTime: 60
      }]);
      console.log('Exercise selected:', exercise.name);
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
      const response = await axios.post('http://localhost:5000/api/classes', {
        className,
        duration: classDuration,
        notes: classNotes,
        exercises: selectedExercises
      });
      // Dispatch event to notify MyClasses component to refresh and switch tab
      window.dispatchEvent(new CustomEvent('classCreated', { detail: response.data }));
      
      alert(`Class "${className}" created successfully! Redirecting to My Classes...`);
      
      setClassName('');
      setClassDuration(0);
      setClassNotes('');
      setSelectedExercises([]);
    } catch (error) {
      console.error('Error creating class:', error);
      alert('Failed to create class');
    }
  };

  const selectedMuscleGif = MUSCLE_GIF_MAP[filter.muscleGroup];

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

      {selectedMuscleGif && (
        <div className="muscle-gif-banner">
          <div>
            <h3>{selectedMuscleGif.title}</h3>
            <p>{selectedMuscleGif.description}</p>
          </div>
          <img
            src={selectedMuscleGif.url}
            alt={`${selectedMuscleGif.title} demo`}
            className="muscle-gif-preview"
            loading="lazy"
            onClick={() => setZoomImage({ url: selectedMuscleGif.url, title: selectedMuscleGif.title })}
          />
        </div>
      )}

      <div className="selected-exercises-section">
        <h3>Create Class from Selected Exercises</h3>
        <div className="class-details-grid">
          <input
            type="text"
            placeholder="Enter class name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="class-name-input"
          />
          <input
            type="number"
            min="0"
            placeholder="Duration (mins)"
            value={classDuration}
            onChange={(e) => setClassDuration(parseInt(e.target.value, 10) || 0)}
            className="class-duration-input"
          />
          <textarea
            placeholder="Notes or goals for this class"
            value={classNotes}
            onChange={(e) => setClassNotes(e.target.value)}
            className="class-notes-input"
            rows={2}
          />
        </div>
        <div className="selected-list">
          {selectedExercises.length > 0 ? (
            selectedExercises.map((ex) => (
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
            ))
          ) : (
            <div className="selected-hint">
              <p>💡 <strong>How to select exercises:</strong></p>
              <p>Scroll down to see the exercise cards below. Click on any exercise card to add it to this class. Selected exercises will show a "✓ Selected" badge.</p>
            </div>
          )}
          <button
            onClick={createClass}
            className="btn-create-class"
          >
            Create Class
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading exercises...</div>
      ) : exercises.length === 0 ? (
        <div className="empty-exercises">
          <p>No exercises found. Try adjusting your filters or add exercises to the database.</p>
        </div>
      ) : (
        <div className="exercises-section">
          <h3 style={{ marginBottom: '15px', color: '#333' }}>
            💪 Available Exercises ({exercises.length}) - <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: '#667eea' }}>Click on any exercise card below to select it</span>
          </h3>
          <div className="exercises-grid">
            {exercises.map((exercise) => {
            const isSelected = selectedExercises.find(e => e.exerciseId === exercise._id);
            const muscleKey = exercise.muscleGroup ? exercise.muscleGroup.toLowerCase() : '';
            const fallbackGif = MUSCLE_GIF_MAP[muscleKey]?.url || null;
            const gifUrl = exercise.gifUrl || fallbackGif;
            return (
              <div
                key={exercise._id}
                className={`exercise-card ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleExercise(exercise)}
              >
                {gifUrl && (
                  <img
                    src={gifUrl}
                    alt={`${exercise.name} demo`}
                    className="exercise-gif"
                    loading="lazy"
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomImage({ url: gifUrl, title: exercise.name });
                    }}
                  />
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
        </div>
      )}

      {zoomImage && (
        <div className="gif-zoom-overlay" onClick={() => setZoomImage(null)}>
          <div className="gif-zoom-content" onClick={(e) => e.stopPropagation()}>
            <button className="gif-zoom-close" onClick={() => setZoomImage(null)} aria-label="Close zoomed image">
              ×
            </button>
            <img src={zoomImage.url} alt={zoomImage.title} />
            <p>{zoomImage.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExercisesList;

