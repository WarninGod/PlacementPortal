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

// ----------------------
// INITIAL DATA SEEDING
// ----------------------
export const initializeStorageData = () => {
  if (getStorageItem(USERS_KEY).length === 0) {
    // Seed an admin and student
    setStorageItem(USERS_KEY, [
      { id: 'u1', name: 'Admin TPO', email: 'admin@college.edu', password: 'password123', role: 'admin' },
      { id: 'u2', name: 'Student One', email: 'student1@college.edu', password: 'password123', role: 'student', resume: null }
    ]);
  }
  
  if (getStorageItem(JOBS_KEY).length === 0) {
    setStorageItem(JOBS_KEY, [
      { id: 'j1', title: 'Software Engineer', company: 'Google', description: 'Backend and frontend development using modern web technologies.', salary: '30 LPA', deadline: '2026-05-01' },
      { id: 'j2', title: 'Data Analyst', company: 'Amazon', description: 'Analyzing big data to extract meaningful business insights.', salary: '20 LPA', deadline: '2026-06-15' }
    ]);
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
  
  const newUser = { id: Date.now().toString(), name, email, password, role: 'student', resume: null };
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
      jobTitle: job?.title,
      jobCompany: job?.company
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
