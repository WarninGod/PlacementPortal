# Backend Documentation

## 1. Introduction

The Placement Portal currently uses a simulated backend implemented in `src/lib/storage.js`.

Instead of connecting to a separate server and database, the prototype stores application data in the browser's `localStorage`. This makes the project simple to run and demonstrate while preserving backend-style functions such as login, registration, job creation, resume updates, applications, and status changes.

The current backend should be described as a **client-side mock backend** rather than a production server.

## 2. Current Backend Architecture

```text
React components
        ↓
AuthContext and page-level handlers
        ↓
Functions in src/lib/storage.js
        ↓
Browser localStorage
```

The storage module provides an abstraction layer. Pages call functions such as `apiLogin()` and `apiGetJobs()` instead of directly manipulating storage keys.

This separation is useful because the functions can later be replaced with HTTP requests without completely rewriting the page components.

## 3. Why a Mock Backend Is Used

The mock backend is appropriate for the current college project prototype because:

- It requires no separate server setup.
- It works on a local machine without a database installation.
- It supports a complete demonstration flow.
- It allows data to persist across page refreshes.
- It is easy to reset by clearing site data.
- It keeps the project focused on functionality and interface design.

However, it is not suitable for real multi-user deployment because every browser has an independent copy of the data.

## 4. Storage Keys

The backend uses these localStorage keys:

```text
placement_users
placement_jobs
placement_applications
placement_session
```

### `placement_users`

Contains registered students and the seeded administrator.

### `placement_jobs`

Contains placement drives created by the administrator and default demo drives.

### `placement_applications`

Contains applications submitted by students.

### `placement_session`

Contains the lightweight currently authenticated-user session.

The session copy excludes the Base64 resume to reduce duplicated storage usage.

## 5. Storage Helper Functions

The storage layer defines two internal helper functions:

```javascript
getStorageItem(key, defaultValue)
setStorageItem(key, value)
```

`getStorageItem()`:

1. Reads a value from localStorage.
2. Parses the JSON value.
3. Returns a default value if no value exists.

`setStorageItem()` serializes JavaScript data with `JSON.stringify()` before storing it.

The storage layer also uses a simulated delay to represent asynchronous backend calls:

```javascript
const delay = (ms = 500) =>
  new Promise(resolve => setTimeout(resolve, ms));
```

This allows the frontend to display realistic loading states.

## 6. Initial Data Seeding

`initializeStorageData()` runs when the application starts.

Its responsibilities are:

1. Seed an administrator and demo student if no users exist.
2. Preserve existing users.
3. Add missing default placement drives.
4. Preserve administrator-created drives.
5. Initialize an empty application collection when required.

The seeded demo accounts are:

```text
Admin:   a@a.com / a
Student: s@s.com / s
```

These credentials are for demonstration only and must not be used in a real deployment.

## 7. User Data Model

A prototype user record contains fields similar to:

```javascript
{
  id,
  name,
  email,
  password,
  role,
  resume,
  resumeText,
  aiFeedback
}
```

### Field Description

| Field | Description |
|---|---|
| `id` | Unique user identifier |
| `name` | Student or administrator name |
| `email` | Login email address |
| `password` | Prototype credential |
| `role` | `student` or `admin` |
| `resume` | Base64 resume data |
| `resumeText` | Text extracted from a PDF |
| `aiFeedback` | Normalized AI analysis result |

The login function removes the password before returning the safe user object to the frontend.

## 8. Registration

Student registration is handled by `apiRegisterStudent()`.

The process is:

```text
Receive name, email, and password
        ↓
Read existing users
        ↓
Check whether the email already exists
        ↓
Reject duplicate email if found
        ↓
Create a student record
        ↓
Save the updated user collection
        ↓
Return the user without password data
```

The current implementation allows public student registration but does not expose public administrator registration.

## 9. Login

Login is handled by `apiLogin()`.

The process is:

```text
Receive email and password
        ↓
Search placement_users
        ↓
Compare credentials
        ↓
Reject invalid credentials
        ↓
Remove password from returned object
        ↓
Return authenticated user
```

The frontend then stores the user in AuthContext and persists a lightweight session.

## 10. Authentication Limitations

