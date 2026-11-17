# Frontend Documentation

## 1. Introduction

The Placement Portal frontend is a React-based Single Page Application (SPA) developed with Vite. It provides a centralized interface for students and Training and Placement Officers (TPOs) to manage placement activities.

The frontend is responsible for:

- Rendering pages and reusable interface elements
- Managing navigation without full-page reloads
- Handling login, registration, and protected routes
- Displaying placement drives
- Uploading and processing resumes
- Submitting job applications
- Showing application status
- Displaying local and AI-generated resume feedback
- Providing the BUB placement chatbot

The application separates student and administrator functionality through role-based routing.

## 2. Technology Stack

### React

React is used to build the user interface using functional components. Each page is divided into logical sections such as headers, cards, forms, dashboards, and status displays.

React state hooks are used for changing values such as:

- Current user
- Loading status
- Form values
- Uploaded resume state
- Application lists
- AI feedback
- Chatbot messages

### Vite

Vite provides:

- Local development server
- Fast Hot Module Replacement
- Production bundling
- Environment-variable support
- Optimized static assets

The application can be started with:

```bash
npm run dev
```

The production bundle can be generated with:

```bash
npm run build
```

### React Router

React Router provides client-side navigation. The browser loads the main application once, and React changes the rendered page based on the URL.

### Lucide React

Lucide React supplies interface icons for actions such as:

- Login and logout
- Resume upload
- Job listings
- Application status
- Chatbot controls
- AI insights

### PDF.js

PDF.js is used to extract readable text from uploaded PDF resumes in the browser. The extracted text is used by local analysis and the AI resume advisor.

## 3. Application Entry Point

The browser entry point is `index.html`:

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

The `root` element is the mounting point for the React application.

`src/main.jsx` initializes the application using the following provider structure:

```text
StrictMode
    ↓
AuthProvider
    ↓
BrowserRouter
    ↓
App
```

### StrictMode

React StrictMode helps identify potential problems during development.

### AuthProvider

AuthProvider makes authentication state available to all components through React Context.

### BrowserRouter

BrowserRouter enables URL-based navigation and route rendering.

### App

App contains the route configuration and application-level components.

## 4. Project Structure

Important frontend files include:

```text
src/
├── main.jsx
├── App.jsx
├── App.css
├── index.css
├── context/
│   └── AuthContext.jsx
├── components/
│   └── BubChatbot.jsx
├── lib/
│   ├── aiResumeAdvisor.js
│   ├── resumeParser.js
│   └── storage.js
└── pages/
    ├── Landing.jsx
    ├── Auth.jsx
    ├── StudentDashboard.jsx
    └── AdminDashboard.jsx
```

## 5. Main Routes

Routes are configured in `src/App.jsx`.

| Route | Component | Description | Access |
|---|---|---|---|
| `/` | Landing | Project introduction and entry point | Public |
| `/auth` | Auth | Login and registration | Public |
| `/student` | StudentDashboard | Student placement workspace | Student |
| `/admin` | AdminDashboard | TPO administration workspace | Admin |

An unknown route is redirected to the landing page.

## 6. Protected Routes

The `PrivateRoute` component protects authenticated pages.

The route protection process is:

```text
Check whether a user exists
        ↓
If no user, redirect to /auth
        ↓
Check the user's role
        ↓
If the role is incorrect, redirect to /
        ↓
Render the requested dashboard
```

This prevents:

- Unauthenticated users from opening dashboards
- Students from accessing administrator pages
- Administrators from accessing student-only pages

This protection is currently implemented in the frontend and should be duplicated on a real backend before production use.

## 7. Authentication Context

`src/context/AuthContext.jsx` uses React Context to share authentication functions and state.

The context provides:

- `user`
- `login()`
- `registerStudent()`
- `logout()`
- `updateUserInContext()`
- `loading`

### Login Flow

```text
User enters email and password
        ↓
Auth page calls login()
        ↓
The storage layer validates the credentials
        ↓
The authenticated user is placed in React state
        ↓
A lightweight session is saved
        ↓
The user is redirected to a role-specific dashboard
```

The persisted session intentionally excludes the Base64 resume to reduce browser storage usage.

## 8. Landing Page

The landing page introduces the portal and directs users to authentication.

Its responsibilities include:

- Explaining the purpose of the portal
- Presenting the placement-focused design
- Providing a Get Started action
- Displaying the BUB chatbot entry button

## 9. Authentication Page

The authentication page supports two modes:

### Login

Users provide:

- Email address
- Password

The login form validates the credentials through the storage layer.

### Student Registration

Students can create an account by entering:

- Name
- Email
- Password

Administrator accounts are seeded as demo accounts rather than created through public registration.

The page displays validation and authentication errors to the user.

## 10. Student Dashboard

The student dashboard is the main student workspace.

### Dashboard Header

The header displays:

- Student name
- Current role
- Logout action

### Available Drives

Placement drives are displayed as cards containing:

- Job title
- Company
- Description
- Salary
- Application deadline
- Match score when available
- Apply button

### Job Sorting

When resume feedback is available, jobs are sorted using match scores. Matched drives are displayed before other available drives.

### Application Action

Before submitting an application, the frontend checks whether the student has uploaded a resume.

