# Quick Setup Guide

## Step 1: Create Backend .env File

Create a file named `.env` in the `backend` folder with your MongoDB connection string:

**For Local MongoDB:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/workout-tracker
```

**For MongoDB Atlas (Cloud):**
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string_here
```

## Step 2: Install Frontend Dependencies

```bash
cd frontend
npm install
```

## Step 3: Start the Backend Server

Open a terminal and run:
```bash
cd backend
npm run dev
```

You should see:
- "Connected to MongoDB"
- "Server is running on port 5000"

## Step 4: Start the Frontend Server

Open a NEW terminal and run:
```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

## Step 5: Open Your Browser

Navigate to: **http://localhost:3000**

You should see the Workout Tracker app! 🎉

---

## Troubleshooting

- **MongoDB Connection Error**: Make sure MongoDB is running and your connection string is correct
- **Port Already in Use**: Change the PORT in `.env` file
- **Module Not Found**: Run `npm install` in both backend and frontend folders


