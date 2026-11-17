# AI Model and Chatbot Documentation

## 1. Introduction

The Placement Portal includes an AI assistance layer that supports students during the placement process.

The AI functionality is implemented in:

```text
src/lib/aiResumeAdvisor.js
```

The user-facing chatbot is implemented in:

```text
src/components/BubChatbot.jsx
```

The AI layer currently provides three capabilities:

1. Resume insights and job matching.
2. Role-specific interview-question generation.
3. BUB, a conversational placement advisor.

The application uses OpenRouter as the active AI gateway and supports an OpenAI-compatible fallback path in the client helper.

## 2. AI Features Overview

```text
Student uploads resume
        ↓
PDF text is extracted
        ↓
Local resume analysis runs
        ↓
AI resume analysis is requested
        ↓
Rating, strengths, improvements, and job matches are shown
```

The chatbot follows a separate flow:

```text
Student opens BUB
        ↓
Student sends a question
        ↓
Conversation history is combined with the new message
        ↓
The AI provider generates a response
        ↓
BUB displays the response
```

## 3. AI Provider and Model

The application sends AI requests through OpenRouter:

```text
https://openrouter.ai/api/v1/chat/completions
```

The configured free model is:

```text
nvidia/nemotron-3.5-super-vl:free
```

The model is selected through:

```text
VITE_OPENROUTER_MODEL
```

The provider credential is read from:

```text
VITE_OPENROUTER_API_KEY
```

The model value is passed into resume analysis and can also be passed into interview and chatbot calls.

## 4. Environment Configuration

### Local Development

Local development uses an ignored `.env.local` file:

```text
VITE_OPENROUTER_API_KEY=<local secret>
VITE_OPENROUTER_MODEL=nvidia/nemotron-3.5-super-vl:free
```

The actual key must never be written in project documentation or committed to Git.

### Hosted Deployment

For Vercel or another hosting provider:

1. Open the project environment-variable settings.
2. Add `VITE_OPENROUTER_API_KEY`.
3. Add `VITE_OPENROUTER_MODEL`.
4. Enable the variables for the target deployment environment.
5. Redeploy the application.

Vite embeds `VITE_` variables during the build. Updating a hosting variable without rebuilding does not update an already-published bundle.

## 5. Resume Insight Feature

The resume insight function is:

```javascript
getAiResumeInsights({
  resumeText,
  jobs,
  apiKey,
  model
})
```

It requires:

- A valid AI API key
- Non-empty resume text
- The current list of placement drives

If the key is missing, the function throws a clear error. If the resume text is empty, the function also stops before making a provider request.

## 6. Resume Insight Input

The application creates a compact representation of available jobs:

```javascript
{
  id,
  title,
  company,
  description
}
```

The AI prompt contains:

- Instructions to act as an ATS and placement mentor
- Extracted resume text
- Placement-drive information
- Required output fields
- Score ranges
- Instructions to return JSON

The prompt asks for practical and concise recommendations rather than unrestricted prose.

## 7. Resume Insight Prompt Design

The prompt requires the model to return:

```text
rating
summary
strengths[]
improvements[]
matches[]
```

Each match must contain:

```text
jobId
score
reason
```

The model is instructed not to include Markdown around the result. The application nevertheless includes parsing logic for direct JSON, fenced JSON, and JSON embedded inside additional text.

## 8. Resume Insight Response Schema

The structured schema describes:

```javascript
{
  rating: number,
  summary: string,
  strengths: string[],
  improvements: string[],
  matches: [
    {
      jobId: string,
      score: number,
      reason: string
    }
  ]
}
```

The OpenRouter request uses a strict JSON-schema response format where supported.

## 9. Resume Insight Response Processing

The response-processing pipeline is:

```text
Receive provider response
        ↓
Read assistant message content
        ↓
Try direct JSON parsing
        ↓
Try fenced JSON parsing
        ↓
Try extracting the first complete JSON object
        ↓
Reject if no object can be parsed
        ↓
Normalize values
        ↓
Return safe application data
```

This prevents minor formatting differences from breaking the dashboard.

## 10. AI Result Normalization

The normalizer:

