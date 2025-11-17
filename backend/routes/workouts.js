import express from 'express';
import Workout from '../models/Workout.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// GET all workouts for a user
router.get('/', authenticate, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single workout
router.get('/:id', authenticate, async (req, res) => {
  try {
    const workout = await Workout.findOne({ _id: req.params.id, userId: req.userId });
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new workout
router.post('/', authenticate, async (req, res) => {
  try {
    const workout = new Workout({
      ...req.body,
      userId: req.userId
    });
    const savedWorkout = await workout.save();
    res.status(201).json(savedWorkout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a workout
router.patch('/:id', authenticate, async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a workout
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;


