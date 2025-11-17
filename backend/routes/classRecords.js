import express from 'express';
import ClassRecord from '../models/ClassRecord.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// GET all class records for a user
router.get('/', authenticate, async (req, res) => {
  try {
    const records = await ClassRecord.find({ userId: req.userId })
      .populate('classId', 'className')
      .sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single record
router.get('/:id', authenticate, async (req, res) => {
  try {
    const record = await ClassRecord.findOne({ _id: req.params.id, userId: req.userId })
      .populate('classId', 'className');
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE class record
router.post('/', authenticate, async (req, res) => {
  try {
    const recordData = {
      ...req.body,
      userId: req.userId
    };
    const newRecord = new ClassRecord(recordData);
    const savedRecord = await newRecord.save();
    const populated = await ClassRecord.findById(savedRecord._id)
      .populate('classId', 'className');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET weight visualization data
router.get('/stats/weight-by-exercise', authenticate, async (req, res) => {
  try {
    const records = await ClassRecord.find({ userId: req.userId });
    
    const exerciseWeightMap = {};
    
    records.forEach(record => {
      record.exercises.forEach(exercise => {
        if (!exerciseWeightMap[exercise.name]) {
          exerciseWeightMap[exercise.name] = {
            name: exercise.name,
            totalWeight: 0,
            sessions: 0,
            maxWeight: 0
          };
        }
        exerciseWeightMap[exercise.name].totalWeight += exercise.totalWeight || 0;
        exerciseWeightMap[exercise.name].sessions += 1;
        exerciseWeightMap[exercise.name].maxWeight = Math.max(
          exerciseWeightMap[exercise.name].maxWeight,
          exercise.totalWeight || 0
        );
      });
    });
    
    const stats = Object.values(exerciseWeightMap);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

