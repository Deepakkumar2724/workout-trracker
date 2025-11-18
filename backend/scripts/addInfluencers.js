import mongoose from 'mongoose';
import Trainer from '../models/Trainer.js';
import dotenv from 'dotenv';

dotenv.config();

const influencers = [
  {
    name: 'Chris Bumstead',
    specialization: 'Classic Physique Bodybuilding',
    experience: 8,
    rating: 4.9,
    followers: 5000000,
    instagram: 'cbum',
    bio: '5x Classic Physique Olympia Champion. Known for his incredible physique and dedication to the sport of bodybuilding.'
  },
  {
    name: 'Phil Heath',
    specialization: 'Bodybuilding',
    experience: 15,
    rating: 4.8,
    followers: 3000000,
    instagram: 'philheath',
    bio: '7x Mr. Olympia winner. One of the greatest bodybuilders of all time, known as "The Gift".'
  },
  {
    name: 'David Laid',
    specialization: 'Natural Bodybuilding & Transformation',
    experience: 10,
    rating: 4.7,
    followers: 4000000,
    instagram: 'davidlaid',
    bio: 'Fitness influencer and transformation specialist. Known for his natural physique development and motivational content.'
  }
];

async function addInfluencers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/workout');
    console.log('Connected to MongoDB');

    for (const influencer of influencers) {
      // Check if trainer already exists
      const existing = await Trainer.findOne({ instagram: influencer.instagram });
      if (existing) {
        console.log(`Influencer @${influencer.instagram} already exists, skipping...`);
        continue;
      }

      const trainer = new Trainer(influencer);
      await trainer.save();
      console.log(`Added influencer: ${influencer.name} (@${influencer.instagram})`);
    }

    console.log('All influencers added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding influencers:', error);
    process.exit(1);
  }
}

addInfluencers();


