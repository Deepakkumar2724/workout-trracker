import mongoose from 'mongoose';

const trainerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  image: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  followers: {
    type: Number,
    default: 0
  },
  instagram: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Trainer = mongoose.model('Trainer', trainerSchema);

export default Trainer;

