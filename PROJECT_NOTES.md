# 📘 Placement Portal — Complete Project Notes

> A full-stack (frontend-only simulation) College Placement Portal built with **React 19**, **Vite**, and **localStorage** as a mock database.

---

## 📂 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack Explained](#2-tech-stack-explained)
3. [Folder Structure](#3-folder-structure)
4. [How the App Starts (Entry Point)](#4-how-the-app-starts-entry-point)
5. [Routing — How Pages Work](#5-routing--how-pages-work)
6. [Authentication System](#6-authentication-system)
7. [Mock Backend — localStorage as Database](#7-mock-backend--localstorage-as-database)
8. [Pages — Detailed Breakdown](#8-pages--detailed-breakdown)
9. [CSS & Styling — Glassmorphism Design](#9-css--styling--glassmorphism-design)
10. [Key React Concepts Used](#10-key-react-concepts-used)
11. [Data Flow Diagram](#11-data-flow-diagram)

---

## 1. Project Overview

### What is this project?

A **College Placement Portal** that connects students with placement drives posted by the Training & Placement Officer (TPO/Admin). It has two roles:

| Role      | What they can do                                           |
|-----------|------------------------------------------------------------|
| **Student** | Register, login, upload resume, view available drives, apply for jobs, track application status |
| **Admin (TPO)** | Login, post new placement drives, view all applications, shortlist or reject students, download resumes |

### Key Features
- 🔐 Login & Registration (student only registration, admin is pre-seeded)
- 📄 Resume Upload (stored as Base64 in localStorage)
- 💼 Job/Drive Posting by Admin
- 📝 Apply to Drives (with resume attachment)
- ✅ Application Status Management (pending → shortlisted / rejected)
- 🛡️ Role-based Route Protection (students can't access admin pages, and vice versa)

---

## 2. Tech Stack Explained

### React 19 (Frontend Library)
- **What**: A JavaScript library by Facebook/Meta for building user interfaces using **components**
- **Why**: Makes it easy to build interactive UIs by breaking the page into reusable pieces (components)
- **Key idea**: Instead of manipulating the DOM directly, you describe what you want, and React updates the page efficiently

### Vite (Build Tool & Dev Server)
- **What**: A modern build tool that replaces older tools like Webpack/Create React App
- **Why**: Extremely fast hot-reload during development — changes appear instantly in the browser
- **Config file**: `vite.config.js` — just enables the React plugin

### React Router DOM v7 (Routing)
- **What**: Enables navigation between different pages WITHOUT reloading the browser (Single Page Application / SPA)
- **Why**: Traditional websites reload the entire page when navigating. React Router swaps only the content, making it feel instant
- **Key components used**: `BrowserRouter`, `Routes`, `Route`, `Navigate`, `Link`, `useNavigate`

### Lucide React (Icons)
- **What**: A beautiful open-source icon library
- **Why**: Provides icons like `LogOut`, `Briefcase`, `Upload`, etc. used throughout the UI
- **Usage**: `import { Briefcase } from 'lucide-react'` then `<Briefcase size={20} />`

### PDF.js (pdfjs-dist)
- **What**: A Portable Document Format (PDF) parser built with HTML5.
- **Why**: Allows extracting and reading raw text from uploaded PDF resumes directly in the browser, eliminating the need for a backend server to handle file parsing.

### AI Integration (OpenRouter / OpenAI APIs)
- **What**: API integrations utilizing advanced LLM models.
- **Why**: Used to dynamically evaluate student resumes against available job listings, provide actionable "AI Resume Advisor" feedback, and generate intelligent interview questions.

### localStorage (Mock Database)
- **What**: Built-in browser storage that persists data even after closing the browser
- **Why**: Simulates a backend database without needing a server (Node.js, Express, MongoDB, etc.)
- **Limitation**: Data is stored only in YOUR browser. Not shared across devices/users. Max ~5MB storage

---

## 3. Folder Structure

```
placement-portal/
├── index.html              ← The single HTML file (entry point for browser)
├── package.json            ← Project metadata + dependencies list
├── vite.config.js          ← Vite configuration
├── eslint.config.js        ← Code quality/linting rules
├── public/                 ← Static files (served as-is)
├── src/                    ← All source code lives here
│   ├── main.jsx            ← ⭐ JavaScript entry point (mounts React)
│   ├── App.jsx             ← ⭐ Root component (routing setup)
│   ├── App.css             ← Styles for App (mostly unused/default)
│   ├── index.css           ← ⭐ Global styles (glassmorphism, variables, utilities)
│   ├── context/
│   │   └── AuthContext.jsx ← ⭐ Authentication state management (Context API)
│   ├── lib/
│   │   ├── aiResumeAdvisor.js ← ⭐ AI integration for resume matching and interview questions
│   │   ├── resumeParser.js ← ⭐ Client-side PDF text extraction
│   │   └── storage.js      ← ⭐ Mock API functions (CRUD using localStorage)
│   └── pages/
│       ├── Landing.jsx     ← Home/welcome page
│       ├── Auth.jsx        ← Login & Registration page
│       ├── StudentDashboard.jsx ← Student's main page
│       └── AdminDashboard.jsx   ← Admin/TPO's main page
```

---

## 4. How the App Starts (Entry Point)

### Step-by-step boot process:

```
Browser loads index.html
    → index.html has <div id="root"></div> + <script src="/src/main.jsx">
        → main.jsx runs:
            1. Finds the <div id="root"> in the HTML
            2. Wraps the app in providers:
               <StrictMode>           ← Helps catch bugs during development
                 <AuthProvider>        ← Makes auth state available everywhere
                   <BrowserRouter>     ← Enables client-side routing
                     <App />           ← The actual app component
                   </BrowserRouter>
                 </AuthProvider>
               </StrictMode>
            3. React renders <App /> inside the root div
```

### main.jsx Explained (line by line):

```jsx
import { StrictMode } from 'react'           // Development helper
import { createRoot } from 'react-dom/client' // React 18+ way to mount
import { BrowserRouter } from 'react-router-dom'  // Routing
import { AuthProvider } from './context/AuthContext' // Our auth wrapper
import './index.css'                          // Global styles
import App from './App.jsx'                   // Root component

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
```

**Why this nesting order matters:**
- `AuthProvider` wraps `BrowserRouter` → so auth is available everywhere, even in routing logic
- `BrowserRouter` wraps `App` → so `App` can use `<Routes>`, `<Link>`, `useNavigate()`, etc.

---

## 5. Routing — How Pages Work

### What is Routing in React?

In a traditional website, navigating to `/about` sends a request to the server, which returns a new HTML page. In React (SPA), the browser loads ONE HTML page, and JavaScript swaps the content based on the URL.

### Route Configuration (App.jsx):

```jsx
<Routes>
  <Route path="/"          element={<Landing />} />
  <Route path="/auth"      element={<Auth />} />
  <Route path="/student/*" element={<PrivateRoute roleRequired="student"><StudentDashboard /></PrivateRoute>} />
  <Route path="/admin/*"   element={<PrivateRoute roleRequired="admin"><AdminDashboard /></PrivateRoute>} />
  <Route path="*"          element={<Navigate to="/" />} />
</Routes>
```

| URL Path      | Component Rendered | Protected? |
|---------------|--------------------|------------|
| `/`           | `<Landing />`      | No         |
| `/auth`       | `<Auth />`         | No         |
| `/student/*`  | `<StudentDashboard />` | Yes — must be logged in as "student" |
| `/admin/*`    | `<AdminDashboard />`   | Yes — must be logged in as "admin"   |
| Any other URL | Redirects to `/`   | —          |

### The `/*` Wildcard
`/student/*` means this route matches `/student`, `/student/profile`, `/student/anything`, etc. Useful if the dashboard later has sub-pages.

### PrivateRoute — Route Guard / Protection

```jsx
const PrivateRoute = ({ children, roleRequired }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/auth" />;                          // Not logged in → go to login
  if (roleRequired && user.role !== roleRequired) return <Navigate to="/" />;  // Wrong role → go home

  return children;  // ✅ Allowed → render the page
};
```

**How it works:**
1. Gets the current user from AuthContext
2. If no user is logged in → redirects to `/auth`
3. If user is logged in but has wrong role → redirects to `/`
4. If everything is fine → renders the child component (`<StudentDashboard />` or `<AdminDashboard />`)

---

## 6. Authentication System

### The Context API Pattern

React's **Context API** is a way to share data across components without passing props through every level (called "prop drilling").

```
                    AuthProvider (holds user state)
                   /          |           \
             Landing        Auth       StudentDashboard
             (reads user)   (calls login)  (reads user, calls logout)
```

### AuthContext.jsx — Full Breakdown:

```jsx
const AuthContext = createContext();  // 1. Create a "container" for shared state
```

```jsx
export const useAuth = () => useContext(AuthContext);  // 2. Custom hook to access the container
```

```jsx
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);      // Current logged-in user (null = not logged in)
    const [loading, setLoading] = useState(true); // Loading while checking saved session

    useEffect(() => {
        // On first load, check if user was previously logged in
        const session = localStorage.getItem('placement_session');
        if (session) {
            setUser(JSON.parse(session));  // Restore session
        }
        setLoading(false);
    }, []);
```

### Functions provided by AuthContext:

| Function | What it does |
|----------|-------------|
| `login(email, password)` | Calls mock API → sets user state → saves to localStorage |
| `registerStudent(name, email, password)` | Creates new student → sets user state → saves to localStorage |
| `logout()` | Clears user state → removes from localStorage |
| `updateUserInContext(updates)` | Updates user data (e.g., when resume is uploaded) |

### Session Persistence
When you login, the user data is saved to `localStorage` under the key `placement_session`. When you refresh the page, `useEffect` in `AuthProvider` checks for this key and auto-restores the session. This is why you stay logged in after refreshing.

---

## 7. Mock Backend — localStorage as Database

### storage.js — The "Backend"

This file simulates a REST API backend. Instead of making HTTP requests to a server, it reads/writes to `localStorage`.

### Database Schema (localStorage keys):

| Key | What it stores | Structure |
|-----|---------------|-----------|
| `placement_users` | All registered users | `[{ id, name, email, password, role, resume, resumeText }]` |
| `placement_jobs` | All placement drives | `[{ id, title, company, description, salary, deadline }]` |
| `placement_applications` | All job applications | `[{ id, studentId, jobId, resume, status, appliedAt }]` |
| `placement_ai_api_key` | Optional API Key | String key for OpenRouter/OpenAI requests |

### Initial Data Seeding (`initializeStorageData`):

When the app loads for the first time, it seeds the database with:
- **1 Admin user**: `admin@college.edu` / `password123`
- **1 Student user**: `student1@college.edu` / `password123`
- **2 Sample jobs**: Google (Software Engineer) and Amazon (Data Analyst)
- **Empty applications array**

This only runs if the data doesn't already exist (prevents overwriting).

### API Functions Explained:

#### User APIs:
```
apiLogin(email, password)
  → Finds user with matching email+password
  → Returns user data (WITHOUT password for security)
  → Throws error if not found

apiRegisterStudent(name, email, password)
  → Checks if email already exists
  → Creates new user with role='student'
  → Returns user data (WITHOUT password)

apiUpdateUserResume(userId, base64Resume)
  → Finds user by ID
  → Updates their resume field with Base64 encoded file
  → Returns updated user data
```

#### Job APIs:
```
apiGetJobs()
  → Returns all jobs from localStorage

apiCreateJob(jobDetails)
  → Adds a new job with auto-generated ID (Date.now())
  → Returns the new job
```

#### Application APIs:
```
apiApplyForJob(studentId, jobId, resumeBase64)
  → Checks if student already applied (prevents duplicates)
  → Creates new application with status='pending'
  → Returns the application

apiGetApplicationsForStudent(studentId)
  → Returns only this student's applications

apiGetAllApplications()
  → Returns ALL applications with student & job details joined (hydrated)
  → Used by admin to see full picture

apiUpdateApplicationStatus(applicationId, status)
  → Changes status to 'shortlisted' or 'rejected'
  → Used by admin
```

### The `delay()` Function
Every API function uses `await delay(500)` — this adds a 500ms artificial delay to simulate real network latency. This makes the app feel more realistic (loading states, etc.).

### The Destructuring Pattern for Removing Password:
```jsx
const { password: _, ...safeUser } = user;
```
This extracts `password` into a throwaway variable `_`, and collects everything else into `safeUser`. This way, the password is never sent to the frontend/components.

---

## 8. Pages — Detailed Breakdown

### 8.1 Landing.jsx (Home Page)

**Purpose**: Welcome page with a call-to-action to get started.

**Key elements**:
- Gradient text heading using CSS `background-clip: text`
- Glass-morphism card (`.glass-panel`)
- `<Link to="/auth">` — navigates to login page without page reload

**Concepts used**: Functional component, JSX, inline styles, React Router `<Link>`

---

### 8.2 Auth.jsx (Login & Register)

**Purpose**: Single page that toggles between login and registration modes.

**State variables**:
```jsx
const [isLogin, setIsLogin] = useState(true);   // Toggle between login/register
const [email, setEmail] = useState('');          // Form field
const [password, setPassword] = useState('');    // Form field
const [name, setName] = useState('');            // Only for registration
const [error, setError] = useState('');          // Error message display
```

**Form submission flow**:
```
User fills form → clicks submit → handleSubmit() runs
  → if login mode:
      → calls login(email, password) from AuthContext
      → on success: navigate to /admin or /student based on role
      → on error: show error message
  → if register mode:
      → calls registerStudent(name, email, password) from AuthContext
      → on success: navigate to /student
      → on error: show error message
```

**Conditional Rendering**: The name field only shows when `!isLogin`:
```jsx
{!isLogin && (
    <div className="input-group">
        <label>Full Name</label>
        <input ... />
    </div>
)}
```

---

### 8.3 StudentDashboard.jsx

**Purpose**: Main page for students after login.

**Layout**: Two-column grid
- **Left (main area)**: List of available placement drives with "Apply Now" buttons
- **Right (sidebar)**: Resume upload card + application status tracker

**State variables**:
```jsx
const [jobs, setJobs] = useState([]);        // All available jobs
const [myApps, setMyApps] = useState([]);    // This student's applications
const [loading, setLoading] = useState(true); // Loading state
const [uploading, setUploading] = useState(false); // Resume upload in progress
const [error, setError] = useState('');       // Error messages
const [success, setSuccess] = useState('');   // Success messages
```

**Resume Upload Process** (Includes AI & Parsing):
```
1. User clicks "Update Resume" → triggers hidden file input
2. File selected → handleFileUpload() runs
3. Validates file size (max 2MB)
4. Uses FileReader API to convert file to Base64 string for storage
5. Uses `pdfjs-dist` to automatically extract raw text directly in the browser
6. Calls apiUpdateUserResumeText() to save parsed text and resume content in localStorage
7. AI feature `getAiResumeInsights()` then evaluates the extracted text against available jobs and provides ATS scores, strengths, and customized improvement suggestions.
8. Updates user context so the rest of the app knows resume exists
```

**What is Base64?**
Binary files (PDF, images) can't be stored as plain text. Base64 encoding converts binary data into a text string (like `data:application/pdf;base64,JVBERi0xLjQK...`). This allows storing files in localStorage (which only stores strings).

**Application Flow**:
```
Student clicks "Apply Now"
  → Checks if resume is uploaded (can't apply without it)
  → Calls apiApplyForJob(userId, jobId, resume)
  → Reloads data → button changes to "Applied" (disabled)
```

**Helper function**:
```jsx
const hasApplied = (jobId) => myApps.some(a => a.jobId === jobId);
```
Checks if the student already applied to a specific job. `Array.some()` returns `true` if any element matches.

---

### 8.4 AdminDashboard.jsx

**Purpose**: Admin panel for TPO to manage drives and applications.

**Two tabs**:
1. **Placement Drives** — View existing drives + post new ones
2. **Student Applications** — Review, shortlist, or reject applications

**Tab System** (using state):
```jsx
const [activeTab, setActiveTab] = useState('drives');
// Render drives content when activeTab === 'drives'
// Render applications content when activeTab === 'applications'
```

**Post New Drive Form**:
```jsx
const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    description: '',
    salary: '',
    deadline: ''
});
```
When submitted, calls `apiCreateJob(jobForm)` → clears form → reloads data.

**Application Management**:
- Admin sees a table with: Student Name, Company & Role, Resume (download), Status, Actions
- For "pending" applications, admin can click "Shortlist" or "Reject"
- These call `apiUpdateApplicationStatus(appId, newStatus)`

**AI Interview Kit**:
- Admin can click on "AI Questions" under Actions.
- Uses `getAiInterviewQuestions()` to send the student's previously parsed resume text along with the specific job's details to the AI provider.
- Generates 3-5 customized, relevant technical or HR questions designed specifically to probe the student's fit for that exact role based on their CV.

**Resume Download**:
```jsx
const downloadBase64File = (base64String, fileName) => {
    const link = document.createElement("a");
    link.href = base64String;        // Base64 string IS a valid href
    link.download = fileName;        // Suggested filename
    document.body.appendChild(link);
    link.click();                    // Programmatically click it
    document.body.removeChild(link); // Clean up
};
```

---

## 9. CSS & Styling — Glassmorphism Design

### What is Glassmorphism?
A modern UI design trend where elements look like frosted glass — semi-transparent with a blur effect behind them.

### CSS Variables (Custom Properties):
Defined in `:root` in `index.css`, these are reusable values:
```css
:root {
  --primary: #6366f1;        /* Indigo — main brand color */
  --primary-hover: #4f46e5;  /* Darker indigo for hover states */
  --glass-bg: rgba(255, 255, 255, 0.7);  /* Semi-transparent white */
}
```
**Usage**: `background: var(--primary);` — Makes it easy to change colors globally.

### The Glass Panel Effect:
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.7);      /* Semi-transparent white */
  backdrop-filter: blur(12px);                /* Blurs whatever is behind */
  -webkit-backdrop-filter: blur(12px);        /* Safari support */
  border: 1px solid rgba(255, 255, 255, 0.5); /* Subtle white border */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05); /* Soft shadow */
  border-radius: 1rem;                        /* Rounded corners */
}
```

### Mesh Gradient Background:
The `body` has multiple `radial-gradient` layers creating a colorful mesh effect:
```css
body {
  background-image:
    radial-gradient(at 40% 20%, hsla(228,100%,74%,1) 0px, transparent 50%),
    radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
    /* ... more gradients ... */;
  background-attachment: fixed;  /* Doesn't scroll with content */
}
```

### Animation Classes:
```css
.fadeIn  → opacity 0 to 1
.slideUp → opacity 0 + translateY(20px) to opacity 1 + translateY(0)
```

---

## 10. Key React Concepts Used

### 10.1 Components
Everything in React is a component — a reusable piece of UI. This project uses **functional components** (functions that return JSX).

```jsx
export default function Landing() {
    return <div>...</div>;  // JSX (looks like HTML but is JavaScript)
}
```

### 10.2 JSX (JavaScript XML)
JSX lets you write HTML-like code inside JavaScript. It gets compiled to `React.createElement()` calls.

**Key differences from HTML:**
- `class` → `className`
- `for` → `htmlFor`
- Style is an object: `style={{ color: 'red', fontSize: '16px' }}`
- JavaScript expressions use `{}`: `<h1>Hello, {user.name}</h1>`

### 10.3 useState (State Hook)
```jsx
const [count, setCount] = useState(0);
//     ↑ value   ↑ setter     ↑ initial value
```
- State is data that can change over time
- When state changes, React re-renders the component
- NEVER modify state directly (`count = 5` ❌), always use the setter (`setCount(5)` ✅)

### 10.4 useEffect (Side Effect Hook)
```jsx
useEffect(() => {
    // This code runs AFTER the component renders
    loadData();
}, []);  // Empty array = run only once (on mount)
```
- Used for: API calls, localStorage reads, timers, subscriptions
- The dependency array `[]` controls WHEN it runs:
  - `[]` → only on first render (mount)
  - `[userId]` → on mount + whenever `userId` changes
  - No array → on every render (usually a bad idea)

### 10.5 useContext (Context Hook)
```jsx
const { user, login, logout } = useAuth();
```
Accesses shared state from the nearest `AuthProvider` above in the component tree.

### 10.6 useNavigate (Router Hook)
```jsx
const navigate = useNavigate();
navigate('/student');  // Programmatically go to a URL
```

### 10.7 Conditional Rendering
```jsx
{error && <div className="error">{error}</div>}
// If error is truthy, render the div. If falsy, render nothing.

{isLogin ? 'Welcome Back' : 'Create Account'}
// Ternary: if isLogin → show 'Welcome Back', else → show 'Create Account'
```

### 10.8 List Rendering with .map()
```jsx
{jobs.map(job => (
    <div key={job.id}>  {/* key is required for React to track items */}
        <h3>{job.title}</h3>
    </div>
))}
```

### 10.9 Async/Await
```jsx
const handleSubmit = async (e) => {
    e.preventDefault();        // Prevent page reload
    try {
        const user = await login(email, password);  // Wait for result
        navigate('/student');
    } catch (err) {
        setError(err.message);  // Handle errors
    }
};
```

### 10.10 Props (Properties)
```jsx
// Parent passes data:
<PrivateRoute roleRequired="student">

// Child receives it:
const PrivateRoute = ({ children, roleRequired }) => { ... }
```

---

## 11. Data Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│                    localStorage                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐│
│  │placement_users│ │placement_jobs│ │placement_apps ││
│  └──────┬───────┘ └──────┬───────┘ └──────┬───────┘│
└─────────┼────────────────┼────────────────┼─────────┘
          │                │                │
     ┌────▼────────────────▼────────────────▼────┐
     │           storage.js (Mock API)            │
     │  apiLogin, apiGetJobs, apiApplyForJob ...  │
     └────┬────────────────┬────────────────┬────┘
          │                │                │
     ┌────▼─────┐   ┌─────▼──────┐  ┌──────▼──────┐
     │AuthContext│   │  Student   │  │    Admin     │
     │(login,   │   │ Dashboard  │  │  Dashboard   │
     │ logout)  │   │(view jobs, │  │(post drives, │
     │          │   │  apply)    │  │  manage apps) │
     └──────────┘   └────────────┘  └──────────────┘
```

### Application Status Lifecycle:
```
Student applies → status: "pending"
                      │
              Admin reviews
              /              \
   Shortlist ✅            Reject ❌
   status: "shortlisted"   status: "rejected"
```

---

## Quick Reference — Demo Credentials

| Role    | Email                    | Password      |
|---------|--------------------------|---------------|
| Admin   | admin@college.edu        | password123   |
| Student | student1@college.edu     | password123   |

---

*These notes cover everything you need to understand, explain, and defend this project. Good luck! 🎓*
