import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClassRecords.css';

const API_URL = 'http://localhost:5000/api/class-records';

function ClassRecords() {
  const [records, setRecords] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    classId: '',
    className: '',
    exercises: [],
    duration: 0,
    notes: ''
  });

  useEffect(() => {
    fetchRecords();
    fetchClasses();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/classes');
      setClasses(response.data);
      if (response.data.length > 0) {
        const firstClass = response.data[0];
        setFormData({
          classId: firstClass._id,
          className: firstClass.className,
          exercises: firstClass.exercises.map(ex => ({
            exerciseId: ex.exerciseId?._id || ex.exerciseId,
            name: ex.name,
            sets: Array.from({ length: ex.sets || 3 }).map((_, i) => ({
              setNumber: i + 1,
              reps: 0,
              weight: 0,
              completed: false
            }))
          })),
          duration: 0,
          notes: ''
        });
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleClassChange = (classId) => {
    const selectedClass = classes.find(c => c._id === classId);
    if (selectedClass) {
      setFormData({
        classId: selectedClass._id,
        className: selectedClass.className,
        exercises: selectedClass.exercises.map(ex => ({
          exerciseId: ex.exerciseId?._id || ex.exerciseId,
          name: ex.name,
          sets: Array.from({ length: ex.sets || 3 }).map((_, i) => ({
            setNumber: i + 1,
            reps: 0,
            weight: 0,
            completed: false
          }))
        })),
        duration: 0,
        notes: ''
      });
    }
  };

  const handleSetChange = (exerciseIndex, setIndex, field, value) => {
    const newExercises = [...formData.exercises];
    if (!newExercises[exerciseIndex].sets) {
      newExercises[exerciseIndex].sets = [];
    }
    if (!newExercises[exerciseIndex].sets[setIndex]) {
      newExercises[exerciseIndex].sets[setIndex] = { setNumber: setIndex + 1, reps: 0, weight: 0, completed: false };
    }
    newExercises[exerciseIndex].sets[setIndex][field] = field === 'completed' ? value : (field === 'reps' || field === 'weight' ? parseFloat(value) || 0 : value);
    
    // Calculate total weight
    const totalWeight = newExercises[exerciseIndex].sets.reduce((sum, set) => 
      sum + (set.completed ? (set.reps * set.weight) : 0), 0
    );
    newExercises[exerciseIndex].totalWeight = totalWeight;
    
    setFormData({ ...formData, exercises: newExercises });
  };

  const submitRecord = async () => {
    try {
      await axios.post(API_URL, formData);
      alert('Record saved successfully!');
      setShowForm(false);
      fetchRecords();
      setFormData({
        classId: '',
        className: '',
        exercises: [],
        duration: 0,
        notes: ''
      });
    } catch (error) {
      console.error('Error saving record:', error);
      alert('Failed to save record');
    }
  };

  if (loading && records.length === 0) {
    return <div className="loading">Loading records...</div>;
  }

  return (
    <div className="class-records">
      <div className="records-header">
        <h2>📊 Class Records</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-add-record">
          {showForm ? 'Cancel' : '+ Add Record'}
        </button>
      </div>

      {showForm && (
        <div className="record-form">
          <h3>Log New Workout Session</h3>
          <div className="form-group">
            <label>Class</label>
            <select
              value={formData.classId}
              onChange={(e) => handleClassChange(e.target.value)}
            >
              <option value="">Select a class</option>
              {classes.map((classItem) => (
                <option key={classItem._id} value={classItem._id}>
                  {classItem.className}
                </option>
              ))}
            </select>
          </div>
          {formData.exercises.map((exercise, exIndex) => (
            <div key={exIndex} className="exercise-record">
              <h4>{exercise.name}</h4>
              {Array.from({ length: exercise.sets || 3 }).map((_, setIndex) => (
                <div key={setIndex} className="set-input">
                  <span>Set {setIndex + 1}:</span>
                  <input
                    type="number"
                    placeholder="Reps"
                    value={exercise.sets?.[setIndex]?.reps || 0}
                    onChange={(e) => handleSetChange(exIndex, setIndex, 'reps', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Weight (lbs)"
                    value={exercise.sets?.[setIndex]?.weight || 0}
                    onChange={(e) => handleSetChange(exIndex, setIndex, 'weight', e.target.value)}
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={exercise.sets?.[setIndex]?.completed || false}
                      onChange={(e) => handleSetChange(exIndex, setIndex, 'completed', e.target.checked)}
                    />
                    Completed
                  </label>
                </div>
              ))}
              <p>Total Weight: {exercise.totalWeight || 0} lbs</p>
            </div>
          ))}
          <button onClick={submitRecord} className="btn-submit">Save Record</button>
        </div>
      )}

      <div className="records-list">
        {records.length === 0 ? (
          <div className="empty-state">No records yet. Log your first workout!</div>
        ) : (
          records.map((record) => (
            <div key={record._id} className="record-card">
              <div className="record-header">
                <h3>{record.className}</h3>
                <span className="record-date">
                  {new Date(record.date).toLocaleDateString()}
                </span>
              </div>
              <div className="record-exercises">
                {record.exercises.map((exercise, index) => (
                  <div key={index} className="record-exercise">
                    <strong>{exercise.name}</strong>
                    <p>Total Weight: {exercise.totalWeight || 0} lbs</p>
                    <div className="sets-summary">
                      {exercise.sets?.map((set, setIndex) => (
                        <span key={setIndex} className={set.completed ? 'set-completed' : 'set-incomplete'}>
                          Set {set.setNumber}: {set.reps} reps × {set.weight} lbs
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {record.duration > 0 && (
                <p className="record-duration">⏱️ {record.duration} minutes</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ClassRecords;

