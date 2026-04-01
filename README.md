# Placement Portal (College Project)

A role-based placement portal built with React and Vite.

The project includes:

- Student and admin login
- Student registration
- Placement drive listing and creation
- Resume upload (stored as base64 in browser storage)
- Job application flow and status updates

This is a demo project that uses localStorage as a mock database.

## Tech Stack

- React 19
- React Router
- Vite
- Lucide React icons
- CSS (custom styles)

## Demo Credentials

- Admin: a@a.com / a
- Student: s@s.com / s

## Project Structure

- src/context/AuthContext.jsx: Auth state and session handling
- src/lib/storage.js: Mock APIs and localStorage data layer
- src/pages/Landing.jsx: Landing page
- src/pages/Auth.jsx: Login and student registration
- src/pages/StudentDashboard.jsx: Student workflows
- src/pages/AdminDashboard.jsx: Admin workflows

## Run Locally

Requirements:

- Node.js 18+
- npm

Commands:

```bash
npm install
npm run dev
```

Open the shown local URL in the browser.

## Production Build Check

```bash
npm run build
npm run preview
```

## Deploy on Vercel (Recommended)

1. Push this project to GitHub.
2. Go to Vercel and import the repository.
3. Keep defaults:
	- Build command: npm run build
	- Output directory: dist
4. Deploy.

SPA routing support for direct URL refresh is already configured in vercel.json.

## Quick Submission Notes

- This project is frontend-only and intended for academic demonstration.
- Authentication and data storage are client-side (localStorage), not production secure.
- Use the deployed link and repository link in your report/presentation.