The current login system is suitable only for demonstration.

Limitations include:

- Passwords are stored in browser-readable storage.
- Passwords are not hashed.
- Users can inspect or modify localStorage.
- There is no server-side session.
- There is no account recovery process.
- There is no email verification.
- There is no login rate limiting.
- There is no account lockout.

A production implementation must move authentication to a backend.

## 11. Job Data Model

A placement drive contains fields similar to:

```javascript
{
  id,
  title,
  company,
  description,
  salary,
  deadline
}
```

### Field Description

| Field | Description |
|---|---|
| `id` | Unique drive identifier |
| `title` | Job or role title |
| `company` | Recruiting organization |
| `description` | Role responsibilities and requirements |
| `salary` | Compensation information |
| `deadline` | Final application date |

## 12. Creating Placement Drives

Administrators create drives through `apiCreateJob()`.

The process is:

```text
Admin submits drive form
        ↓
The storage layer reads existing drives
        ↓
A unique timestamp-based ID is created
        ↓
The new drive is appended
        ↓
The jobs collection is saved
        ↓
The new job is returned to the dashboard
```

In a production backend, the server should validate:

- Required fields
- Salary format
- Deadline format
- Deadline validity
- Administrator authorization
- Duplicate or suspicious job content

## 13. Retrieving Jobs

`apiGetJobs()` returns the current placement-drive collection.

The student dashboard uses this function to:

- Display available drives
- Sort drives by resume match
- Check job IDs during applications

The administrator dashboard uses it to:

- Display existing drives
- Refresh the job list after creating a drive

## 14. Application Data Model

An application contains:

```javascript
{
  id,
  studentId,
  jobId,
  resume,
  status,
  appliedAt
}
```

### Field Description

| Field | Description |
|---|---|
| `id` | Unique application identifier |
| `studentId` | Student who applied |
| `jobId` | Placement drive selected |
| `resume` | Resume associated with the application |
| `status` | Current review status |
| `appliedAt` | ISO timestamp of submission |

## 15. Application Lifecycle

The supported status lifecycle is:

```text
Student submits application
        ↓
pending
        ├── Admin shortlists student
        │       ↓
        │   shortlisted
        │
        └── Admin rejects student
                ↓
            rejected
```

The current prototype does not implement a separate interview, offer, or hired state, but these can be added later.

## 16. Applying for a Job

`apiApplyForJob()` performs these operations:

1. Reads existing applications.
2. Checks whether the same student already applied to the same job.
3. Retrieves the student's current resume when necessary.
4. Rejects the request when no resume exists.
5. Creates a pending application.
6. Stores the updated application collection.
7. Returns the new application.

Duplicate applications are rejected with an explicit error.

## 17. Retrieving Student Applications

`apiGetApplicationsForStudent(studentId)` filters the application collection by student ID.

The student dashboard uses the result to show:

- Applied drives
- Company names
- Application dates
- Current statuses

## 18. Retrieving All Applications

`apiGetAllApplications()` hydrates application records with related user and job information.

It combines:

```text
Application
        +
Student name and email
        +
Student resume text
        +
Job title and company
        +
Job description
```

This provides the administrator with a single review-ready record.

## 19. Updating Application Status

`apiUpdateApplicationStatus()`:

1. Finds the application by ID.
2. Verifies that the application exists.
3. Updates the status.
4. Saves the application collection.
5. Returns the updated application.

The production version should validate allowed status transitions and record who made the change.

## 20. Resume Storage

The current application converts selected resume files into Base64 Data URLs.

```text
File
  ↓
FileReader
  ↓
Base64 Data URL
  ↓
placement_users
```

PDF text is separately stored in `resumeText`.

This approach is convenient for a prototype but inefficient because Base64 increases file size and localStorage has a small quota.

The application reduces the risk by:

- Limiting uploads to 1.5 MB.
- Excluding the resume from the persisted session.
- Reusing the stored user resume when applying.
- Showing a clear error if storage is full.

## 21. PDF Resume Parsing

The parser in `src/lib/resumeParser.js` uses PDF.js to extract text.

The process is:

```text
Read PDF as ArrayBuffer
        ↓
Load PDF document
        ↓
Read each page
        ↓
Collect text items
        ↓
Normalize whitespace
        ↓
Store combined resume text
```

