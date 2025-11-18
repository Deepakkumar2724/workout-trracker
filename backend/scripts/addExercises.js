import mongoose from 'mongoose';
import Exercise from '../models/Exercise.js';
import dotenv from 'dotenv';

dotenv.config();

const exercises = [
  // Chest Exercises
  {
    name: 'Push-ups',
    muscleGroup: 'chest',
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: 'Start in plank position, lower body until chest nearly touches floor, push back up.',
    gifUrl: ''
  },
  {
    name: 'Bench Press',
    muscleGroup: 'chest',
    equipment: 'Barbell',
    difficulty: 'intermediate',
    instructions: 'Lie on bench, lower barbell to chest, press up until arms are extended.',
    gifUrl: ''
  },
  {
    name: 'Dumbbell Flyes',
    muscleGroup: 'chest',
    equipment: 'Dumbbells',
    difficulty: 'intermediate',
    instructions: 'Lie on bench, lower dumbbells in wide arc, bring back together above chest.',
    gifUrl: ''
  },
  {
    name: 'Incline Dumbbell Press',
    muscleGroup: 'chest',
    equipment: 'Dumbbells',
    difficulty: 'intermediate',
    instructions: 'Press dumbbells upward on inclined bench, focus on upper chest.',
    gifUrl: ''
  },
  
  // Back Exercises
  {
    name: 'Pull-ups',
    muscleGroup: 'back',
    equipment: 'Pull-up Bar',
    difficulty: 'intermediate',
    instructions: 'Hang from bar, pull body up until chin clears bar, lower with control.',
    gifUrl: ''
  },
  {
    name: 'Bent-Over Rows',
    muscleGroup: 'back',
    equipment: 'Barbell',
    difficulty: 'intermediate',
    instructions: 'Bend forward, pull barbell to lower chest/upper abdomen, squeeze back muscles.',
    gifUrl: ''
  },
  {
    name: 'Lat Pulldowns',
    muscleGroup: 'back',
    equipment: 'Cable Machine',
    difficulty: 'beginner',
    instructions: 'Pull bar down to upper chest, control the weight back up.',
    gifUrl: ''
  },
  {
    name: 'Deadlifts',
    muscleGroup: 'back',
    equipment: 'Barbell',
    difficulty: 'advanced',
    instructions: 'Lift barbell from floor to standing position, keep back straight throughout.',
    gifUrl: ''
  },
  
  // Shoulder Exercises
  {
    name: 'Shoulder Press',
    muscleGroup: 'shoulders',
    equipment: 'Dumbbells',
    difficulty: 'intermediate',
    instructions: 'Press dumbbells overhead from shoulder height, lower with control.',
    gifUrl: ''
  },
  {
    name: 'Lateral Raises',
    muscleGroup: 'shoulders',
    equipment: 'Dumbbells',
    difficulty: 'beginner',
    instructions: 'Raise dumbbells to sides until arms are parallel to floor.',
    gifUrl: ''
  },
  {
    name: 'Front Raises',
    muscleGroup: 'shoulders',
    equipment: 'Dumbbells',
    difficulty: 'beginner',
    instructions: 'Raise dumbbells forward until arms are parallel to floor.',
    gifUrl: ''
  },
  {
    name: 'Rear Delt Flyes',
    muscleGroup: 'shoulders',
    equipment: 'Dumbbells',
    difficulty: 'intermediate',
    instructions: 'Bend forward, raise dumbbells to sides, target rear deltoids.',
    gifUrl: ''
  },
  
  // Arms Exercises
  {
    name: 'Bicep Curls',
    muscleGroup: 'arms',
    equipment: 'Dumbbells',
    difficulty: 'beginner',
    instructions: 'Curl dumbbells from arms extended to full contraction, control the negative.',
    gifUrl: ''
  },
  {
    name: 'Tricep Dips',
    muscleGroup: 'arms',
    equipment: 'Bodyweight',
    difficulty: 'intermediate',
    instructions: 'Lower body by bending arms, push back up using triceps.',
    gifUrl: ''
  },
  {
    name: 'Hammer Curls',
    muscleGroup: 'arms',
    equipment: 'Dumbbells',
    difficulty: 'beginner',
    instructions: 'Curl dumbbells with neutral grip (palms facing each other).',
    gifUrl: ''
  },
  {
    name: 'Overhead Tricep Extension',
    muscleGroup: 'arms',
    equipment: 'Dumbbell',
    difficulty: 'intermediate',
    instructions: 'Extend dumbbell overhead, lower behind head, extend back up.',
    gifUrl: ''
  },
  
  // Legs Exercises
  {
    name: 'Squats',
    muscleGroup: 'legs',
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: 'Lower body by bending knees and hips, keep back straight, return to standing.',
    gifUrl: ''
  },
  {
    name: 'Barbell Squats',
    muscleGroup: 'legs',
    equipment: 'Barbell',
    difficulty: 'intermediate',
    instructions: 'Squat with barbell on shoulders, go below parallel, drive through heels.',
    gifUrl: ''
  },
  {
    name: 'Lunges',
    muscleGroup: 'legs',
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: 'Step forward into lunge position, push back to start, alternate legs.',
    gifUrl: ''
  },
  {
    name: 'Leg Press',
    muscleGroup: 'legs',
    equipment: 'Machine',
    difficulty: 'beginner',
    instructions: 'Press weight with legs, lower until knees are at 90 degrees, press up.',
    gifUrl: ''
  },
  {
    name: 'Romanian Deadlifts',
    muscleGroup: 'legs',
    equipment: 'Barbell',
    difficulty: 'intermediate',
    instructions: 'Hinge at hips, lower barbell while keeping legs mostly straight, feel hamstring stretch.',
    gifUrl: ''
  },
  
  // Core Exercises
  {
    name: 'Plank',
    muscleGroup: 'core',
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: 'Hold body in straight line, support on forearms and toes, engage core.',
    gifUrl: ''
  },
  {
    name: 'Crunches',
    muscleGroup: 'core',
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: 'Lift shoulders off ground, contract abs, lower with control.',
    gifUrl: ''
  },
  {
    name: 'Russian Twists',
    muscleGroup: 'core',
    equipment: 'Bodyweight',
    difficulty: 'intermediate',
    instructions: 'Sit with knees bent, lean back slightly, rotate torso side to side.',
    gifUrl: ''
  },
  {
    name: 'Leg Raises',
    muscleGroup: 'core',
    equipment: 'Bodyweight',
    difficulty: 'intermediate',
    instructions: 'Lie flat, raise legs to 90 degrees, lower with control without touching floor.',
    gifUrl: ''
  },
  {
    name: 'Mountain Climbers',
    muscleGroup: 'core',
    equipment: 'Bodyweight',
    difficulty: 'intermediate',
    instructions: 'In plank position, alternate bringing knees to chest in running motion.',
    gifUrl: ''
  }
];

async function addExercises() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/workout');
    console.log('Connected to MongoDB');

    let added = 0;
    let skipped = 0;

    for (const exercise of exercises) {
      // Check if exercise already exists
      const existing = await Exercise.findOne({ name: exercise.name });
      if (existing) {
        console.log(`Exercise "${exercise.name}" already exists, skipping...`);
        skipped++;
        continue;
      }

      const newExercise = new Exercise(exercise);
      await newExercise.save();
      console.log(`✓ Added: ${exercise.name} (${exercise.muscleGroup})`);
      added++;
    }

    console.log(`\n✅ Successfully added ${added} exercises!`);
    if (skipped > 0) {
      console.log(`⏭️  Skipped ${skipped} exercises (already exist)`);
    }
    process.exit(0);
  } catch (error) {
    console.error('Error adding exercises:', error);
    process.exit(1);
  }
}

addExercises();