- Clamps the overall rating between 0 and 100.
- Converts returned job IDs to strings.
- Removes matches for unknown jobs.
- Clamps match scores between 0 and 100.
- Converts reasons to strings.
- Sorts matches from highest to lowest score.
- Limits matches to five.
- Limits strengths to five.
- Limits improvements to five.

The frontend displays only normalized data.

## 11. Resume Insight Display

The student dashboard displays:

- AI loading state
- Resume score
- AI summary
- Strengths
- Improvements
- Job matching data through drive ordering and match labels

When AI results are saved, they are also stored in the user's `aiFeedback` record so they can be available during later dashboard loads.

## 12. Resume Upload and AI Flow

The complete upload-to-AI process is:

```text
User selects resume
        ↓
File size is checked
        ↓
File is converted to Base64
        ↓
Resume is saved
        ↓
Previous AI feedback is cleared
        ↓
PDF text is extracted when applicable
        ↓
Extracted text is stored
        ↓
Local feedback is calculated
        ↓
API key is resolved
        ↓
AI analysis is requested
        ↓
Normalized result is stored
        ↓
The dashboard displays updated feedback
```

AI analysis is attempted only when both resume text and a key are available.

## 13. Local Fallback Analysis

AI is optional. If the provider is unavailable, the application continues with local feedback.

The local fallback checks:

- Whether a resume file exists
- Resume text length
- Known technical skills
- Important resume sections
- Overlap between resume skills and drive requirements

The fallback can detect sections such as:

```text
Education
Experience
Projects
Certifications
Internships
```

When the provider fails, the user sees:

```text
AI analysis is currently unavailable. Showing local resume feedback instead.
```

This ensures that an AI outage does not make the entire resume feature unusable.

## 14. AI Error Conditions

Possible errors include:

- Missing API key
- Empty resume text
- Invalid credentials
- Provider rate limit
- Insufficient provider credits
- Unauthorized key
- Unsupported model
- Network failure
- Provider server error
- Empty provider response
- Invalid JSON
- Unsupported response format

The AI helper throws errors instead of returning a fake success result. The dashboard logs the technical failure and shows a user-friendly fallback message.

## 15. Interview-Question Generation

The AI helper also supports:

```javascript
getAiInterviewQuestions({
  apiKey,
  model,
  candidateName,
  roleTitle,
  company,
  resumeText,
  jobDescription
})
```

This feature generates role-specific campus-placement questions.

The request uses:

- Candidate name
- Target role
- Company
- Job description
- Resume summary or extracted text

## 16. Interview-Question Output

The expected structured response is:

```javascript
{
  intro: string,
  questions: [
    {
      question: string,
      focus: string
    }
  ]
}
```

The `focus` field explains what the interviewer is evaluating, such as:

- Technical understanding
- Problem-solving ability
- Communication
- Project ownership
- Role-specific knowledge

The application limits the returned list to eight questions.

## 17. BUB Chatbot

BUB is the floating AI advisor for the Placement Portal.

It is rendered at the application level in `App.jsx`, so the chat button is available across public and protected pages.

The chatbot is designed to help students with:

- Resume improvement
- Placement preparation
- Interview preparation
- Career guidance
- Job-drive questions
- General placement advice

## 18. BUB User Interface

The BUB component includes:

- Floating circular open button
- Expandable chat panel
- Header with BUB branding
- Close button
- Scrollable conversation area
- User message bubbles
- Assistant message bubbles
- Text input
- Send button
- Disabled send state
- Typing/loading indicator

The UI uses local React state and does not currently persist chat history after a page refresh.

## 19. BUB Conversation State

The component maintains:

```javascript
isOpen
messages
input
isLoading
messagesEndRef
```

### `isOpen`

Controls whether the floating panel is visible.

### `messages`

Contains assistant and user messages displayed in the conversation.

### `input`

Contains the current unsent message.

### `isLoading`

Prevents duplicate requests and displays the typing indicator.

### `messagesEndRef`

Allows the conversation area to scroll to the latest message.

## 20. BUB Message Flow

When the user sends a message:

