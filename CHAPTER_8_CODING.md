# Chapter 8: Coding & Implementation Snippets

The following representative code snippets demonstrate the core modules and functionality of the **AI-Based Placement Portal**. These snippets focus on the essential logic for each subsystem.

## 1. Entry Point

The following code snippet shows the initialization of the React application with routing and global state management before rendering the main interface.

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import App from './App.jsx'

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

## 2. Routing Setup

This snippet demonstrates role-based access control using a custom private route to safely separate the Admin and Student dashboards, preventing unauthorized access.

```javascript
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children, roleRequired }) => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/auth" />;
  if (roleRequired && user.role !== roleRequired) return <Navigate to="/" />;
  
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/student/*" element={
        <PrivateRoute roleRequired="student"><StudentDashboard /></PrivateRoute>
      } />
      <Route path="/admin/*" element={
        <PrivateRoute roleRequired="admin"><AdminDashboard /></PrivateRoute>
      } />
    </Routes>
  );
}
```

## 3. Authentication Logic

The authentication functionality is securely handled by saving the logged-in user's details directly into the `localStorage` (browser storage), keeping the session active across page reloads.

```javascript
// Inside AuthContext.jsx
const login = async (email, password) => {
    const userData = await apiLogin(email, password);
    setUser(userData);
    
    // Persist session to local storage
    localStorage.setItem('placement_session', JSON.stringify(userData));
    return userData;
};

const logout = () => {
    setUser(null);
    localStorage.removeItem('placement_session');
};
```

## 4. Job Management

This functionality allows the Training and Placement Officer (Admin) to post a new placement drive to the platform and immediately updates the system.

```javascript
// Inside AdminDashboard.jsx
const [jobForm, setJobForm] = useState({ title: '', company: '', description: '', salary: '', deadline: '' });

const handlePostJob = async (e) => {
    e.preventDefault();
    
    // Save job details to localStorage (browser storage)
    await apiCreateJob(jobForm); 
    
    // Reset form and UI
    setJobForm({ title: '', company: '', description: '', salary: '', deadline: '' });
    setShowForm(false);
    
    loadData(); // Refresh active drives list
};
```

## 5. Local Storage Structure Implementation

The following example explicitly shows how application data like new job postings is written directly to the `localStorage` (browser storage) database without relying on external backend systems.

```javascript
// Example localStorage usage
const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
jobs.push(newJob);
localStorage.setItem("jobs", JSON.stringify(jobs));
```

## 6. Job Application

The application submission code dictates how a student applies to a job, verifying first that they have properly uploaded a resume to the platform.

```javascript
// Inside StudentDashboard.jsx
const applyToJob = async (jobId) => {
    if (!user.resume) {
        setError("Please upload your resume first before applying.");
        return;
    }
    
    try {
        await apiApplyForJob(user.id, jobId, user.resume);
        setSuccess('Applied successfully!');
        loadData(); // Refresh student applications
    } catch (err) {
        setError(err.message);
    }
};
```

## 7. Resume Upload

This code extracts the chosen document file and converts the PDF to a Base64 string format so it can be correctly stored under the student's profile.

```javascript
// Inside StudentDashboard.jsx
const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.size > 2 * 1024 * 1024) return; // Max 2MB limit

    // Convert PDF file to Base64 String for local storage
    const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

    const updatedUser = await apiUpdateUserResume(user.id, base64);
    updateUserInContext({ resume: updatedUser.resume });
};
```

## 8. AI Analysis Feature

The AI integration code contacts the GPT-4o-mini model to compare the details extracted from the student's resume against the requirements of active job postings.

```javascript
// AI integration handling logic
const handleGenerateInsights = async (extractedResumeText, jobs) => {
    try {
        setAiLoading(true);
        
        // Fetch AI analysis matching the student's resume against active jobs
        const insights = await getAiResumeInsights({
            resumeText: extractedResumeText,
            jobs: jobs,
            apiKey: import.meta.env.VITE_AI_API_KEY
        });
        
        setAiFeedback(insights); // Update dashboard UI with scores & matches
    } catch (err) {
        console.error("AI Analysis failed:", err);
    } finally {
        setAiLoading(false);
    }
};
```

## 9. PDF Data Extraction (Resume Parsing)

This snippet from the core library shows how the application uses the `pdfjs-dist` package to programmatically read and extract raw text from the student's uploaded PDF resume so the AI can evaluate it.

```javascript
// Inside resumeParser.js
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

export const extractTextFromPdfFile = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);

  const loadingTask = getDocument({ data });
  const pdf = await loadingTask.promise;

  const pageTexts = [];
  // Loop through all pages of the PDF
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();

    // Extract strings and normalize whitespace
    const lines = textContent.items
      .map(item => item.str || '')
      .join(' ').replace(/\s+/g, ' ').trim();

    if (lines) pageTexts.push(lines);
  }

  return pageTexts.join('\n\n').trim();
};
```

