# Backend Notes

## Current Architecture

The current project uses a simulated backend implemented in `src/lib/storage.js`. It uses browser `localStorage` as a mock database instead of a separate server or hosted database.

This approach is suitable for a college prototype because it allows the application to work without backend deployment.

## Storage Collections

The application uses these localStorage keys:

```text
placement_users
placement_jobs
placement_applications
placement_session
```

## User Operations

The storage layer supports:

- Demo account initialization
- Student registration
- User login
- Resume storage
- Extracted resume-text storage
- AI feedback storage

Passwords are currently part of the mock local data and must be replaced with securely hashed passwords in a production backend.

## Job Operations

Administrators can create placement drives containing:

- Job title
- Company
- Description
- Salary
- Application deadline

Students can retrieve the available drives from the storage layer.

## Application Operations

When a student applies, the application records:

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

Application status values are:

```text
pending
shortlisted
rejected
```

## Resume Processing

Uploaded resume files are stored as Base64 data. PDF files are parsed by `src/lib/resumeParser.js`, which extracts text using PDF.js.

The extracted text supports:

- Local resume scoring
- Skill detection
- Job matching
- AI resume analysis

The upload limit is restricted to reduce browser storage-quota failures.

## Local Analysis

The mock backend calculates feedback using:

- Resume length
- Known technical skills
- Resume section names
- Job skill overlap

## Limitations

localStorage data is:

- Specific to one browser
- Not shared between devices
- Limited in size
- Lost when site data is cleared
- Not suitable for multi-user production use

## Recommended Production Backend

For a complete production system, replace the mock backend with:

- Node.js and Express
- MongoDB or PostgreSQL
- Secure password hashing with bcrypt
- JWT or secure cookie sessions
- Server-side validation
- Cloud resume storage such as S3 or Cloudinary