The parser does not perform OCR. Image-only scanned resumes may not produce usable text.

## 22. Local Resume Analysis

The storage module calculates local feedback without calling an external service.

The local score considers:

- Whether a resume file exists
- Resume text length
- Number of recognized skills
- Presence of important sections

Recognized sections include:

```text
Project
Experience
Education
Certification
Internship
```

The local analysis also compares known resume skills with skills found in each job description.

## 23. Job Matching

Job matching works by:

1. Extracting known skills from resume text.
2. Extracting known skills from each job's title and description.
3. Finding overlapping skills.
4. Calculating a percentage score.
5. Sorting jobs from highest to lowest match.

The result includes:

```javascript
{
  jobId,
  title,
  company,
  score,
  matchedSkills,
  jobSkills
}
```

## 24. AI Feedback Storage

When AI analysis succeeds, the normalized result is stored on the user record as `aiFeedback`.

This allows the dashboard to restore previously generated insights during later loads, subject to the limitations of browser storage.

When a new resume is uploaded:

1. Existing AI feedback is cleared.
2. Local feedback is recalculated.
3. New AI feedback is requested when possible.
4. The new result is stored.

## 25. Data Validation in the Current Backend

The prototype performs basic validation:

- Duplicate email detection
- User existence checks
- Application existence checks
- Duplicate application checks
- Resume presence checks
- File-size checks in the frontend
- Known job-ID filtering in AI feedback

The current backend does not provide complete server-grade validation because it runs in the browser.

## 26. Error Handling

Backend-style functions throw errors for conditions such as:

```text
Invalid credentials
User already exists
User not found
Student not found
Application not found
Already applied for this job
Missing resume
```

The frontend catches these errors and displays user-facing messages.

Storage quota errors are caught when the session is persisted and converted into a clear message instructing the user to clear site data.

## 27. Data Consistency

The prototype uses read-modify-write operations:

```text
Read JSON collection
        ↓
Modify JavaScript array
        ↓
Serialize complete array
        ↓
Write complete JSON collection
```

This is simple for a single browser but has no transactions or concurrency protection. Two simultaneous tabs may overwrite each other's changes.

## 28. Current Backend Limitations

The localStorage backend has these limitations:

- No centralized data
- No cross-device synchronization
- No multi-user consistency
- Small storage quota
- No database indexes
- No transactions
- No server-side authorization
- No secure password storage
- No audit history
- No file-storage lifecycle
- No automatic backups
- No reliable concurrent writes
- Data can be modified through browser developer tools

These limitations should be clearly stated during a project viva.

## 29. Recommended Production Architecture

A production version should use:

```text
React frontend
        ↓ HTTPS
Node.js / Express API
        ↓
PostgreSQL or MongoDB
        ├── Users
        ├── Placement drives
        ├── Applications
        ├── Resume metadata
        └── Audit events
        ↓
Object storage
        └── Resume files
```

AI requests should go through the backend:

```text
React frontend
        ↓
Backend AI endpoint
        ↓
OpenRouter
```

This prevents exposing the provider key in the browser bundle.

## 30. Recommended Production Database Tables

### Users

```text
id
name
email
password_hash
role
department
graduation_year
created_at
updated_at
```

### Placement Drives

```text
id
title
company
description
salary
deadline
created_by
created_at
updated_at
```

### Applications

```text
id
student_id
drive_id
resume_id
status
applied_at
updated_at
reviewed_by
reviewed_at
```

### Resumes

```text
id
student_id
storage_url
file_name
file_size
mime_type
extracted_text
created_at
updated_at
```

### Audit Events

```text
id
actor_id
action
entity_type
entity_id
created_at
metadata
```

## 31. Recommended Production API

A future backend could expose:

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/drives
POST   /api/drives
GET    /api/drives/:id
PATCH  /api/drives/:id
DELETE /api/drives/:id

POST   /api/applications
GET    /api/applications/me
GET    /api/applications
PATCH  /api/applications/:id/status

POST   /api/resumes
GET    /api/resumes/me
GET    /api/resumes/:id/download
DELETE /api/resumes/:id