After a successful application:

- The button changes to an Applied state
- A success message appears
- Application data is refreshed

### Application Status

Students can view their submitted applications and current status:

- Pending
- Shortlisted
- Rejected

## 11. Resume Upload Interface

The student dashboard contains a resume card with:

- Current upload status
- Update Resume button
- File picker
- Upload progress label
- File-format guidance
- File-size guidance

The frontend accepts:

```text
.pdf
.doc
.docx
```

Automatic text extraction is currently available for PDF files.

The upload process is:

```text
Select file
        ↓
Validate file size
        ↓
Read file as Base64
        ↓
Save resume data
        ↓
Extract PDF text when applicable
        ↓
Generate local feedback
        ↓
Request AI analysis when configured
        ↓
Refresh displayed insights
```

## 12. Resume Insights Interface

The Resume Insights card displays:

- Resume rating
- Rating label
- Local feedback suggestions
- AI loading state
- AI summary
- Strengths
- Improvements

If AI analysis fails, the frontend shows a clear warning and continues displaying local resume analysis.

This fallback makes the application usable even when:

- The API key is missing
- The AI provider is unavailable
- The free model reaches its limit
- The user has no internet connection

## 13. Administrator Dashboard

The administrator dashboard is designed for TPO operations.

Administrators can:

- Create placement drives
- View all placement applications
- Review student and job information
- Inspect resume-related information
- Update application statuses

The status-management flow is:

```text
Pending application
        ↓
Admin review
        ↓
Shortlisted or rejected
```

## 14. BUB Chatbot Interface

The BUB chatbot is a reusable application-level component rendered from `App.jsx`.

The interface includes:

- Floating open button
- Chat panel
- Conversation history
- User and assistant message bubbles
- Input field
- Send button
- Enter-key submission
- Loading indicator
- Error response display
- Automatic scroll to the latest message

BUB is available throughout the application because it is rendered outside the individual page routes.

## 15. State Management

The application uses local component state with React hooks.

Examples of managed state include:

```text
user
jobs
applications
loading
uploading
aiLoading
resumeFeedback
aiFeedback
errors
success messages
chat messages
```

React Context is used for authentication because the user session is required by multiple pages and components.

## 16. Loading and Error States

The frontend provides feedback during asynchronous operations.

Examples include:

- Loading Dashboard...
- Uploading...
- Running AI analysis...
- BUB is typing...
- Invalid credentials
- Failed resume processing
- Storage quota errors
- AI unavailable warnings

These states prevent users from assuming that an operation has completed when it is still running or has failed.

## 17. Styling and Responsive Design

Global styling is defined in `src/index.css`.

The design uses:

- CSS variables
- Gradient backgrounds
- Semi-transparent glass panels
- Backdrop blur
- Rounded cards
- Soft shadows
- Responsive grid layouts
- Primary, success, warning, and danger colors

The dashboard uses responsive layouts so that the job board and sidebar can adapt to different screen widths.

## 18. Accessibility and Usability

The frontend improves usability through:

- Descriptive button labels
- Visible status messages
- Clear form placeholders
- Keyboard support in the chatbot
- Disabled states during submission
- Icons paired with text
- Color-coded feedback

Future accessibility improvements should include:

- Explicit labels connected to all form inputs
- More complete keyboard navigation
- Screen-reader descriptions for icon-only controls
- Stronger color contrast testing
- Focus-state testing

## 19. Frontend-to-Data-Layer Interaction

Frontend components call asynchronous functions from `src/lib/storage.js`.

Examples include:

```javascript
apiLogin()
apiRegisterStudent()
apiGetJobs()
apiApplyForJob()
apiGetApplicationsForStudent()
apiGetResumeFeedback()
apiUpdateUserResume()
```

This separation prevents page components from directly implementing all storage logic and makes a future backend migration easier.

## 20. Security Considerations

The current frontend is a demonstration system and has important limitations:

- Authentication is client-side
- localStorage can be inspected by the user
- Demo passwords are not securely hashed
- Frontend route protection is not sufficient for production
- AI requests currently expose the API key in the browser build

For production, the frontend should communicate with a secure backend. The backend should handle authentication, authorization, resume storage, validation, and AI requests.

## 21. Performance Considerations

The frontend uses Vite for optimized builds and lazy-loads the PDF parser when a PDF is uploaded.

Further improvements could include:

- Lazy loading dashboard pages
- Compressing resume files
- Caching job data
- Paginating applications
- Debouncing search input
- Limiting chatbot history
- Avoiding unnecessary component re-renders

## 22. Future Frontend Improvements

Recommended enhancements include:

- Job search, sorting, and filtering
- Student profile editing
- Profile completion progress
- Resume preview and download
- Saved placement drives
- Deadline notifications
- Application timeline
- Dark mode
- Mobile navigation
- Admin charts and analytics
- Better accessibility support
- Real-time status notifications

## 23. Conclusion

The frontend provides a complete prototype experience for a college placement portal. It combines role-based navigation, resume management, job applications, local feedback, AI assistance, and chatbot support in a single responsive React application.

Its component-based structure and separated data-access functions provide a clear foundation for future migration to a secure backend and production database.
