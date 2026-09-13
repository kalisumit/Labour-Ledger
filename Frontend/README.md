# Labour Ledger

Labour Ledger is a workforce management application for contractors. It provides one place to manage employees, track attendance and overtime, and calculate payable salaries.

## Features

- Contractor signup and login
- JWT-protected employee management
- Add, edit, and delete employees
- Employee team directory
- Confirmation before employee deletion
- Daily attendance tracking
- Overtime tracking
- Automatic salary calculations
- Manual salary calculation mode
- Responsive desktop and mobile layouts
- Mobile bottom navigation with active-tab animation

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Tailwind CSS
- Axios
- React Icons

### Backend

- Node.js
- Express
- MongoDB and Mongoose
- JSON Web Tokens
- bcrypt
- CORS

## Project Structure

```text
Labour Ledger/
├── Frontend/                 # React and Vite frontend
│   ├── src/
│   │   ├── component/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
└── Server/                 # Express and MongoDB API
	├── src/
	│   ├── controllers/
	│   ├── models/
	│   └── router/
	└── package.json
```

## Requirements

- Node.js 18 or newer
- npm
- MongoDB database, such as MongoDB Atlas

## Local Setup

Clone the repository and install dependencies in both applications:

```bash
cd Labour
npm install

cd ../Server
npm install
```

### Backend environment

Create `Server/.env`:

```env
URI=your-mongodb-connection-string
PORT=3000
JWT_SECRET=your-long-random-secret
FRONTEND_URL=http://localhost:5173
```

Never commit this file or expose database credentials and JWT secrets.

### Frontend environment

Create `Labour/.env.local`:

```env
VITE_API_URL=http://localhost:3000
```

The value must be the URL of the running backend, without a trailing slash.

## Running the Application

Start the API in one terminal:

```bash
cd Server
npm start
```

Start the frontend in another terminal:

```bash
cd Labour
npm run dev
```

Open the frontend at `http://localhost:5173`.

## Available Frontend Commands

Run these commands from `Labour/`:

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

## API Areas

The backend exposes:

- `/auth` for signup and login
- `/employee` for authenticated employee operations
- `/employee/attendance` for authenticated attendance operations

Employee and attendance requests require a bearer token returned during login.

## Deployment

The frontend and backend can be deployed separately:

### Render

Deploy `Server/` as a Render Web Service:

```text
Root directory: Server
Build command: npm install
Start command: npm start
```

Add `URI`, `JWT_SECRET`, and `FRONTEND_URL` as Render environment variables. Render supplies the production `PORT` automatically.

### Vercel

Deploy `Labour/` as a Vite project:

```text
Root directory: Labour
Build command: npm run build
Output directory: dist
```

Add this Vercel environment variable:

```env
VITE_API_URL=https://your-render-api.onrender.com
```

After deployment, set the Vercel URL as `FRONTEND_URL` on Render and redeploy the API.

## Security Notes

- Keep `.env` and `.env.local` out of Git.
- Rotate any credential that has been accidentally shared.
- Use a strong, unique `JWT_SECRET` in production.
- Restrict MongoDB Atlas network access where practical.