## 10. Mock Database Initialization (Seeding Data)

This function seeds the `localStorage` (browser storage) database with default admin accounts, student profiles, and sample job postings when the application first loads, simulating a backend environment.

```javascript
// Inside storage.js
export const initializeStorageData = () => {
  // Seed an admin and student if database is empty
  if (getStorageItem(USERS_KEY).length === 0) {
    setStorageItem(USERS_KEY, [
      { id: 'u1', name: 'Admin TPO', email: 'admin@college.edu', role: 'admin' },
      { id: 'u2', name: 'Student', email: 'student@college.edu', role: 'student', resume: null }
    ]);
  }
  
  // Seed default placement drives 
  const existingJobs = getStorageItem(JOBS_KEY);
  if (existingJobs.length === 0) {
    setStorageItem(JOBS_KEY, [
      { id: 'j1', title: 'Software Engineer', company: 'Google', salary: '30 LPA' },
      { id: 'j2', title: 'Data Analyst', company: 'Amazon', salary: '20 LPA' }
    ]);
  }
  
  // Initialize applications table
  if (getStorageItem(APPS_KEY).length === 0) {
    setStorageItem(APPS_KEY, []);
  }
};
```

## 11. AI Prompt Construction (Prompt Engineering)

This snippet demonstrates how the system constructs specific instructions and formats the extracted resume data for the AI agent, explicitly commanding it to return structured JSON.

```javascript
// Inside aiResumeAdvisor.js
const buildPrompt = (resumeText, jobsCompact) => [
  'You are an ATS and placement mentor.',
  'Return ONLY valid JSON with fields: rating (0-100), summary, strengths[], improvements[], matches[].',
  'Each matches[] item must include: jobId, score (0-100), reason.',
  'Do not include markdown. Keep reasons concise and practical.',
  '',
  `Resume Text:\n${resumeText}`,
  '',
  `Jobs Openings:\n${JSON.stringify(jobsCompact)}`
].join('\n');
```

## 12. Simulated Network Latency (UX Enhancement)

To simulate a real-world backend environment and test loading states (like spinners) in the frontend, the local storage API calls use a synthetic wrapper promise that introduces an artificial delay.

```javascript
// Inside storage.js
// Simulated generic delay to mimic real network latency
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const apiLogin = async (email, password) => {
  await delay(); // Artificial pause before checking local storage
  
  const users = getStorageItem(USERS_KEY);
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error("Invalid credentials");
  
  const { password: _, ...safeUser } = user;
  return safeUser;
};
```

## 13. Resilient AI Output Parsing

Large Language Models (LLMs) occasionally wrap their JSON responses in markdown code blocks. This utility extracts pure JSON using Regular Expressions (Regex) to prevent application crashes when parsing the AI's response.

```javascript
// Inside aiResumeAdvisor.js
const extractJsonBlock = (text = '') => {
  // First, try parsing directly in case it's clean
  if (tryParseJson(text)) return tryParseJson(text);

  // If it's wrapped in a markdown fenced code block (```json...```)
  const fenced = text.match(/```json\s*([\s\S]*?)```/i);
  if (fenced?.[1]) return tryParseJson(fenced[1].trim());

  // Fallback: strictly extract the first and last brace
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return tryParseJson(text.slice(firstBrace, lastBrace + 1));
  }

  return null;
};
```

## 14. File Reconstruction & Download Action

When an admin wants to view a submitted resume, this function dynamically creates a temporary clickable anchor link to convert the stored Base64 string back into a downloadable document on their device.

```javascript
// Inside AdminDashboard.jsx
const downloadBase64File = (base64String, fileName) => {
    // Dynamically create an anchor HTML element
    const link = document.createElement("a");
    link.href = base64String;
    link.download = fileName;
    
    // Temporarily attach, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
```

## 15. Fallback Ranking Algorithm (Local Execution)

If the AI API is unavailable, the application has a built-in fallback algorithm that extracts known technical skills from the parsed resume text to calculate a baseline mathematical ATS score locally.

```javascript
// Inside storage.js
const KNOWN_SKILLS = [
  'javascript', 'react', 'node', 'python', 'java', 'sql', 'docker' // etc.
];

const extractSkills = (text = '') => {
  const normalized = text.toLowerCase();
  return KNOWN_SKILLS.filter(skill => normalized.includes(skill));
};

const buildResumeRating = (resumeText, hasResumeFile) => {
  const text = (resumeText || '').trim();
  const skills = extractSkills(text);

  let score = 0;
  if (hasResumeFile) score += 25; // Base score for having a document
  
  // Mathematical scaling based on resume length and matched keywords
  score += Math.min(25, Math.max(0, Math.floor(text.length / 25)));
  score += Math.min(50, skills.length * 5); // 5 points per known skill

  return score;
};
```