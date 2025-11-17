import express from 'express';
import Exercise from '../models/Exercise.js';

const router = express.Router();

// GET all exercises
router.get('/', async (req, res) => {
  try {
    const { muscleGroup, difficulty } = req.query;
    const query = {};
    if (muscleGroup) query.muscleGroup = muscleGroup;
    if (difficulty) query.difficulty = difficulty;
    
    const exercises = await Exercise.find(query).sort({ name: 1 });
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single exercise
router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE exercise
router.post('/', async (req, res) => {
  try {
    const exercise = new Exercise(req.body);
    const savedExercise = await exercise.save();
    res.status(201).json(savedExercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;

