// Simulated generic delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to interact with localStorage
const getStorageItem = (key, defaultVal = []) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultVal;
};

const setStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Keys
const USERS_KEY = 'placement_users';
const JOBS_KEY = 'placement_jobs';
const APPS_KEY = 'placement_applications';

const DEMO_ADMIN = { email: 'a@a.com', password: 'a' };
const DEMO_STUDENT = { email: 's@s.com', password: 's' };

const KNOWN_SKILLS = [
  'javascript', 'typescript', 'react', 'node', 'express', 'python', 'java', 'c++',
  'sql', 'mongodb', 'postgresql', 'mysql', 'html', 'css', 'tailwind', 'docker',
  'kubernetes', 'aws', 'azure', 'git', 'data analysis', 'machine learning',
  'power bi', 'excel', 'tableau', 'rest api', 'testing', 'communication',
  'problem solving', 'leadership'
];

const DEFAULT_JOBS = [
  { id: 'j1', title: 'Software Engineer', company: 'Google', description: 'Backend and frontend development using modern web technologies.', salary: '30 LPA', deadline: '2026-05-01' },
  { id: 'j2', title: 'Data Analyst', company: 'Amazon', description: 'Analyzing big data to extract meaningful business insights.', salary: '20 LPA', deadline: '2026-06-15' },
  { id: 'j3', title: 'Frontend Developer', company: 'Adobe', description: 'Build responsive user interfaces using React, JavaScript, and CSS frameworks.', salary: '14 LPA', deadline: '2026-05-22' },
  { id: 'j4', title: 'Backend Developer', company: 'Paytm', description: 'Develop APIs and microservices with Node.js, databases, and cloud deployment.', salary: '13 LPA', deadline: '2026-05-28' },
  { id: 'j5', title: 'Business Analyst', company: 'Deloitte', description: 'Translate business requirements into data-backed product and process improvements.', salary: '11 LPA', deadline: '2026-06-05' },
  { id: 'j6', title: 'Product Analyst', company: 'Flipkart', description: 'Track product metrics, run experiments, and support growth decisions.', salary: '12 LPA', deadline: '2026-06-10' },
  { id: 'j7', title: 'Marketing Associate', company: 'Zomato', description: 'Plan digital campaigns, analyze conversion funnels, and optimize acquisition.', salary: '9 LPA', deadline: '2026-06-14' },
  { id: 'j8', title: 'HR Operations Trainee', company: 'Infosys', description: 'Support recruitment workflows, onboarding process, and employee engagement initiatives.', salary: '6.5 LPA', deadline: '2026-06-20' },
  { id: 'j9', title: 'Sales Operations Analyst', company: 'BYJU\'S', description: 'Build dashboards, forecast pipeline, and optimize inside-sales performance.', salary: '8.5 LPA', deadline: '2026-06-24' },
  { id: 'j10', title: 'DevOps Engineer', company: 'Microsoft', description: 'Automate CI/CD pipelines and manage cloud infrastructure using Docker and Kubernetes.', salary: '18 LPA', deadline: '2026-06-30' },
  { id: 'j11', title: 'Cybersecurity Analyst', company: 'TCS', description: 'Monitor security alerts, assess vulnerabilities, and support incident response.', salary: '10 LPA', deadline: '2026-07-04' },
  { id: 'j12', title: 'Financial Analyst', company: 'Goldman Sachs', description: 'Perform financial modeling, variance analysis, and reporting for business units.', salary: '15 LPA', deadline: '2026-07-08' }
];

