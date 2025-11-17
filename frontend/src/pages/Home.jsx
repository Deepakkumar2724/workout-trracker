import React, { useState } from 'react';
import TrainersList from '../components/TrainersList';
import ExercisesList from '../components/ExercisesList';
import MyClasses from '../components/MyClasses';
import ClassRecords from '../components/ClassRecords';
import WeightVisualization from '../components/WeightVisualization';
import UserProfile from '../components/UserProfile';
import './Home.css';

function Home() {
  const [activeSection, setActiveSection] = useState('exercises');

  return (
    <div className="home-container">
      <div className="home-layout">
        {/* Right Sidebar - Trainers */}
        <aside className="trainers-sidebar">
          <h3>🏋️ Top Trainers</h3>
          <TrainersList />
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <nav className="section-nav">
            <button
              className={activeSection === 'exercises' ? 'active' : ''}
              onClick={() => setActiveSection('exercises')}
            >
              💪 Exercises
            </button>
            <button
              className={activeSection === 'classes' ? 'active' : ''}
              onClick={() => setActiveSection('classes')}
            >
              📋 My Classes
            </button>
            <button
              className={activeSection === 'records' ? 'active' : ''}
              onClick={() => setActiveSection('records')}
            >
              📊 Records
            </button>
            <button
              className={activeSection === 'visualization' ? 'active' : ''}
              onClick={() => setActiveSection('visualization')}
            >
              📈 Progress
            </button>
            <button
              className={activeSection === 'profile' ? 'active' : ''}
              onClick={() => setActiveSection('profile')}
            >
              👤 Profile
            </button>
          </nav>

          <div className="section-content">
            {activeSection === 'exercises' && <ExercisesList />}
            {activeSection === 'classes' && <MyClasses />}
            {activeSection === 'records' && <ClassRecords />}
            {activeSection === 'visualization' && <WeightVisualization />}
            {activeSection === 'profile' && <UserProfile />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;