POST   /api/ai/resume-analysis
POST   /api/ai/chat
```

Every protected endpoint should verify the authenticated user and required role.

## 32. Production Authentication

A secure backend should:

- Hash passwords with Argon2 or bcrypt.
- Never return password hashes to the frontend.
- Use secure, HTTP-only cookies or short-lived access tokens.
- Rotate refresh tokens.
- Add email verification where appropriate.
- Rate-limit login attempts.
- Support password reset.
- Log suspicious authentication activity.

## 33. Production Resume Handling

Instead of storing Base64 files in localStorage:

1. The frontend sends the file to a backend upload endpoint.
2. The backend validates size and MIME type.
3. The file is stored in S3, Cloudinary, or equivalent object storage.
4. Only metadata and a protected reference are stored in the database.
5. Downloads use authorization checks or short-lived signed URLs.

This avoids browser storage limits and supports multiple devices.

## 34. Production Authorization

Authorization should be enforced on the server:

```text
Read authenticated user
        ↓
Check role
        ↓
Check ownership or admin permission
        ↓
Allow or reject operation
```

Examples:

- A student can view their own applications.
- An administrator can review applications.
- Only administrators can create drives.
- A student cannot update another student's status.
- A user cannot download a resume without permission.

## 35. Backend Security

Production security requirements include:

- HTTPS everywhere
- Password hashing
- Secure cookies
- CSRF protection when cookie sessions are used
- CORS restrictions
- Request-body validation
- SQL or NoSQL injection protection
- File-type validation
- Malware scanning for uploaded files
- Rate limiting
- Audit logging
- Secret management
- Dependency updates

Resume content should not be written into ordinary logs.

## 36. Backend Notifications

A future backend can send notifications when:

- A student applies
- An administrator shortlists a student
- An administrator rejects an application
- A new drive is published
- A deadline is approaching

Notification channels could include:

- In-app notifications
- Email
- Push notifications

## 37. Backend Testing Strategy

### Unit Tests

Test:

- Score calculation
- Skill extraction
- Duplicate detection
- Status transitions
- Validation helpers

### Integration Tests

Test:

- Registration and login
- Job creation
- Application submission
- Status updates
- Resume upload

### Authorization Tests

Test that:

- Anonymous users cannot access protected endpoints.
- Students cannot create drives.
- Students cannot modify statuses.
- Administrators cannot access another user's private data.

### File Tests

Test:

- Valid PDF uploads
- Oversized files
- Invalid MIME types
- Empty PDFs
- Scanned PDFs

## 38. Migration Path from Mock Backend

The migration can be completed in stages:

### Stage 1: Create Backend

Build an Express server with health, authentication, drive, and application routes.

### Stage 2: Replace Storage Calls

Keep the existing function names but replace localStorage implementations with `fetch()` calls.

Example:

```javascript
export const apiGetJobs = async () => {
  const response = await fetch('/api/drives');
  if (!response.ok) throw new Error('Unable to load drives');
  return response.json();
};
```

### Stage 3: Move Authentication

Replace browser credential comparison with backend authentication and secure sessions.

### Stage 4: Move Resume Storage

Replace Base64 storage with object storage and database metadata.

### Stage 5: Move AI Requests

Create a backend AI endpoint so the provider key is never sent to the browser.

### Stage 6: Add Database and Monitoring

Add migrations, backups, audit logs, error tracking, and deployment monitoring.

## 39. Viva Explanation

If asked whether the project has a backend, explain:

> The current version implements a simulated backend through a dedicated storage service module and browser localStorage. This was selected to make the prototype self-contained and easy to demonstrate. The storage functions are organized like API methods, so they can be replaced by Express or REST calls during production migration. A production version would use a centralized database, secure authentication, object storage for resumes, and server-side authorization.

## 40. Conclusion

The current backend provides all essential placement-portal operations for a working academic prototype:

- User registration and login
- Role-based data access
- Placement-drive management
- Resume storage and parsing support
- Job applications
- Application status updates
- Local resume scoring
- AI feedback persistence

Its most important future upgrade is replacing browser localStorage with a secure server and centralized database. That change would enable real multi-user operation, cross-device access, reliable data consistency, secure authentication, and scalable resume storage.
