import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './UserProfile.css';

function UserProfile() {
  const { user, updateUser, deleteUser, logout } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age || '',
    gender: user?.gender || '',
    height: user?.height || '',
    weight: user?.weight || '',
    fitnessGoal: user?.fitnessGoal || ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const result = await updateUser(user.id, formData);
    if (result.success) {
      setMessage('Profile updated successfully!');
      setEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(result.message || 'Update failed');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }
    const result = await deleteUser(user.id);
    if (result.success) {
      logout();
    } else {
      setMessage(result.message || 'Delete failed');
    }
  };

  if (!user) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="user-profile">
      <h2>👤 User Profile</h2>
      
      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="profile-card">
        {!editing ? (
          <>
            <div className="profile-header">
              <h3>{user.name}</h3>
              <button onClick={() => setEditing(true)} className="btn-edit">
                ✏️ Edit Profile
              </button>
            </div>
            <div className="profile-details">
              <div className="detail-item">
                <strong>Email:</strong> {user.email}
              </div>
              {user.age && (
                <div className="detail-item">
                  <strong>Age:</strong> {user.age} years
                </div>
              )}
              {user.gender && (
                <div className="detail-item">
                  <strong>Gender:</strong> {user.gender}
                </div>
              )}
              {user.height && (
                <div className="detail-item">
                  <strong>Height:</strong> {user.height} cm
                </div>
              )}
              {user.weight && (
                <div className="detail-item">
                  <strong>Weight:</strong> {user.weight} kg
                </div>
              )}
              {user.fitnessGoal && (
                <div className="detail-item">
                  <strong>Fitness Goal:</strong> {user.fitnessGoal}
                </div>
              )}
            </div>
            <div className="profile-actions">
              <button onClick={handleDelete} className="btn-delete">
                🗑️ Delete Account
              </button>
            </div>
          </>
        ) : (
          <>
            <h3>Edit Profile</h3>
            <div className="profile-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Fitness Goal</label>
                <input
                  type="text"
                  name="fitnessGoal"
                  value={formData.fitnessGoal}
                  onChange={handleChange}
                  placeholder="e.g., Build muscle, Lose weight"
                />
              </div>
              <div className="form-actions">
                <button onClick={() => setEditing(false)} className="btn-cancel">
                  Cancel
                </button>
                <button onClick={handleUpdate} className="btn-save">
                  Save Changes
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfile;

