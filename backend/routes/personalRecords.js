import express from 'express';
import PersonalRecord from '../models/PersonalRecord.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// GET all personal records for a user
router.get('/', authenticate, async (req, res) => {
  try {
    const records = await PersonalRecord.find({ userId: req.userId })
      .populate('exerciseId', 'name muscleGroup')
      .sort({ exerciseName: 1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single personal record
router.get('/:exerciseId', authenticate, async (req, res) => {
  try {
    const record = await PersonalRecord.findOne({ 
      userId: req.userId, 
      exerciseId: req.params.exerciseId 
    }).populate('exerciseId', 'name muscleGroup');
    
    if (!record) {
      return res.json({ maxWeight: 0, maxReps: 0 });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE or CREATE personal record
router.post('/', authenticate, async (req, res) => {
  try {
    const { exerciseId, exerciseName, maxWeight, maxReps } = req.body;
    
    const record = await PersonalRecord.findOneAndUpdate(
      { userId: req.userId, exerciseId },
      {
        exerciseName,
        maxWeight: Math.max(maxWeight || 0, 0),
        maxReps: Math.max(maxReps || 0, 0),
        lastUpdated: new Date()
      },
      { upsert: true, new: true }
    ).populate('exerciseId', 'name muscleGroup');
    
    res.json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE max weight for an exercise
router.patch('/:exerciseId', authenticate, async (req, res) => {
  try {
    const { maxWeight, maxReps } = req.body;
    
    const record = await PersonalRecord.findOneAndUpdate(
      { userId: req.userId, exerciseId: req.params.exerciseId },
      {
        maxWeight: Math.max(maxWeight || 0, 0),
        maxReps: Math.max(maxReps || 0, 0),
        lastUpdated: new Date()
      },
      { upsert: true, new: true }
    ).populate('exerciseId', 'name muscleGroup');
    
    res.json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;