// ----------------------
// INITIAL DATA SEEDING
// ----------------------
export const initializeStorageData = () => {
  if (getStorageItem(USERS_KEY).length === 0) {
    // Seed an admin and student
    setStorageItem(USERS_KEY, [
      { id: 'u1', name: 'Admin TPO', email: DEMO_ADMIN.email, password: DEMO_ADMIN.password, role: 'admin' },
      { id: 'u2', name: 'Student One', email: DEMO_STUDENT.email, password: DEMO_STUDENT.password, role: 'student', resume: null, resumeText: '' }
    ]);
  } else {
    // Keep existing data, but ensure seeded demo accounts use short credentials.
    const users = getStorageItem(USERS_KEY);
    const updatedUsers = users.map(u => {
      if (u.id === 'u1' && u.role === 'admin') {
        return { ...u, email: DEMO_ADMIN.email, password: DEMO_ADMIN.password };
      }
      if (u.id === 'u2' && u.role === 'student') {
        return { ...u, email: DEMO_STUDENT.email, password: DEMO_STUDENT.password };
      }
      return u;
    });
    setStorageItem(USERS_KEY, updatedUsers);
  }
  
  const existingJobs = getStorageItem(JOBS_KEY);
  if (existingJobs.length === 0) {
    setStorageItem(JOBS_KEY, DEFAULT_JOBS);
  } else {
    const existingIds = new Set(existingJobs.map(job => job.id));
    const missingDefaults = DEFAULT_JOBS.filter(job => !existingIds.has(job.id));
    if (missingDefaults.length > 0) {
      setStorageItem(JOBS_KEY, [...existingJobs, ...missingDefaults]);
    }
  }

  if (getStorageItem(APPS_KEY).length === 0) {
    setStorageItem(APPS_KEY, []);
  }
};

// ----------------------
// USER (AUTH) APIS
// ----------------------
export const apiLogin = async (email, password) => {
  await delay();
  const users = getStorageItem(USERS_KEY);
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error("Invalid credentials");
  // Don't return password
  const { password: _, ...safeUser } = user;
  return safeUser;
};

export const apiRegisterStudent = async (name, email, password) => {
  await delay();
  const users = getStorageItem(USERS_KEY);
  if (users.find(u => u.email === email)) throw new Error("User already exists");
  
  const newUser = { id: Date.now().toString(), name, email, password, role: 'student', resume: null, resumeText: '' };
  setStorageItem(USERS_KEY, [...users, newUser]);
  
  const { password: _, ...safeUser } = newUser;
  return safeUser;
};

export const apiUpdateUserResume = async (userId, base64Resume) => {
  await delay();
  const users = getStorageItem(USERS_KEY);
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) throw new Error("User not found");
  
  users[userIndex].resume = base64Resume;
  setStorageItem(USERS_KEY, users);
  
  const { password: _, ...safeUser } = users[userIndex];
  return safeUser;
};

export const apiUpdateUserResumeText = async (userId, resumeText) => {
  await delay();
  const users = getStorageItem(USERS_KEY);
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) throw new Error('User not found');

  users[userIndex].resumeText = resumeText;
  setStorageItem(USERS_KEY, users);

  const { password: _, ...safeUser } = users[userIndex];
  return safeUser;
};

export const apiUpdateUserAIFeedback = async (userId, aiFeedback) => {
  await delay();
  const users = getStorageItem(USERS_KEY);
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) throw new Error('User not found');

  users[userIndex].aiFeedback = aiFeedback;
  setStorageItem(USERS_KEY, users);

  const { password: _, ...safeUser } = users[userIndex];
  return safeUser;
};

const extractSkills = (text = '') => {
  const normalized = text.toLowerCase();
  return KNOWN_SKILLS.filter(skill => normalized.includes(skill));
};

const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

const buildResumeRating = (resumeText, hasResumeFile) => {
  const text = (resumeText || '').trim();
  const skills = extractSkills(text);

  let score = 0;
  if (hasResumeFile) score += 25;
  score += clamp(Math.floor(text.length / 25), 0, 25);
  score += clamp(skills.length * 4, 0, 30);

  const sectionSignals = ['project', 'experience', 'education', 'certification', 'intern'];
  const foundSections = sectionSignals.filter(s => text.toLowerCase().includes(s));
  score += clamp(foundSections.length * 4, 0, 20);

  const finalScore = clamp(score, 0, 100);

  let label = 'Needs Work';
  if (finalScore >= 80) label = 'Excellent';
  else if (finalScore >= 65) label = 'Good';
  else if (finalScore >= 45) label = 'Average';

  return { score: finalScore, label, skills, foundSections };
};

const buildJobMatches = (resumeSkills, jobs) => {
  return jobs
    .map(job => {
      const jobText = `${job.title} ${job.description} ${job.company}`.toLowerCase();
      const jobSkills = KNOWN_SKILLS.filter(skill => jobText.includes(skill));
      const matched = jobSkills.filter(skill => resumeSkills.includes(skill));
      const score = clamp(Math.round((matched.length / Math.max(jobSkills.length, 1)) * 100), 0, 100);

      return {
        jobId: job.id,
        title: job.title,
        company: job.company,
        score,
        matchedSkills: matched,
        jobSkills
      };
    })
    .sort((a, b) => b.score - a.score);
};

