// Canonical list of sections shown on the Home page.
const HOME_SECTIONS = [
  { id: 'exercises', title: 'Exercises', description: 'Exercises library and previews', component: 'ExercisesList' },
  { id: 'myClasses', title: 'My Classes', description: 'Saved classes and schedules', component: 'MyClasses' },
  { id: 'records', title: 'Records', description: 'Workout history and personal records', component: 'Records' },
  { id: 'profile', title: 'Profile', description: 'User profile and settings', component: 'Profile' },
  { id: 'schedule', title: 'Schedule', description: 'Calendar and upcoming classes', component: 'Schedule' },
  { id: 'community', title: 'Community', description: 'Group workouts and challenges', component: 'Community' }
];

export default HOME_SECTIONS;

// helper: return only titles (optional usage)
// export const HOME_SECTION_TITLES = HOME_SECTIONS.map(s => s.title);

// Added: quick MongoDB troubleshooting tips and a basic URI checker
export const MONGO_TROUBLESHOOT = [
  'Check backend logs for the exact Mongoose/Mongo error message.',
  'Verify MONGODB_URI in your backend .env (no surrounding quotes).',
  'Encode special characters in the DB password: encodeURIComponent(password).',
  'If using Atlas: confirm Network Access (IP whitelist) includes your current IP or 0.0.0.0/0 for testing.',
  'If using Atlas SRV (mongodb+srv://): ensure DNS resolution works from your environment (try pinging the host).',
  'Test connecting from your machine with mongosh using the same connection string to isolate network vs app issue.',
  'Use Mongoose connection options: { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 }.',
  'If behind a corporate firewall/VPN, try from a different network or allow outbound access to Atlas hosts/ports.'
];

/*
 Sample Mongoose connection snippet — paste into your backend (e.g., backend/utils/db.js or server.js)
 Replace process.env.MONGODB_URI with your .env variable; ensure no extra quotes and password is encoded.

 Copy this into your backend and run to get clearer errors / faster fail:
*/
export const SAMPLE_MONGOOSE_CONNECT = `
// Example: backend/utils/db.js
const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI; // e.g. mongodb+srv://user:pass@cluster0.kgspunr.mongodb.net/mydb?retryWrites=true&w=majority
  if (!uri) {
    console.error('MONGODB_URI not set in env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // fail fast
      // tls: true, // optional if required; Atlas SRV typically negotiates TLS automatically
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Helpful hint: check err.message for IP whitelist or authentication issues
    process.exit(1);
  }
}

module.exports = { connectDB };
`;

/*
 Quick commands and checks:
 - Get your public IP: curl ifconfig.me
 - Add it to Atlas Network Access > Add IP Address
 - Test with mongosh:
   mongosh "mongodb+srv://cluster0.kgspunr.mongodb.net/mydb" -u <user> -p "<password>"
 - If password has special chars, build URI with encoded password:
   const uri = \`mongodb+srv://user:\${encodeURIComponent('p@ss/w:ord')}@cluster0.../mydb\`
*/
