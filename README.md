# Workout Tracker

A MERN-stack fitness planner that lets you build workout classes, log training sessions, and visualize progress over time.

## Features

- **Authentication** – Register, log in, manage profile info, and delete your account.
- **Exercise Library** – Browse, filter, and preview exercises (with GIF/image fallbacks).
- **Class Builder** – Combine exercises into custom classes with sets/reps/weight targets.
- **Class Records** – Log each training session, mark completed sets, and track total weight lifted per exercise.
- **Personal Records** – Automatically capture max weight per exercise and edit PRs inline.
- **Progress Dashboard** – Visualize total/maximum weight by class or by exercise, plus progress over time.
- **Trainer Spotlight** – Highlight fitness influencers with Instagram links.

## Tech Stack

- **Frontend:** React, Vite, Axios, Recharts, CSS modules
- **Backend:** Node.js, Express, MongoDB/Mongoose, JWT auth

## Getting Started

### Prerequisites

- Node.js (18+ recommended)
- MongoDB (local or remote)

### Environment Variables

Create `backend/.env`:

```dotenv
MONGODB_URI=mongodb://localhost:27017/workout-tracker
JWT_SECRET=replace-with-a-strong-secret
```

> The backend falls back to sensible defaults if these variables are missing, but defining them explicitly is recommended.

### Installation

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the App

In separate terminals:

```bash
# Backend (port 5000)
cd backend
npm run dev

# Frontend (port 5173)
cd frontend
npm run dev
```

Visit `http://localhost:5173`.

### Seeding Sample Data

```bash
cd backend

# Add featured influencers
npm run add-influencers

# Add a library of exercises
npm run add-exercises
```

These scripts are idempotent—they skip records that already exist.

## Folder Structure

```
backend/
  models/          # Mongoose schemas (User, Exercise, Class, ClassRecord, PersonalRecord, Trainer)
  routes/          # Express routers (auth, users, classes, exercises, trainers, class-records, personal-records)
  scripts/         # Data seeding utilities
  server.js        # App entry point

frontend/
  src/components/  # UI building blocks (ExercisesList, MyClasses, ClassRecords, WeightVisualization, etc.)
  src/pages/       # Main page layout (Home)
  src/context/     # Auth provider (login/logout/register, profile management)
  src/index.css    # Global styles (background image, base theme)
```

## Notable Workflows

- **Register → Login:** Registration creates the account but does *not* auto-login; users must authenticate through the login form.
- **Class Creation:** Requires at least one exercise. Selecting an exercise toggles it into the “Create Class” panel where you can edit sets/reps/weight.
- **Weight Visualization:** Data is derived from logged class records and supports both exercise-level and class-level views.

## API Endpoints (Summary)

| Method | Endpoint                                  | Description                                |
| ------ | ----------------------------------------- | ------------------------------------------ |
| POST   | `/api/auth/register`                      | Create a new user                          |
| POST   | `/api/auth/login`                         | Authenticate user and return JWT           |
| GET    | `/api/users/me`                           | Fetch current user profile                 |
| PATCH  | `/api/users/:id`                          | Update profile details                     |
| DELETE | `/api/users/:id`                          | Delete own account                         |
| GET    | `/api/exercises`                          | List exercises (supports filtering)        |
| POST   | `/api/classes`                            | Create workout class                       |
| POST   | `/api/class-records`                      | Log a completed class session              |
| GET    | `/api/class-records/stats/weight-by-*`    | Retrieve visualization data (exercise/class) |
| POST   | `/api/personal-records`                   | Create/update personal record (PR)         |
| GET    | `/api/trainers`                           | List fitness influencers/trainers          |

> All protected routes require `Authorization: Bearer <token>` header (set automatically in the frontend once logged in).

## Customization Tips

- Update the background image in `frontend/src/index.css` and `frontend/src/components/Auth.css`.
- Adjust difficulty/muscle groups in `ExercisesList.jsx`.
- Extend trainer profiles via `backend/scripts/addInfluencers.js` or create an admin UI.

## Troubleshooting

- **Exercises don’t show up:** Run `npm run add-exercises` in `backend`.
- **Trainers missing:** Run `npm run add-influencers`.
- **Account deletion fails:** Ensure the backend is running and that your token is valid (refresh by logging in again).
- **CORS issues:** Confirm backend is running on `http://localhost:5000` (or update the frontend Axios base URLs).

## License

MIT – feel free to adapt and expand the project for personal or commercial use.

---

Happy lifting!
# 💪 Workout Tracker - MERN Stack Application

A full-stack workout tracking application built with MongoDB, Express, React, and Node.js.

## Features

- ✅ Create, read, update, and delete workouts
- ✅ Track multiple exercises per workout
- ✅ Record sets, reps, weight, and duration for each exercise
- ✅ Add notes to workouts and exercises
- ✅ Beautiful and modern UI
- ✅ Responsive design

## Project Structure

```
workout-tracker/
├── backend/
│   ├── models/
│   │   └── Workout.js
│   ├── routes/
│   │   └── workouts.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WorkoutForm.jsx
│   │   │   ├── WorkoutForm.css
│   │   │   ├── WorkoutList.jsx
│   │   │   └── WorkoutList.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/workout-tracker
```

Or use MongoDB Atlas:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

### Start MongoDB

Make sure MongoDB is running on your system. If using MongoDB locally:

```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will run on `http://localhost:5000`

### Start Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:id` - Get a single workout
- `POST /api/workouts` - Create a new workout
- `PATCH /api/workouts/:id` - Update a workout
- `DELETE /api/workouts/:id` - Delete a workout

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client

## License

ISC


