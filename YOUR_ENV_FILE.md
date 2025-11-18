# Your .env File Configuration

## Your Credentials:
- **Username:** DeepakKumar
- **Password:** deepak

## How to Find Your Cluster URL:

1. **Log in to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
2. **Click on your cluster** (you should see it on the dashboard)
3. **Click the "Connect" button**
4. **Choose "Connect your application"**
5. **Copy the connection string** - it will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Look for the part after `@`** - that's your cluster URL
   - Example: `cluster0.abc123.mongodb.net`
   - Example: `cluster0.xyz789.mongodb.net`
   - It will be different from `cluster0.xxxxx.mongodb.net`

## Your .env File Should Look Like This:

Once you have your cluster URL, update your `backend/.env` file:

```env
PORT=5000
MONGODB_URI=mongodb+srv://DeepakKumar:deepak@YOUR_CLUSTER_URL_HERE/workout-tracker?retryWrites=true&w=majority
```

**Replace `YOUR_CLUSTER_URL_HERE` with your actual cluster URL from step 6 above.**

## Example (with fake cluster URL):

```env
PORT=5000
MONGODB_URI=mongodb+srv://DeepakKumar:deepak@cluster0.abc123.mongodb.net/workout-tracker?retryWrites=true&w=majority
```

## Important Notes:

1. **No spaces** in the connection string
2. **Add `/workout-tracker`** before the `?` to specify the database name
3. **Make sure your IP is whitelisted** in MongoDB Atlas → Network Access
4. **Make sure your database user exists** in MongoDB Atlas → Database Access

## After Updating:

1. Save the `.env` file
2. Your backend server should automatically restart
3. You should see: ✅ "Connected to MongoDB"


