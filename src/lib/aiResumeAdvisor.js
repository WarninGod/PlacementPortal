const OPENAI_ENDPOINT = 'https://api.openai.com/v1/responses';
const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    rating: { type: 'number' },
    summary: { type: 'string' },
    strengths: {
      type: 'array',
      items: { type: 'string' }
    },
    improvements: {
      type: 'array',
      items: { type: 'string' }
    },
    matches: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          jobId: { type: 'string' },
          score: { type: 'number' },
          reason: { type: 'string' }
        },
        required: ['jobId', 'score', 'reason'],
        additionalProperties: false
      }
    }
  },
  required: ['rating', 'summary', 'strengths', 'improvements', 'matches'],
  additionalProperties: false
};

const tryParseJson = (raw) => {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const extractJsonBlock = (text = '') => {
  const direct = tryParseJson(text);
  if (direct) return direct;

  const fenced = text.match(/```json\s*([\s\S]*?)```/i);
  if (fenced?.[1]) return tryParseJson(fenced[1].trim());

  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return tryParseJson(text.slice(firstBrace, lastBrace + 1));
  }

  return null;
};

const inferProvider = (apiKey, model) => {
  if (apiKey?.startsWith('sk-or-')) return 'openrouter';
  if (String(model || '').includes('/')) return 'openrouter';
  return 'openai';
};

const normalizeAiResult = (obj, jobs) => {
  const validJobIds = new Set(jobs.map(j => j.id));
  const rating = Math.max(0, Math.min(100, Number(obj?.rating || 0)));

  const matches = (obj?.matches || [])
    .filter(m => validJobIds.has(String(m.jobId)))
    .map(m => ({
      jobId: String(m.jobId),
      score: Math.max(0, Math.min(100, Number(m.score || 0))),
      reason: String(m.reason || '')
    }))
    .sort((a, b) => b.score - a.score);

  return {
    rating,
    summary: String(obj?.summary || ''),
    strengths: Array.isArray(obj?.strengths) ? obj.strengths.map(String).slice(0, 5) : [],
    improvements: Array.isArray(obj?.improvements) ? obj.improvements.map(String).slice(0, 5) : [],
    matches: matches.slice(0, 5)
  };
};

const buildPrompt = (resumeText, jobsCompact) => [
  'You are an ATS and placement mentor.',
  'Return ONLY valid JSON with fields: rating (0-100), summary, strengths[], improvements[], matches[].',
  'Each matches[] item must include: jobId, score (0-100), reason.',
  'Do not include markdown. Keep reasons concise and practical.',
  '',
  `Resume Text:\n${resumeText}`,
  '',
  `Jobs:\n${JSON.stringify(jobsCompact)}`
].join('\n');

const callOpenRouter = async ({ apiKey, model, prompt }) => {
  const response = await fetch(OPENROUTER_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://warningod.tech',
      'X-OpenRouter-Title': 'Placement Portal'
    },
    body: JSON.stringify({
      model: model || 'openai/gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a strict JSON output assistant.' },
        { role: 'user', content: prompt }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'resume_feedback',
          strict: true,
          schema: RESPONSE_SCHEMA
        }
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenRouter request failed (${response.status}): ${errText.slice(0, 200)}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content || '';

  const parsed = extractJsonBlock(content);
  if (!parsed) throw new Error('OpenRouter response could not be parsed as structured JSON.');

  return parsed;
};

