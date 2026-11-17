# AI Model and Chatbot Notes

## AI Resume Advisor

The AI resume functionality is implemented in `src/lib/aiResumeAdvisor.js`.

It evaluates extracted resume text against available placement drives and returns structured feedback.

## AI Input

The request contains:

- Extracted resume text
- Job IDs
- Job titles
- Company names
- Job descriptions

The prompt asks the model to return valid structured JSON.

## AI Output

The normalized result contains:

```javascript
{
  rating,
  summary,
  strengths,
  improvements,
  matches
}
```

Each match contains:

```javascript
{
  jobId,
  score,
  reason
}
```

## Resume Features

The advisor can provide:

- Overall resume rating
- Resume summary
- Identified strengths
- Improvement suggestions
- Placement-drive compatibility scores
- Reasons for recommended jobs

The application validates job IDs and limits the number of displayed results before rendering the response.

## Model Configuration

The application uses OpenRouter and reads:

```text
VITE_OPENROUTER_API_KEY
VITE_OPENROUTER_MODEL
```

The selected free model is:

```text
nvidia/nemotron-3.5-super-vl:free
```

API keys must not be committed to Git. Hosted deployments need the variables configured in the hosting provider's environment settings.

## Local Fallback

If the AI service is unavailable, the application continues with local analysis from `src/lib/storage.js`.

The local fallback checks:

- Resume file presence
- Resume text length
- Known skills
- Education, experience, project, certification, and internship sections
- Overlap between resume skills and job requirements

## BUB Chatbot

The chatbot is implemented in `src/components/BubChatbot.jsx`.

BUB is a floating placement advisor available throughout the application. Students can ask about:

- Resume improvement
- Placement preparation
- Interview questions
- Career guidance
- Available job opportunities

## Chatbot Flow

```text
User opens the BUB chat window
        ↓
User enters a message
        ↓
The message is added to the conversation
        ↓
Chat history is sent to the AI service
        ↓
The response is displayed in the chat window
```

The interface includes a floating button, message bubbles, loading feedback, Enter-key submission, and error messages.

## AI Limitations

AI results depend on:

- API availability
- Free-tier rate limits
- Internet connectivity
- Quality of extracted PDF text
- Model response quality

The application should treat AI output as guidance rather than a final recruitment decision.

## Recommended Improvements

- Move AI calls to a backend server.
- Keep the API key out of the browser bundle.
- Add request rate limiting.
- Add response caching.
- Record user consent before sending resume data.
- Add a user-facing explanation of how resume data is processed.
- Add interview-question and preparation-plan features.
