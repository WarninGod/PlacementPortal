# Connectivity and Data Flow Documentation

## 1. Introduction

Connectivity describes how the different parts of the Placement Portal exchange data and coordinate application behavior.

The current project is a frontend-only prototype. It does not have a separately deployed REST API or database server. Instead:

- React components provide the user interface.
- `src/lib/storage.js` acts as a mock data-access layer.
- Browser `localStorage` acts as the local data store.
- PDF.js processes PDF resumes in the browser.
- OpenRouter provides optional AI services.

This design allows the project to run without backend infrastructure while preserving a structure that can later be migrated to real APIs.

## 2. Current Connectivity Architecture

```text
Browser
  │
  ├── React pages and components
  │       │
  │       ├── AuthContext
  │       │
  │       ├── storage.js mock API
  │       │       │
  │       │       └── browser localStorage
  │       │
  │       ├── resumeParser.js
  │       │       │
  │       │       └── PDF.js worker
  │       │
  │       └── aiResumeAdvisor.js
  │               │
  │               └── OpenRouter HTTPS API
  │
  └── Vite static application bundle
```

The frontend is deployed as static files. The browser establishes external network connectivity only when an AI request is made.

## 3. Application Startup Flow

When the application starts:

```text
Browser requests index.html
        ↓
index.html loads src/main.jsx
        ↓
React providers are initialized
        ↓
AuthProvider checks for an existing session
        ↓
App initializes mock storage data
        ↓
React Router selects the current route
        ↓
The requested page is rendered
```

`App.jsx` calls `initializeStorageData()` when the application loads. This creates demo users, default placement drives, and an empty application list when the corresponding localStorage records do not exist.

## 4. Frontend-to-Data-Layer Communication

Pages do not directly implement all storage operations. They call named asynchronous functions exported by `src/lib/storage.js`.

Example:

```javascript
const jobs = await apiGetJobs();
```

The data-layer functions use a simulated delay so that the prototype behaves similarly to a network-connected application. This also allows the interface to demonstrate loading states.

The current data-layer functions include:

```text
apiLogin()
apiRegisterStudent()
apiUpdateUserResume()
apiUpdateUserResumeText()
apiUpdateUserAIFeedback()
apiGetResumeFeedback()
apiGetJobs()
apiCreateJob()
apiApplyForJob()
apiGetApplicationsForStudent()
apiGetAllApplications()
apiUpdateApplicationStatus()
```

## 5. LocalStorage Data Collections

The mock data layer uses these browser storage keys:

```text
placement_users
placement_jobs
placement_applications
placement_session
```

### Users

The users collection stores:

- User ID
- Name
- Email
- Password in the prototype
- Role
- Resume data
- Extracted resume text
- AI feedback

### Jobs

The jobs collection stores:

- Job ID
- Job title
- Company
- Description
- Salary
- Deadline

### Applications

The applications collection stores:

- Application ID
- Student ID
- Job ID
- Resume reference/data
- Current status
- Application timestamp

### Session

The session stores a lightweight authenticated-user object. The current implementation deliberately excludes the large Base64 resume from the persisted session to reduce storage duplication and quota failures.

## 6. Storage Initialization

The initialization process is:

```text
Check placement_users
        ↓
Seed demo users if empty
        ↓
Check placement_jobs
        ↓
Seed default drives and add missing defaults
        ↓
Check placement_applications
        ↓
Create an empty application list when needed
```

The initialization logic preserves existing user-created jobs and applications while adding missing default job records.

## 7. Authentication Connectivity

The authentication flow is managed by `AuthContext`.

```text
User submits login form
        ↓
Auth page calls login(email, password)
        ↓
apiLogin() searches placement_users
        ↓
Invalid credentials produce an error
        ↓
Valid credentials return a password-free user object
        ↓
AuthContext updates React state
        ↓
A lightweight session is persisted
        ↓
The user navigates to /student or /admin
```

### Session Restoration

On page refresh:

```text
AuthProvider reads placement_session
        ↓
The stored user is restored into React state
        ↓
Protected routes become available
```

If no session exists, protected routes redirect the visitor to `/auth`.

### Logout

Logout:

1. Clears the user from React state.
2. Removes `placement_session`.
3. Leaves stored users, jobs, and applications unchanged.
4. Returns the visitor to the public application flow.

## 8. Role-Based Route Connectivity

The route guard checks both authentication and role:

```text
Request /student
        ↓
Is a user authenticated?
        ├── No: redirect to /auth
        └── Yes
              ↓
        Is the role student?
              ├── Yes: render StudentDashboard
              └── No: redirect to /
```

The admin route follows the same pattern with the `admin` role.

This protects the user interface but is not sufficient as production security because the check runs in the browser. A real backend must repeat authorization checks on every protected API request.

## 9. Student Dashboard Data Flow

When the student dashboard loads:

```text
StudentDashboard receives authenticated user
        ↓
apiGetJobs()
        ├── retrieves placement drives
        ↓
apiGetApplicationsForStudent(user.id)
        ├── retrieves the student's applications
        ↓
apiGetResumeFeedback(user.id)
        ├── calculates local resume feedback
        ↓
The dashboard stores all results in React state
        ↓
Job cards, insights, and application status are rendered
```

