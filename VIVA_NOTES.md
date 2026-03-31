# Placement Portal Viva Notes

## 1) Project Title
Placement Portal (Frontend Simulation)

## 2) One-Line Definition
A role-based college placement portal where students apply to drives and admin manages drives and applications, implemented with React and localStorage as a mock backend.

## 3) Problem Statement
Many colleges need a simple system where:
- Students can view placement drives and apply quickly
- Admin (TPO) can publish drives and manage candidate status
- Both roles can work through a simple web interface

## 4) Main Objectives
- Build role-based authentication and authorization
- Provide student features: resume upload, job listing, apply flow, application tracking
- Provide admin features: create drives, view all applications, shortlist/reject
- Simulate backend behavior without server setup

## 5) Tech Stack
- React 19: component-based frontend UI
- Vite 7: dev server and build tool
- React Router DOM 7: client-side routing and navigation
- Lucide React: icon library
- localStorage: persistent browser storage used as mock database
- ESLint: static code quality checks

## 6) High-Level Architecture
- UI Layer: page components for Landing, Auth, Student Dashboard, Admin Dashboard
- State Layer: Auth context for session and user state
- Data Layer: storage.js provides async API-like functions for CRUD on localStorage
- Routing Layer: App routes with role-protected paths

## 7) Project Structure
- index.html: root HTML and app mount point
- src/main.jsx: React root render + BrowserRouter + AuthProvider
- src/App.jsx: route definitions and route guards
- src/context/AuthContext.jsx: auth state and auth actions
- src/lib/storage.js: localStorage utility and API-like methods
- src/pages/Landing.jsx: public home page
- src/pages/Auth.jsx: login and registration page
- src/pages/StudentDashboard.jsx: student features
- src/pages/AdminDashboard.jsx: admin features
- src/index.css: global design system and utilities

## 8) Application Boot Flow
1. Browser loads index.html
2. src/main.jsx mounts React app to root div
3. AuthProvider initializes user session from localStorage
4. App initializes seed data if storage is empty
5. React Router renders correct page based on URL

## 9) Routing and Protection
Public routes:
- /
- /auth

Protected routes:
- /student/*: allowed only for role student
- /admin/*: allowed only for role admin

Guard logic:
- If no user session -> redirect to /auth
- If role mismatch -> redirect to /

## 10) Authentication Design
AuthContext handles:
- user state
- loading state
- login(email, password)
- registerStudent(name, email, password)
- logout()
- updateUserInContext(updates)

Session persistence:
- Logged-in user is saved in localStorage under placement_session
- On reload, provider restores user state from placement_session

## 11) Mock Backend Design (storage.js)
Key collections in localStorage:
- placement_users
- placement_jobs
- placement_applications

Seeded data on first run:
- Admin: admin@college.edu / password123
- Student: student1@college.edu / password123
- Two sample drives

Implemented API-like methods:
- initializeStorageData
- apiLogin
- apiRegisterStudent
- apiUpdateUserResume
- apiGetJobs
- apiCreateJob
- apiApplyForJob
- apiGetApplicationsForStudent
- apiGetAllApplications
- apiUpdateApplicationStatus

Special behavior:
- Artificial 500ms delay in each API call to simulate network latency
- Duplicate apply prevention: one student cannot apply twice to same job

## 12) Student Module Flow
1. Student logs in or registers
2. Dashboard loads jobs and student applications
3. Student uploads resume (base64-encoded via FileReader)
4. Student clicks Apply on desired drive
5. Application saved with status pending
6. Student can see application statuses: pending, shortlisted, rejected

## 13) Admin Module Flow
1. Admin logs in
2. Admin views drives and applications
3. Admin creates new drive using form
4. Admin reviews applications in table format
5. Admin shortlists or rejects pending applications
6. Admin can download resume file from stored base64 string

## 14) Data Flow Summary
- Pages call functions from storage.js
- storage.js reads/writes localStorage
- Responses update component state and UI
- AuthContext synchronizes session and user state globally

## 15) Important React Concepts Used
- Functional components
- useState for local component state
- useEffect for side effects and initial data fetch
- Context API + useContext for global auth state
- useNavigate for programmatic routing
- Conditional rendering for role and state-based UI
- List rendering with map and stable keys

## 16) UI and Styling Highlights
- Glassmorphism-style cards using blur and translucent backgrounds
- CSS variables for centralized colors, radius, transitions
- Reusable utility classes: btn, glass-panel, badges, input-field
- Responsive grid layouts for dashboard structure

## 17) Current Strengths
- Clear separation of concerns between UI, state, and data logic
- Realistic role-based flow for a college demo
- Persistent browser state without backend setup
- Easy to run and demonstrate quickly in viva

## 18) Current Limitations (Important for Viva)
- Not production-secure: passwords stored in plain text in browser storage
- Client-side authorization only (can be tampered by advanced users)
- No real backend, no JWT, no hashing, no access control middleware
- No automated tests currently
- localStorage has size limits and browser-specific persistence

## 19) How to Explain Why localStorage Was Used
Use this answer:
"For this academic prototype, localStorage was used as a lightweight mock database to demonstrate complete product flow without backend deployment complexity. The architecture is intentionally designed so storage.js can be replaced by real API calls in future."

## 20) Production Upgrade Plan
- Add Node.js + Express backend
- Add MongoDB or PostgreSQL
- Add bcrypt password hashing
- Add JWT authentication and refresh token strategy
- Add role-based middleware on backend routes
- Add file upload API (Multer + cloud storage like S3)
- Add validation (Zod/Joi) and better error handling
- Add unit, integration, and e2e tests

## 21) Viva Questions and Short Answers
Q1. Why React?
A: Fast UI development through reusable components and efficient rendering.

Q2. Why Context API?
A: To avoid prop drilling and provide global auth/session access.

Q3. How are routes protected?
A: Private route component checks user existence and required role before rendering.

Q4. How is data persisted after refresh?
A: Session and app data are stored in localStorage and restored on load.

Q5. How do you prevent duplicate applications?
A: Before creating application, API checks existing records with same studentId and jobId.

Q6. What is the status lifecycle?
A: pending -> shortlisted or rejected.

Q7. How are resumes handled?
A: Uploaded file is converted to base64 string and stored in localStorage.

Q8. What are security concerns in current version?
A: Plain-text credentials, client-side auth checks, no server-side validation.

Q9. What did you learn technically?
A: Role-based UX, client-side routing, context state management, async flow, and simulated API design.

Q10. How will you scale this project?
A: Replace storage layer with real backend APIs and add secure auth, database indexing, and testing.

## 22) Demo Credentials
- Admin: admin@college.edu / password123
- Student: student1@college.edu / password123

## 23) 60-Second Viva Pitch
"This project is a role-based placement portal built with React and Vite. It has two modules: student and admin. Student can upload resume, browse drives, apply, and track status. Admin can post drives and manage applications by shortlisting or rejecting candidates. I used React Router for protected navigation, Context API for global authentication state, and localStorage as a mock backend through a service layer in storage.js. The architecture is modular and ready for migration to a real backend with JWT and database support."
