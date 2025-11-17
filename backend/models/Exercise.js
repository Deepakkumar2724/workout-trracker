import mongoose from 'mongoose';

const exerciseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  muscleGroup: {
    type: String,
    required: true
  },
  equipment: {
    type: String,
    default: 'Bodyweight'
  },
  instructions: {
    type: String,
    default: ''
  },
  gifUrl: {
    type: String,
    default: ''
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  }
}, {
  timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;

