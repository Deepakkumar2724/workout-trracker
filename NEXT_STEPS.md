# Next Steps to Run Your Workout Tracker

## ✅ Step 1: Install Frontend Dependencies

Open a terminal and run:
```bash
cd frontend
npm install
```

This will install React, Vite, and other frontend packages.

---

## ✅ Step 2: Start the Backend Server

Open a terminal and run:
```bash
cd backend
npm run dev
```

**What to look for:**
- ✅ "Connected to MongoDB" 
- ✅ "Server is running on port 5000"

**If you see errors:**
- Check your `.env` file has the correct MongoDB connection string
- Make sure MongoDB is running (local) or accessible (Atlas)

---

## ✅ Step 3: Start the Frontend Server

Open a **NEW terminal window** (keep backend running) and run:
```bash
cd frontend
npm run dev
```

**What to look for:**
- ✅ "Local: http://localhost:3000"
- The frontend will automatically open in your browser

---

## ✅ Step 4: Test the Application

1. Open your browser to: **http://localhost:3000**
2. You should see the Workout Tracker interface
3. Try creating a workout:
   - Enter a workout title (e.g., "Upper Body")
   - Add exercises with sets, reps, weight
   - Click "Create Workout"

---

## 🎉 You're Done!

Your MERN stack workout tracker is now running!

**Keep both terminals open:**
- Terminal 1: Backend server (port 5000)
- Terminal 2: Frontend server (port 3000)

---

## Troubleshooting

**Backend won't start:**
- Check MongoDB connection in `.env` file
- Make sure MongoDB is running/accessible

**Frontend won't start:**
- Make sure you ran `npm install` in the frontend folder
- Check if port 3000 is already in use

**Can't connect to backend:**
- Make sure backend is running on port 5000
- Check browser console for errors


