# MongoDB Connection Configuration Guide

## Step 1: Create the .env File

Create a file named `.env` in the `backend` folder (same folder as `server.js`).

## Step 2: Choose Your MongoDB Setup

### Option A: Local MongoDB (Running on Your Computer)

If you have MongoDB installed locally and running, use this:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/workout-tracker
```

**To check if MongoDB is running locally:**
- Windows: Check if MongoDB service is running in Services
- Or try: `mongod` in terminal (if installed)

### Option B: MongoDB Atlas (Cloud - Recommended)

If you're using MongoDB Atlas (cloud database), you need your connection string.

#### How to Get MongoDB Atlas Connection String:

1. **Log in to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
2. **Go to your cluster** → Click **"Connect"**
3. **Choose "Connect your application"**
4. **Copy the connection string** - it looks like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace the placeholders:**
   - Replace `<password>` with your actual database password
   - Replace `<dbname>` with `workout-tracker` (or add it at the end)

#### Example .env file for MongoDB Atlas:

```env
PORT=5000
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/workout-tracker?retryWrites=true&w=majority
```

**Important Notes:**
- Make sure your IP address is whitelisted in MongoDB Atlas (Network Access)
- Make sure you have a database user created in MongoDB Atlas

## Step 3: Verify Your .env File

Your `backend/.env` file should look like this:

```
PORT=5000
MONGODB_URI=your_connection_string_here
```

**File location:** `backend/.env` (same folder as `server.js`)

## Step 4: Test the Connection

After creating the `.env` file, start your backend server:

```bash
cd backend
npm run dev
```

You should see:
- ✅ "Connected to MongoDB"
- ✅ "Server is running on port 5000"

If you see an error, check:
- MongoDB is running (for local) or accessible (for Atlas)
- Connection string is correct
- No typos in the `.env` file
- IP address is whitelisted (for Atlas)

## Troubleshooting

### Error: "MongoServerError: Authentication failed"
- Check your username and password in the connection string
- Make sure you're using the correct database user

### Error: "MongoNetworkError: connect ECONNREFUSED"
- For local: Make sure MongoDB is running (`mongod` or check services)
- For Atlas: Check your IP is whitelisted in Network Access

### Error: "Cannot find module 'dotenv'"
- Run: `cd backend && npm install`


