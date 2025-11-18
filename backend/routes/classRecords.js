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
    
    // Update personal records for max weight
    const PersonalRecord = (await import('../models/PersonalRecord.js')).default;
    for (const exercise of savedRecord.exercises) {
      if (exercise.exerciseId) {
        // Calculate max weight from sets
        const maxWeightFromSets = Math.max(
          ...(exercise.sets?.map(set => set.weight || 0) || [0])
        );
        const maxRepsFromSets = Math.max(
          ...(exercise.sets?.map(set => set.reps || 0) || [0])
        );
        
        if (maxWeightFromSets > 0 || maxRepsFromSets > 0) {
          await PersonalRecord.findOneAndUpdate(
            { userId: req.userId, exerciseId: exercise.exerciseId },
            {
              exerciseName: exercise.name,
              maxWeight: maxWeightFromSets,
              maxReps: maxRepsFromSets,
              lastUpdated: new Date()
            },
            { upsert: true, new: true }
          );
        }
      }
    }
    
    const populated = await ClassRecord.findById(savedRecord._id)
      .populate('classId', 'className');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET weight visualization data by exercise
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

// GET weight visualization data by class
router.get('/stats/weight-by-class', authenticate, async (req, res) => {
  try {
    const records = await ClassRecord.find({ userId: req.userId }).sort({ date: 1 });
    
    const classWeightMap = {};
    
    records.forEach(record => {
      const className = record.className;
      if (!classWeightMap[className]) {
        classWeightMap[className] = {
          name: className,
          totalWeight: 0,
          sessions: 0,
          maxWeight: 0,
          dates: []
        };
      }
      
      const classTotalWeight = record.exercises.reduce((sum, ex) => sum + (ex.totalWeight || 0), 0);
      classWeightMap[className].totalWeight += classTotalWeight;
      classWeightMap[className].sessions += 1;
      classWeightMap[className].maxWeight = Math.max(
        classWeightMap[className].maxWeight,
        classTotalWeight
      );
      classWeightMap[className].dates.push({
        date: record.date,
        weight: classTotalWeight
      });
    });
    
    const stats = Object.values(classWeightMap);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