The dashboard displays a loading state while the initial data is being retrieved.

## 10. Resume Upload Connectivity

The resume upload flow is:

```text
Student selects a file
        ↓
The file is checked for size
        ↓
FileReader converts it to a Data URL
        ↓
apiUpdateUserResume() stores the resume
        ↓
Existing AI feedback is cleared
        ↓
PDF files are sent to PDF.js for text extraction
        ↓
apiUpdateUserResumeText() stores extracted text
        ↓
apiGetResumeFeedback() calculates local feedback
        ↓
Optional AI analysis is requested
        ↓
The dashboard is updated
```

The browser-safe upload limit is 1.5 MB. This reduces the risk of exceeding localStorage capacity.

### Supported Upload Types

The file picker accepts:

```text
.pdf
.doc
.docx
```

Automatic text extraction is implemented for PDF files. Non-PDF files can be stored, but their text is not automatically extracted by the current parser.

## 11. PDF Parser Connectivity

`src/lib/resumeParser.js` uses PDF.js.

The parser:

1. Reads the selected file as an ArrayBuffer.
2. Converts the data to a byte array.
3. Loads the PDF document.
4. Iterates through each page.
5. Retrieves page text content.
6. Joins text fragments into readable lines.
7. Combines all pages into one text value.

```text
PDF file
   ↓
ArrayBuffer
   ↓
PDF.js document
   ↓
Page text content
   ↓
Normalized resume text
```

Scanned image-only PDFs may produce little or no text because OCR is not currently included.

## 12. Local Resume Feedback Connectivity

Local feedback works without an internet connection.

The storage layer:

1. Retrieves the stored student.
2. Reads the resume text.
3. Detects known skills.
4. Checks for important resume sections.
5. Calculates a score.
6. Compares skills with job requirements.
7. Generates suggestions.

The local analysis checks terms such as:

```text
project
experience
education
certification
intern
```

It also checks a predefined technical-skill list containing technologies such as React, JavaScript, Python, SQL, Docker, AWS, testing, communication, and leadership.

## 13. Job Application Connectivity

The application flow is:

```text
Student clicks Apply
        ↓
The dashboard checks whether a resume exists
        ↓
apiApplyForJob() checks duplicate applications
        ↓
The student's stored resume is associated with the application
        ↓
The application is saved
        ↓
Status is set to pending
        ↓
The dashboard reloads application data
```

Duplicate applications for the same student and job are rejected.

## 14. Admin Application Connectivity

The admin dashboard requests all applications through `apiGetAllApplications()`.

The data layer combines:

- Application data
- Student name and email
- Student resume text
- Job title
- Job company
- Job description

This combined result allows the administrator interface to show a useful review record without performing multiple lookups in the component.

When an administrator changes a status:

```text
Admin selects Shortlist or Reject
        ↓
apiUpdateApplicationStatus() finds the application
        ↓
The new status is stored
        ↓
The admin list is refreshed
```

## 15. AI Resume Analysis Connectivity

AI resume analysis uses `src/lib/aiResumeAdvisor.js`.

The request flow is:

```text
Extracted resume text is available
        ↓
The application checks for an AI API key
        ↓
Resume text and compact job data are placed in a prompt
        ↓
fetch() sends an HTTPS request to OpenRouter
        ↓
The model returns structured content
        ↓
The response is parsed as JSON
        ↓
Job IDs, scores, and result sizes are normalized
        ↓
The result is stored and displayed
```

The request contains:

- Resume text
- Job IDs
- Job titles
- Company names
- Job descriptions
- A structured-output instruction

## 16. AI Environment Configuration

The AI integration reads:

```text
VITE_OPENROUTER_API_KEY
VITE_OPENROUTER_MODEL
```

The configured free model is:

```text
nvidia/nemotron-3.5-super-vl:free
```

Vite embeds variables beginning with `VITE_` into the client bundle during the build. Therefore:

- Local development uses `.env.local`.
- Hosted Vercel deployments require variables in Vercel project settings.
- Changing a hosted variable requires a new deployment.
- API keys must never be committed to Git.

## 17. AI Response Validation

The AI helper validates the response before the UI uses it.

Validation includes:

- Parsing direct JSON
- Parsing JSON inside a fenced block
- Extracting a JSON object from surrounding text
- Clamping ratings between 0 and 100
- Keeping only job IDs that exist
- Clamping job scores between 0 and 100
- Limiting strengths and improvements
- Limiting job matches

This reduces the risk of malformed model output breaking the dashboard.

## 18. AI Fallback Connectivity

AI is optional. If the request fails:

```text
AI request fails
        ↓
The error is logged
        ↓
The user sees an unavailable-AI message
        ↓
Local resume feedback remains visible
```

If no text can be extracted, the interface explains that a text-based PDF is required for automatic AI analysis.

## 19. BUB Chatbot Connectivity

The BUB chatbot is rendered at the application level, so it is available across routes.

Its flow is:

