import mongoose from 'mongoose';

const classSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  className: {
    type: String,
    required: true
  },
  exercises: [{
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true
    },
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
    restTime: {
      type: Number,
      default: 60
    }
  }],
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

const Class = mongoose.model('Class', classSchema);

export default Class;

