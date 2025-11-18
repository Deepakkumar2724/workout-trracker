import mongoose from 'mongoose';

const personalRecordSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true
  },
  exerciseName: {
    type: String,
    required: true
  },
  maxWeight: {
    type: Number,
    default: 0
  },
  maxReps: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Ensure one record per user per exercise
personalRecordSchema.index({ userId: 1, exerciseId: 1 }, { unique: true });

const PersonalRecord = mongoose.model('PersonalRecord', personalRecordSchema);

export default PersonalRecord;


