# What is JWT_SECRET?

## Explanation

**JWT_SECRET** is a secret key used to:
1. **Sign** JWT tokens when users login/register
2. **Verify** JWT tokens when users make authenticated requests

Think of it like a password that only your server knows. It's used to create secure tokens that prove a user is logged in.

## Why You Need It

When a user logs in:
- Your server creates a JWT token using the JWT_SECRET
- The token is sent to the frontend
- The frontend sends the token with every request
- Your server verifies the token using the same JWT_SECRET

**Important**: Never share this secret publicly! It should only be in your `.env` file.

## How to Add It to Your .env File

### Step 1: Open your `.env` file
Location: `backend/.env`

### Step 2: Add JWT_SECRET
Your `.env` file should look like this:

```env
PORT=5000
MONGODB_URI=mongodb+srv://DeepakKumar:deepak@your-cluster-url.mongodb.net/workout-tracker?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-12345-change-this-to-something-random
```

### Step 3: Generate a Strong Secret (Recommended)

You can use any random string. Here are some options:

**Option 1: Use a random string generator**
- Go to: https://randomkeygen.com/
- Copy a "CodeIgniter Encryption Keys" or any long random string
- Use it as your JWT_SECRET

**Option 2: Use a simple but long string**
```
JWT_SECRET=workout-tracker-secret-key-2024-deepak-kumar-super-secure
```

**Option 3: Generate using Node.js (if you want)**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Example .env File

```env
PORT=5000
MONGODB_URI=mongodb+srv://DeepakKumar:deepak@cluster0.abc123.mongodb.net/workout-tracker?retryWrites=true&w=majority
JWT_SECRET=my-super-secret-jwt-key-123456789-abcdefghijklmnopqrstuvwxyz
```

## Important Notes

1. **Make it long and random** - At least 32 characters
2. **Never commit to Git** - The `.env` file should be in `.gitignore` (it already is)
3. **Don't share it** - Keep it secret
4. **Use different secrets** - For production, use a different secret than development

## What Happens Without JWT_SECRET?

If you don't add JWT_SECRET, the app will use a default value (`'your-secret-key'`), but this is **NOT SECURE** for production. Always set your own secret!

## Quick Setup

Just add this line to your `backend/.env` file:

```env
JWT_SECRET=workout-tracker-2024-secret-key-change-this
```

Replace `workout-tracker-2024-secret-key-change-this` with your own random string.

