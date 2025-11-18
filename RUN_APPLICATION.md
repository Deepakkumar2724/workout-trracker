# How to Run the Workout Tracker Application

## Prerequisites Checklist

Before running, make sure you have:
- ✅ Node.js installed (v14 or higher)
- ✅ MongoDB running (local or Atlas)
- ✅ Backend dependencies installed
- ✅ Frontend dependencies installed
- ✅ `.env` file configured in backend folder

---

## Step-by-Step Instructions

### Step 1: Install Dependencies (If Not Done)

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

---

### Step 2: Configure Environment Variables

Make sure your `backend/.env` file exists and has:

```env
PORT=5000
MONGODB_URI=mongodb+srv://DeepakKumar:deepak@your-cluster-url.mongodb.net/workout-tracker?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here
```

---

### Step 3: Start the Backend Server

1. **Open Terminal/Command Prompt**
2. **Navigate to backend folder:**
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

### Step 4: Start the Frontend Server

1. **Open a NEW Terminal/Command Prompt** (keep backend terminal running)
2. **Navigate to frontend folder:**
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

### Step 5: Open the Application

1. **Open your web browser**
2. **Go to:** http://localhost:3000
3. **You should see the Login page!** 🎉

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

## First Time Setup

### 1. Register a New Account
- Click "Register here" on the login page
- Fill in your details
- Click "Register"

### 2. You'll be automatically logged in and redirected to the Home page

### 3. Explore the Features
- **Right Sidebar**: See trainers/influencers
- **Exercises Tab**: Browse exercises (you can add exercises via API)
- **My Classes**: Create workout classes
- **Records**: Log your workouts
- **Progress**: See visualizations
- **Profile**: Manage your account

---

## Troubleshooting

### Backend won't start?

**Error: "MongoDB connection error"**
- Check your `.env` file has correct MongoDB connection string
- Make sure MongoDB is running/accessible
- Verify your IP is whitelisted in MongoDB Atlas

**Error: "Cannot find module"**
- Run `npm install` in the backend folder
- Make sure you're in the correct directory

**Error: "Port 5000 already in use"**
- Change PORT in `.env` file to another number (e.g., 5001)
- Or close the application using port 5000

---

### Frontend won't start?

**Error: "Cannot find module"**
- Run `npm install` in the frontend folder
- Make sure you're in the correct directory

**Error: "Port 3000 already in use"**
- Vite will automatically use the next available port (3001, 3002, etc.)
- Or close the application using port 3000

---

### Can't connect to backend?

**Error in browser console: "Network Error"**
- Make sure backend is running on port 5000
- Check backend terminal for errors
- Verify CORS is enabled (it should be)

**Error: "401 Unauthorized"**
- Make sure you're logged in
- Try logging out and logging back in
- Check if JWT_SECRET is set in `.env`

---

### Application shows blank page?

- Open browser console (F12)
- Check for JavaScript errors
- Make sure both servers are running
- Try refreshing the page (Ctrl+R or Cmd+R)

---

## Stopping the Application

To stop the servers:
- Press `Ctrl + C` in each terminal window
- Or close the terminal windows

---

## Development Tips

1. **Keep both terminals open** - Backend and frontend must run simultaneously
2. **Check terminal output** - Errors will show in the terminals
3. **Use browser console** - Press F12 to see frontend errors
4. **Hot reload** - Both servers auto-reload when you save files

---

## What to Expect

Once running:
- ✅ Login/Register pages work
- ✅ Home page loads after login
- ✅ All sections are accessible
- ✅ You can create classes and log workouts
- ✅ Visualizations work when you have data

---

## Need Help?

If you encounter errors:
1. Check the terminal output for error messages
2. Check browser console (F12) for frontend errors
3. Verify all dependencies are installed
4. Make sure MongoDB is connected
5. Verify `.env` file is correct