```text
Trim input
        ↓
Ignore empty input
        ↓
Clear input field
        ↓
Append user message to state
        ↓
Set loading state
        ↓
Resolve AI API key
        ↓
Build message history
        ↓
Call getBubChatResponse()
        ↓
Append assistant response
        ↓
Clear loading state
```

The user can submit by clicking Send or pressing Enter.

## 21. BUB System Prompt

BUB is given a system prompt defining it as:

- A friendly placement advisor
- A resume-support assistant
- An interview-preparation assistant
- A source of placement-drive guidance

The prompt also asks BUB to keep responses brief, engaging, and professional.

The system prompt is sent before the conversation history so that the assistant receives its role instructions on every request.

## 22. BUB Request Payload

The chatbot creates a request message list:

```text
System instruction
        +
Previous conversation messages
        +
Current user message
```

For OpenRouter, this is sent as `messages` to the chat-completions endpoint.

The returned assistant text is appended directly to the conversation display.

## 23. Provider Selection

The helper determines the provider using:

```text
An OpenRouter-style key prefix
or
A model name containing a slash
```

When OpenRouter is selected:

```text
POST /api/v1/chat/completions
```

When the OpenAI-compatible path is selected, the helper uses:

```text
POST https://api.openai.com/v1/responses
```

This provider abstraction allows the project to support more than one API style, although the current deployment uses OpenRouter.

## 24. API Request Headers

OpenRouter requests include:

```text
Authorization: Bearer <secret>
Content-Type: application/json
HTTP-Referer: https://warningod.tech
X-OpenRouter-Title: Placement Portal
```

The secret value must come from environment configuration and must never be written in source code or documentation.

## 25. AI API Key Resolution

The frontend currently checks:

```text
VITE_OPENROUTER_API_KEY
VITE_OPENAI_API_KEY
placement_openrouter_api_key in localStorage
placement_ai_api_key in localStorage
```

The first available value is used.

This is convenient for a demonstration but is not secure for production because values in a browser bundle or localStorage can be inspected by the user.

## 26. AI Privacy Considerations

Resume text may contain:

- Name
- Contact details
- Education history
- Work history
- Skills
- Project information

Before using a hosted AI provider in a real system, the application should:

- Ask for user consent.
- Explain what information is sent.
- Minimize unnecessary personal data.
- Remove contact details before analysis where possible.
- Avoid logging full resume content.
- Provide deletion controls.
- Document provider data handling.

## 27. Security Limitations

The current AI implementation runs in the browser. This means:

- The API key can be discovered in the built client bundle.
- Users can inspect requests in browser developer tools.
- Users can call the provider directly with the exposed key.
- Usage limits can be consumed by unauthorized visitors.
- There is no server-side per-user quota.

The current approach is acceptable only for a controlled academic demonstration.

## 28. Recommended Secure AI Architecture

The production architecture should be:

```text
React frontend
        ↓
POST /api/ai/resume-analysis
        ↓
Backend validates user and request
        ↓
Backend retrieves secret from server environment
        ↓
Backend calls OpenRouter
        ↓
Backend validates and normalizes response
        ↓
Frontend receives safe result
```

The chatbot should use a similar endpoint:

```text
POST /api/ai/chat
```

The provider key would never be sent to the browser.

## 29. AI Request Validation

A production backend should validate:

- Authenticated user
- User role
- Resume ownership
- Resume text length
- Number of jobs included
- Chat message length
- Maximum conversation history
- Allowed model selection
- Request frequency

This prevents abuse and controls cost.

## 30. Rate Limiting and Quotas

Recommended controls include:

- Per-user requests per minute
- Per-user requests per day
- Separate chatbot and resume-analysis quotas
- Maximum resume text size
- Maximum chat history size
- Provider timeout
- Retry policy with a strict limit
- Usage logging without sensitive content

Free models can have variable availability and rate limits, so the interface should continue supporting local fallback behavior.

## 31. Response Safety

AI output should not automatically make final recruitment decisions.

The application should treat AI output as:

- Guidance
- A recommendation
- A draft assessment
- A preparation aid

Administrators should retain human review authority over shortlist and rejection decisions.

The application should also protect against:

