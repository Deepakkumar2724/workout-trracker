import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import workoutRoutes from './routes/workouts.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import trainerRoutes from './routes/trainers.js';
import exerciseRoutes from './routes/exercises.js';
import classRoutes from './routes/classes.js';
import classRecordRoutes from './routes/classRecords.js';
import personalRecordRoutes from './routes/personalRecords.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/class-records', classRecordRoutes);
app.use('/api/personal-records', personalRecordRoutes);
app.use('/api/workouts', workoutRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Workout Tracker API is running!' });
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/workout-tracker';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });


