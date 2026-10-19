# Mini Issue Tracker

A full-stack issue tracking application built with React, Express.js, and PostgreSQL.

## Features

- Create and view issues
- Categorize issues as bugs or feature requests
- Assign priorities: Low, Medium, High
- Track issue status: Open, In Progress, Resolved
- Delete issues
- Responsive dark-themed UI

## Tech Stack

- **Frontend:** React, Vite, Axios, CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL

## Project Structure

- `frontend/` — React application
- `backend/` — Express API and database integration

## Run Locally

### Backend

```bash
cd backend
npm install
```

Configure your PostgreSQL database and environment variables according to the backend configuration, then run the backend using the start script in `backend/package.json`.

### Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Make sure both the frontend and backend are running.

## Purpose

Built as a hands-on project to practice full-stack development, REST APIs, React state management, and database operations.
