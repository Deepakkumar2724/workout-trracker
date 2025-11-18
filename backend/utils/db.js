const mongoose = require('mongoose');

async function connectDB() {
  // Read from env: set MONGODB_URI=mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/mydb?retryWrites=true&w=majority
  let uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not set');
    process.exit(1);
  }

  // If your password has special chars, build like:
  // const user = 'myUser';
  // const pass = encodeURIComponent('p@ss/w:ord');
  // uri = `mongodb+srv://${user}:${pass}@cluster0.xxxxx.mongodb.net/mydb?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // fail fast
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

module.exports = { connectDB };