const callOpenAI = async ({ apiKey, model, prompt }) => {
  const response = await fetch(OPENAI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model || 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: [{ type: 'input_text', text: 'You are a strict JSON output assistant.' }]
        },
        {
          role: 'user',
          content: [{ type: 'input_text', text: prompt }]
        }
      ],
      max_output_tokens: 900,
      text: {
        format: {
          type: 'json_schema',
          name: 'resume_feedback',
          schema: RESPONSE_SCHEMA,
          strict: true
        }
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI request failed (${response.status}): ${errText.slice(0, 200)}`);
  }

  const data = await response.json();

  const candidateObjects = [];
  if (data.output_text) candidateObjects.push(tryParseJson(data.output_text));
  if (Array.isArray(data.output)) {
    for (const item of data.output) {
      if (Array.isArray(item.content)) {
        for (const chunk of item.content) {
          if (typeof chunk.text === 'string') candidateObjects.push(tryParseJson(chunk.text));
          if (chunk.text && typeof chunk.text === 'object') candidateObjects.push(chunk.text);
        }
      }
    }
  }

  const parsed = candidateObjects.find(Boolean);
  if (!parsed) throw new Error('OpenAI response could not be parsed as structured JSON.');
  return parsed;
};

export const getAiResumeInsights = async ({ resumeText, jobs, apiKey, model }) => {
  if (!apiKey) throw new Error('Missing AI API key.');
  if (!resumeText || !resumeText.trim()) throw new Error('Resume text is empty.');

  const jobsCompact = jobs.map(job => ({
    id: job.id,
    title: job.title,
    company: job.company,
    description: job.description
  }));

  const prompt = buildPrompt(resumeText, jobsCompact);
  const provider = inferProvider(apiKey, model);
  const parsed = provider === 'openrouter'
    ? await callOpenRouter({ apiKey, model, prompt })
    : await callOpenAI({ apiKey, model, prompt });

  return normalizeAiResult(parsed, jobs);
};

const INTERVIEW_QUESTIONS_SCHEMA = {
  type: 'object',
  properties: {
    intro: { type: 'string' },
    questions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          question: { type: 'string' },
          focus: { type: 'string' }
        },
        required: ['question', 'focus'],
        additionalProperties: false
      }
    }
  },
  required: ['intro', 'questions'],
  additionalProperties: false
};

export const getAiInterviewQuestions = async ({
  apiKey,
  model,
  candidateName,
  roleTitle,
  company,
  resumeText,
  jobDescription
}) => {
  if (!apiKey) throw new Error('Missing AI API key.');

  const provider = inferProvider(apiKey, model);
  const prompt = [
    'Generate role-specific interview questions for a campus placement interview.',
    'Return ONLY valid JSON with fields: intro, questions[].',
    'questions[] must include: question, focus.',
    'Keep the questions practical and evaluative for an interviewer.',
    '',
    `Candidate: ${candidateName || 'Candidate'}`,
    `Role: ${roleTitle || 'Role'}`,
    `Company: ${company || 'Company'}`,
    `Job Description: ${jobDescription || 'N/A'}`,
    `Resume Summary: ${resumeText || 'N/A'}`
  ].join('\n');

  if (provider === 'openrouter') {
    const response = await fetch(OPENROUTER_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://warningod.tech',
        'X-OpenRouter-Title': 'Placement Portal'
      },
      body: JSON.stringify({
        model: model || 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a strict JSON output assistant.' },
          { role: 'user', content: prompt }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'interview_questions',
            strict: true,
            schema: INTERVIEW_QUESTIONS_SCHEMA
          }
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenRouter request failed (${response.status}): ${errText.slice(0, 200)}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || '';
    const parsed = extractJsonBlock(content);
    if (!parsed) throw new Error('OpenRouter response could not be parsed as structured JSON.');

    return {
      intro: String(parsed.intro || ''),
      questions: Array.isArray(parsed.questions) ? parsed.questions.slice(0, 8) : []
    };
  }

  const response = await fetch(OPENAI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model || 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: [{ type: 'input_text', text: 'You are a strict JSON output assistant.' }]
        },
        {
          role: 'user',
          content: [{ type: 'input_text', text: prompt }]
        }
      ],
      max_output_tokens: 900,
      text: {
        format: {
          type: 'json_schema',
          name: 'interview_questions',
          schema: INTERVIEW_QUESTIONS_SCHEMA,
          strict: true
        }
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI request failed (${response.status}): ${errText.slice(0, 200)}`);
  }

  const data = await response.json();
  const candidateObjects = [];
  if (data.output_text) candidateObjects.push(tryParseJson(data.output_text));
  if (Array.isArray(data.output)) {
    for (const item of data.output) {
      if (Array.isArray(item.content)) {
        for (const chunk of item.content) {
          if (typeof chunk.text === 'string') candidateObjects.push(tryParseJson(chunk.text));
          if (chunk.text && typeof chunk.text === 'object') candidateObjects.push(chunk.text);
        }
      }
    }
  }

  const parsed = candidateObjects.find(Boolean);
  if (!parsed) throw new Error('OpenAI response could not be parsed as structured JSON.');

  return {
    intro: String(parsed.intro || ''),
    questions: Array.isArray(parsed.questions) ? parsed.questions.slice(0, 8) : []
  };
};