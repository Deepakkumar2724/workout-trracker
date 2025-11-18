# How to Run Your Workout Tracker

## Prerequisites Checklist

Before running, make sure:
- ✅ MongoDB connection is configured in `backend/.env`
- ✅ Backend dependencies installed (`npm install` in backend folder)
- ✅ Frontend dependencies installed (`npm install` in frontend folder)

---

## Step-by-Step Instructions

### Step 1: Start the Backend Server

1. **Open a terminal/command prompt**
2. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```
3. **Start the server:**
   ```bash
   npm run dev
   ```

**What you should see:**
```
[nodemon] starting `node server.js`
Connected to MongoDB
Server is running on port 5000
```

**✅ Keep this terminal open!** The backend must keep running.

---

### Step 2: Start the Frontend Server

1. **Open a NEW terminal/command prompt** (keep the backend terminal running)
2. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```
3. **Start the frontend:**
   ```bash
   npm run dev
   ```

**What you should see:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

---

### Step 3: Open the Application

1. **Open your web browser**
2. **Go to:** http://localhost:3000
3. **You should see the Workout Tracker app!** 🎉

---

## Quick Command Summary

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

**Browser:**
```
http://localhost:3000
```

---

## Troubleshooting

### Backend won't start?
- Check your `.env` file has correct MongoDB connection
- Make sure MongoDB is accessible
- Check if port 5000 is already in use

### Frontend won't start?
- Make sure you ran `npm install` in frontend folder
- Check if port 3000 is already in use
- Make sure backend is running first

### Can't connect to backend?
- Make sure backend is running on port 5000
- Check browser console (F12) for errors
- Verify CORS is enabled (it should be)

### MongoDB connection error?
- Double-check your `.env` file
- Verify MongoDB Atlas IP whitelist
- Check username/password are correct

---

## What to Expect

Once running, you should be able to:
- ✅ Create new workouts
- ✅ Add exercises with sets, reps, weight
- ✅ View all your workouts
- ✅ Edit existing workouts
- ✅ Delete workouts

---

## Stopping the Servers

To stop the servers:
- Press `Ctrl + C` in each terminal window
- Or close the terminal windows


