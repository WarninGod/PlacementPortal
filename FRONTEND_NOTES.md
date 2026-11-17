# Frontend Notes

## Overview

The Placement Portal frontend is a React single-page application built with Vite. It provides separate interfaces for students and administrators.

The browser entry point is `index.html`, which mounts React into `<div id="root">` through `src/main.jsx`.

## Technologies

- React 19
- Vite
- React Router
- CSS with responsive glassmorphism styling
- Lucide React icons
- PDF.js for PDF text extraction

## Main Routes

| Route | Purpose | Access |
|---|---|---|
| `/` | Landing page | Public |
| `/auth` | Login and registration | Public |
| `/student` | Student dashboard | Student |
| `/admin` | Admin dashboard | Admin |

Routes are configured in `src/App.jsx`. The `PrivateRoute` component checks authentication and role permissions before rendering protected pages.

## Student Features

- View placement drives
- Search and review job opportunities
- Upload a resume
- Apply for placement drives
- Track application status
- View resume feedback
- Use AI resume analysis
- Chat with the BUB advisor

## Admin Features

- Create placement drives
- View submitted applications
- Review student information
- Shortlist or reject applications
- Review uploaded resumes

## Authentication State

`src/context/AuthContext.jsx` provides login, registration, logout, and user-state functions to the application. The current session is persisted in browser storage without storing the resume in the session copy.

## User Interface

The interface uses:

- Responsive layouts
- Gradient backgrounds
- Glass-style cards
- Status badges
- Loading states
- Success and error messages
- Icon-based actions

## Current Frontend Limitation

The application is a client-side SPA. A production version should move sensitive operations, authentication, and API calls to a secure backend.
