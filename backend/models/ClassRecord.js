import mongoose from 'mongoose';

const classRecordSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  className: {
    type: String,
    required: true
  },
  exercises: [{
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise'
    },
    name: {
      type: String,
      required: true
    },
    sets: [{
      setNumber: Number,
      reps: Number,
      weight: Number,
      completed: {
        type: Boolean,
        default: false
      }
    }],
    totalWeight: {
      type: Number,
      default: 0
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

const ClassRecord = mongoose.model('ClassRecord', classRecordSchema);

export default ClassRecord;

