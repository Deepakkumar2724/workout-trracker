import express from 'express';
import Trainer from '../models/Trainer.js';

const router = express.Router();

// GET all trainers
router.get('/', async (req, res) => {
  try {
    const trainers = await Trainer.find().sort({ rating: -1, followers: -1 });
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single trainer
router.get('/:id', async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE trainer (for seeding data)
router.post('/', async (req, res) => {
  try {
    const trainer = new Trainer(req.body);
    const savedTrainer = await trainer.save();
    res.status(201).json(savedTrainer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;