- Prompt injection inside resume text
- Malicious instructions embedded in job descriptions
- Unsupported claims
- Biased recommendations
- Hallucinated qualifications

## 32. Prompt Injection Considerations

Resume text is untrusted input. A malicious resume could contain instructions such as “ignore previous instructions.”

A stronger implementation should:

- Clearly delimit resume content.
- Tell the model to treat resume and job data as untrusted text.
- Never execute model-generated code.
- Validate all IDs against application data.
- Avoid allowing model output to change application status.

## 33. Model Output Quality

Quality depends on:

- Completeness of the extracted resume text
- Formatting of the original PDF
- Accuracy of job descriptions
- Model availability
- Model reasoning quality
- Prompt clarity
- Response-token limits

Image-only PDFs may require OCR before the model can analyze them effectively.

## 34. Local and AI Score Relationship

The application has two analysis paths:

### Local Analysis

- Deterministic
- Fast
- Works offline
- Uses known skills and section signals
- Does not require an API key

### AI Analysis

- More flexible
- Can summarize context
- Can provide natural-language improvements
- Can compare role requirements semantically
- Requires network access and provider availability

Local feedback is the reliability fallback, while AI feedback adds richer guidance.

## 35. Testing Plan

### Resume Analysis Tests

Test:

- Valid text-based PDF
- Empty PDF
- Scanned image-only PDF
- Resume with many known skills
- Resume with no recognized skills
- Missing API key
- Invalid API key
- Provider rate limit
- Malformed model response
- Unknown job IDs in model output

### Interview Generation Tests

Test:

- Valid role and resume
- Missing candidate details
- Long job description
- Empty model output
- More than eight generated questions

### Chatbot Tests

Test:

- Opening and closing BUB
- Empty message submission
- Enter-key submission
- Loading state
- Provider success
- Provider failure
- Missing API key
- Long conversation history
- Mobile layout

## 36. Demonstration Flow

For a college project demonstration:

1. Log in as a student.
2. Open the student dashboard.
3. Upload a text-based PDF resume.
4. Show local resume feedback.
5. Show AI rating and improvements.
6. Show recommended placement drives.
7. Open BUB.
8. Ask an interview-preparation question.
9. Log out.
10. Log in as admin.
11. Review an application.
12. Update its status.
13. Return to the student account and show the updated status.

## 37. Viva Explanation

If asked how AI is used, explain:

> The system extracts text from PDF resumes using PDF.js and sends the extracted text along with placement-drive information to an OpenRouter-hosted language model. The model returns structured resume feedback containing a rating, summary, strengths, improvements, and job matches. The response is parsed and normalized before it is displayed. If the AI service is unavailable, a deterministic local analysis continues to provide basic resume scoring and recommendations.

If asked how the chatbot works, explain:

> BUB is a React chat component that stores the visible conversation in component state. When a user sends a message, the application combines the system prompt, conversation history, and new message, then sends them to the configured AI provider. The returned assistant text is appended to the chat. The interface provides loading and error states.

## 38. Future AI Features

Potential improvements include:

- Job-specific resume rewriting
- Keyword-gap analysis
- Interview question generation in the student dashboard
- Mock interview mode
- Answer evaluation
- Personalized study plans
- Skill-roadmap generation
- Multilingual assistance
- Voice interaction
- OCR for scanned resumes
- Resume version comparison
- AI explanation of job-match scores
- Admin analytics for common skill gaps

## 39. Responsible AI Improvements

The project can be improved by:

- Adding a consent checkbox before AI processing.
- Showing a notice that AI results are advisory.
- Allowing users to delete stored feedback.
- Displaying the factors behind recommendations.
- Monitoring unequal outcomes across groups.
- Avoiding automatic rejection based only on AI scores.
- Providing a human-review workflow.

## 40. Conclusion

The AI layer adds intelligent assistance to the Placement Portal without removing the deterministic fallback. Resume analysis provides structured feedback and job matching, interview generation supports placement preparation, and BUB offers conversational guidance.

The most important production improvement is to move all AI requests to a secure backend. This would protect provider credentials, enable rate limiting, centralize consent and logging, and allow the institution to control how resume data is processed.