export const apiGetResumeFeedback = async (studentId) => {
  await delay();
  const users = getStorageItem(USERS_KEY);
  const jobs = getStorageItem(JOBS_KEY);
  const student = users.find(u => u.id === studentId && u.role === 'student');
  if (!student) throw new Error('Student not found');

  const rating = buildResumeRating(student.resumeText || '', Boolean(student.resume));
  const matches = buildJobMatches(rating.skills, jobs);

  const suggestions = [];
  if (!student.resume) suggestions.push('Upload a resume file to improve profile completeness.');
  if ((student.resumeText || '').trim().length < 120) suggestions.push('Add more resume content such as projects, internships, and achievements.');
  if (rating.foundSections.length < 3) suggestions.push('Include clear sections: Education, Experience, Projects, and Certifications.');
  if (rating.skills.length < 6) suggestions.push('Add more role-relevant technical skills and tools.');
  if (matches[0] && matches[0].score < 40) suggestions.push('Tailor resume keywords to match placement drive requirements.');

  const strongestAreas = [
    rating.skills.length >= 6 ? 'Strong skill coverage detected.' : null,
    rating.foundSections.length >= 3 ? 'Good resume structure with important sections.' : null,
    matches[0] && matches[0].score >= 60 ? `High alignment with ${matches[0].company} ${matches[0].title}.` : null
  ].filter(Boolean);

  return {
    rating: rating.score,
    ratingLabel: rating.label,
    extractedSkills: rating.skills,
    strongestAreas,
    suggestions,
    topMatches: matches.slice(0, 5)
  };
};


// ----------------------
// JOB APIS
// ----------------------
export const apiGetJobs = async () => {
  await delay();
  return getStorageItem(JOBS_KEY);
};

export const apiCreateJob = async (jobDetails) => {
  await delay();
  const jobs = getStorageItem(JOBS_KEY);
  const newJob = { id: Date.now().toString(), ...jobDetails };
  setStorageItem(JOBS_KEY, [...jobs, newJob]);
  return newJob;
};

// ----------------------
// APPLICATION APIS
// ----------------------
export const apiApplyForJob = async (studentId, jobId, resumeBase64) => {
  await delay();
  const applications = getStorageItem(APPS_KEY);
  
  // check if already applied
  if (applications.find(a => a.studentId === studentId && a.jobId === jobId)) {
    throw new Error("Already applied for this job.");
  }
  
  const newApp = { 
    id: Date.now().toString(),
    studentId, 
    jobId, 
    resume: resumeBase64,
    status: 'pending', // pending | shortlisted | rejected
    appliedAt: new Date().toISOString()
  };
  
  setStorageItem(APPS_KEY, [...applications, newApp]);
  return newApp;
};

export const apiGetApplicationsForStudent = async (studentId) => {
  await delay();
  const applications = getStorageItem(APPS_KEY);
  return applications.filter(a => a.studentId === studentId);
};

export const apiGetAllApplications = async () => {
  await delay();
  const applications = getStorageItem(APPS_KEY);
  const users = getStorageItem(USERS_KEY);
  const jobs = getStorageItem(JOBS_KEY);
  
  // Hydrate with user and job info for the admin
  return applications.map(app => {
    const student = users.find(u => u.id === app.studentId);
    const job = jobs.find(j => j.id === app.jobId);
    return {
      ...app,
      studentName: student?.name,
      studentEmail: student?.email,
      studentResumeText: student?.resumeText || '',
      jobTitle: job?.title,
      jobCompany: job?.company,
      jobDescription: job?.description || ''
    };
  });
};

export const apiUpdateApplicationStatus = async (applicationId, status) => {
  await delay();
  const applications = getStorageItem(APPS_KEY);
  const appIndex = applications.findIndex(a => a.id === applicationId);
  if (appIndex === -1) throw new Error("Application not found");
  
  applications[appIndex].status = status;
  setStorageItem(APPS_KEY, applications);
  return applications[appIndex];
};
