# Fix MongoDB Connection Error

## The Problem
Your `.env` file has a placeholder connection string: `cluster0.xxxxx.mongodb.net`
You need to replace it with your **actual** MongoDB Atlas connection string.

## How to Get Your Real MongoDB Atlas Connection String

### Step 1: Log in to MongoDB Atlas
Go to: https://www.mongodb.com/cloud/atlas

### Step 2: Get Your Connection String
1. Click on your **cluster** (or create one if you don't have one)
2. Click the **"Connect"** button
3. Choose **"Connect your application"**
4. Select **"Node.js"** as the driver
5. Copy the connection string - it will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 3: Update Your .env File
Replace the placeholders in the connection string:

**Before (WRONG):**
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/workout-tracker?retryWrites=true&w=majority
```

**After (CORRECT):**
```
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.abc123.mongodb.net/workout-tracker?retryWrites=true&w=majority
```

**Important:**
- Replace `<username>` with your MongoDB Atlas database username
- Replace `<password>` with your MongoDB Atlas database password
- Replace `cluster0.xxxxx.mongodb.net` with your actual cluster URL (like `cluster0.abc123.mongodb.net`)
- Add `/workout-tracker` before the `?` to specify the database name

### Step 4: Make Sure Your IP is Whitelisted
1. In MongoDB Atlas, go to **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development) or add your specific IP
4. Click **"Confirm"**

### Step 5: Verify Database User Exists
1. In MongoDB Atlas, go to **Database Access**
2. Make sure you have a database user created
3. Note the username and password (you'll use these in the connection string)

## Example of Correct .env File

```env
PORT=5000
MONGODB_URI=mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/workout-tracker?retryWrites=true&w=majority
```

**Note:** 
- `myuser` = your database username
- `mypassword123` = your database password  
- `cluster0.abc123.mongodb.net` = your actual cluster URL

## After Updating .env

1. Save the `.env` file
2. The backend server should automatically restart (nodemon will detect the change)
3. You should see: ✅ "Connected to MongoDB"

## Still Having Issues?

**Error: Authentication failed**
- Double-check your username and password
- Make sure there are no extra spaces in the connection string

**Error: IP not whitelisted**
- Go to Network Access in MongoDB Atlas and add your IP

**Error: Cannot find cluster**
- Make sure your cluster is running (not paused)
- Verify the cluster URL is correct


