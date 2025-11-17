import express from 'express';
import Class from '../models/Class.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// GET all classes for a user
router.get('/', authenticate, async (req, res) => {
  try {
    const classes = await Class.find({ userId: req.userId })
      .populate('exercises.exerciseId', 'name muscleGroup gifUrl')
      .sort({ createdAt: -1 });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single class
router.get('/:id', authenticate, async (req, res) => {
  try {
    const classItem = await Class.findOne({ _id: req.params.id, userId: req.userId })
      .populate('exercises.exerciseId', 'name muscleGroup gifUrl instructions');
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(classItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE class
router.post('/', authenticate, async (req, res) => {
  try {
    const classData = {
      ...req.body,
      userId: req.userId
    };
    const newClass = new Class(classData);
    const savedClass = await newClass.save();
    const populated = await Class.findById(savedClass._id)
      .populate('exercises.exerciseId', 'name muscleGroup gifUrl');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE class
router.patch('/:id', authenticate, async (req, res) => {
  try {
    const classItem = await Class.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    ).populate('exercises.exerciseId', 'name muscleGroup gifUrl');
    
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(classItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE class
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const classItem = await Class.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

