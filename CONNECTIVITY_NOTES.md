# Connectivity Notes

## Frontend-to-Data-Layer Communication

React components communicate with the mock backend through asynchronous functions exported from `src/lib/storage.js`.

Example:

```javascript
const jobs = await apiGetJobs();
```

These functions use localStorage and simulated delays to behave similarly to asynchronous API calls.

## Authentication Flow

```text
User enters email and password
        ↓
apiLogin() searches stored users
        ↓
User data is returned without the password
        ↓
AuthContext stores the user session
        ↓
The user is redirected to the correct dashboard
```

## Resume Upload Flow

```text
User selects a file
        ↓
File size is checked
        ↓
File is converted to Base64
        ↓
Resume data is stored for the user
        ↓
PDF text is extracted when possible
        ↓
Local feedback and optional AI feedback are generated
```

## Application Flow

```text
Student selects Apply
        ↓
The system checks for an uploaded resume
        ↓
An application is created
        ↓
The application is stored
        ↓
The status becomes pending
```

## AI Connectivity

The AI features use the browser `fetch()` API to send requests to OpenRouter. The request contains resume text, job information, or chatbot messages.

The model is configured using:

```text
VITE_OPENROUTER_API_KEY
VITE_OPENROUTER_MODEL
```

The configured free model is:

```text
nvidia/nemotron-3.5-super-vl:free
```

For Vercel, environment variables must be configured in the project dashboard and a new deployment must be created because Vite embeds them during the build.

## Error Handling

The application handles:

- Invalid credentials
- Missing resumes
- Oversized files
- Missing AI configuration
- AI request failures
- Storage quota failures
- Duplicate applications

If AI analysis fails, the application displays local resume feedback instead.

## Deployment

The application is deployed as a Vite static build. The hosted frontend can serve the React application, but the current localStorage data remains isolated to each visitor's browser.

## Recommended Production Connectivity

The recommended future architecture is:

```text
React frontend
        ↓ HTTPS
Backend API
        ↓
Database and file storage
        ↓
OpenRouter or another AI provider
```

The API key should be kept on the backend rather than exposed in a browser bundle.
