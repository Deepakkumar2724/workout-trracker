import mongoose from 'mongoose';

const workoutSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  exercises: [{
    name: {
      type: String,
      required: true
    },
    sets: {
      type: Number,
      default: 0
    },
    reps: {
      type: Number,
      default: 0
    },
    weight: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0
    },
    notes: {
      type: String,
      default: ''
    }
  }],
  date: {
    type: Date,
    default: Date.now
  },
  duration: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;