```text
User opens BUB
        ↓
User enters a message
        ↓
The message is added to local chat state
        ↓
The API key is resolved from build configuration or local storage
        ↓
Previous messages are converted to chat history
        ↓
getBubChatResponse() sends the request
        ↓
The assistant response is appended to the chat
```

The chatbot displays a loading state while waiting and an error message if the provider request fails.

## 20. Network Requests

The AI client uses the browser `fetch()` API.

OpenRouter requests use:

```text
POST https://openrouter.ai/api/v1/chat/completions
```

The request includes:

- Bearer authorization
- JSON content type
- Application referer
- Application title
- Model name
- Conversation messages

The current mock storage operations do not use network requests. They read and write localStorage in the browser.

## 21. Error Handling

Connectivity-related errors handled by the application include:

- Invalid login credentials
- User not found
- Duplicate account
- Duplicate application
- Missing resume
- File too large
- PDF parsing failure
- Missing AI key
- AI provider error responses
- Invalid AI JSON
- Browser storage quota errors

The UI shows user-facing messages while detailed failures are logged to the browser console for debugging.

## 22. Browser Storage Quota Protection

Resume files are converted to Base64, which increases their size compared with the original file. Storing the same resume in users, sessions, and applications can quickly exceed the browser quota.

The current protection includes:

- A 1.5 MB upload limit
- Excluding the resume from the persisted session
- Retrieving the current resume from user storage when applying
- Explicit storage failure messages

This is a prototype-level solution. A real deployment should store files outside localStorage.

## 23. Deployment Connectivity

The project is deployed as a Vite static build.

Deployment flow:

```text
Git push to main
        ↓
Hosting provider detects the change
        ↓
npm install
        ↓
npm run build
        ↓
Vite creates the dist bundle
        ↓
Static assets are published
```

For AI features on Vercel:

1. Add `VITE_OPENROUTER_API_KEY`.
2. Add `VITE_OPENROUTER_MODEL`.
3. Enable the variables for Production.
4. Redeploy after changing them.

The hosted site and local site use separate browser localStorage areas because storage is scoped by origin.

## 24. Current Connectivity Limitations

The current architecture has these limitations:

- localStorage is not shared across browsers or devices.
- There is no centralized database.
- The frontend contains the AI request logic.
- Browser bundles can expose Vite client variables.
- Resume files are stored inefficiently as Base64.
- Client-side authorization can be bypassed.
- There are no server-side sessions.
- There are no server-side upload checks.
- There are no email or push notifications.
- AI requests depend on provider quotas and internet access.

## 25. Recommended Production Architecture

The recommended future connectivity design is:

```text
React frontend
        │ HTTPS
        ▼
Backend API
        ├── Authentication service
        ├── Authorization middleware
        ├── Placement-drive endpoints
        ├── Application endpoints
        ├── Resume upload endpoint
        └── AI advisor endpoint
                │
                ├── Database
                ├── Object/file storage
                └── OpenRouter or another AI provider
```

The backend should:

- Hash passwords with bcrypt or Argon2.
- Issue secure sessions or JWTs.
- Validate all request bodies.
- Verify user roles server-side.
- Store resumes in object storage.
- Keep AI keys in server environment variables.
- Add rate limiting.
- Log important events without storing unnecessary personal data.

## 26. Suggested API Endpoints

A future backend could expose:

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/jobs
POST   /api/jobs
GET    /api/applications/me
POST   /api/applications
PATCH  /api/applications/:id/status
POST   /api/resumes
GET    /api/resumes/me/feedback
POST   /api/ai/resume-analysis
POST   /api/ai/chat
```

## 27. Security and Privacy Recommendations

Resume data can contain personal information. A production version should:

- Ask for user consent before sending resume text to an AI provider.
- Explain how resume data is processed.
- Avoid logging full resumes.
- Encrypt data in transit using HTTPS.
- Restrict access to resumes by role.
- Delete files when users request removal.
- Rotate provider credentials.
- Keep secrets out of frontend source code and Git.

## 28. Testing Connectivity

Useful connectivity tests include:

### Local startup

```bash
npm run dev
```

Verify that the landing page and `/auth` return successfully.

### Production build

```bash
npm run build
```

Verify that Vite creates the `dist` directory without errors.

### Authentication

- Log in with valid credentials.
- Try invalid credentials.
- Refresh the dashboard.
- Log out and verify protected-route redirection.

### Applications

- Upload a valid resume.
- Apply to a drive.
- Attempt a duplicate application.
- Log in as admin and update the status.

### AI

- Upload a text-based PDF.
- Verify that the AI request is made when configured.
- Test behavior with no key.
- Test behavior when the provider is unavailable.
- Confirm local feedback remains visible.

## 29. Conclusion

The current connectivity design successfully connects the React interface to a browser-based mock backend, PDF parser, local resume-analysis engine, and optional OpenRouter AI services.

Its clear separation between pages, context, storage functions, parser utilities, and AI helpers makes the project easy to demonstrate and extend. The main future improvement is migrating localStorage and browser-side AI calls to a secure backend with a centralized database and protected file storage.
