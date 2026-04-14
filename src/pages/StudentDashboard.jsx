import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiGetJobs, apiApplyForJob, apiGetApplicationsForStudent, apiUpdateUserResume, apiUpdateUserResumeText, apiGetResumeFeedback } from '../lib/storage';
import { LogOut, Upload, Briefcase, FileText, CheckCircle, Sparkles } from 'lucide-react';
import { getAiResumeInsights } from '../lib/aiResumeAdvisor';

export default function StudentDashboard() {
    const { user, logout, updateUserInContext } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [myApps, setMyApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [resumeFeedback, setResumeFeedback] = useState(null);
    const [aiFeedback, setAiFeedback] = useState(null);

    useEffect(() => {
        loadData();
    }, [user.id]);

    const loadData = async () => {
        try {
            const [j, a, feedback] = await Promise.all([
                apiGetJobs(),
                apiGetApplicationsForStudent(user.id),
                apiGetResumeFeedback(user.id)
            ]);
            setJobs(j);
            setMyApps(a);
            setResumeFeedback(feedback);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            setError("File is too large. Max 2MB.");
            return;
        }

        setUploading(true);
        setError('');

        try {
            const base64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            const updatedUser = await apiUpdateUserResume(user.id, base64);
            const contextUpdates = { resume: updatedUser.resume };

            let extractedResumeText = user.resumeText || '';
            if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
                const { extractTextFromPdfFile } = await import('../lib/resumeParser');
                const parsedText = await extractTextFromPdfFile(file);
                if (parsedText) {
                    extractedResumeText = parsedText;
                    await apiUpdateUserResumeText(user.id, parsedText);
                    contextUpdates.resumeText = parsedText;
                }
            }

            updateUserInContext(contextUpdates);
            const feedback = await apiGetResumeFeedback(user.id);
            setResumeFeedback(feedback);

            const key = import.meta.env.VITE_OPENROUTER_API_KEY
                || import.meta.env.VITE_OPENAI_API_KEY
                || localStorage.getItem('placement_openrouter_api_key')
                || localStorage.getItem('placement_ai_api_key')
                || '';
            if (extractedResumeText && key) {
                try {
                    setAiLoading(true);
                    const insights = await getAiResumeInsights({
                        resumeText: extractedResumeText,
                        jobs,
                        apiKey: key
                    });
                    setAiFeedback(insights);
                } catch {
                    // Keep local analysis as fallback.
                } finally {
                    setAiLoading(false);
                }
            }

            const hasAutoExtraction = Boolean(extractedResumeText && extractedResumeText.trim().length > 0);
            setSuccess(hasAutoExtraction ? 'Resume uploaded and analyzed automatically.' : 'Resume uploaded. Use a text-based PDF for automatic analysis.');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message || 'Failed to process resume.');
        } finally {
            setUploading(false);
        }
    };

    const applyToJob = async (jobId) => {
        if (!user.resume) {
            setError("Please upload your resume first before applying.");
            return;
        }
        try {
            await apiApplyForJob(user.id, jobId, user.resume);
            setSuccess('Applied successfully!');
            setTimeout(() => setSuccess(''), 3000);
            loadData(); // reload applications
        } catch (err) {
            setError(err.message);
            setTimeout(() => setError(''), 3000);
        }
    };

    const hasApplied = (jobId) => myApps.some(a => a.jobId === jobId);
    const displayRating = aiFeedback?.rating ?? resumeFeedback?.rating;
    const displayRatingLabel = aiFeedback ? 'AI Rated' : resumeFeedback?.ratingLabel;
    const scoreByJob = new Map(
        (aiFeedback?.matches?.length
            ? aiFeedback.matches
            : (resumeFeedback?.topMatches || [])
        ).map(match => [match.jobId, match.score])
    );
    const sortedJobs = [...jobs].sort((a, b) => (scoreByJob.get(b.id) || 0) - (scoreByJob.get(a.id) || 0));
    const matchedJobs = sortedJobs.filter(job => (scoreByJob.get(job.id) || 0) > 0);
    const otherJobs = sortedJobs.filter(job => (scoreByJob.get(job.id) || 0) <= 0);

    if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading Dashboard...</div>;

    return (
        <div className="container slideUp" style={{ padding: '1.5rem' }}>
            <header className="header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h1>Welcome, {user.name}</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Student Dashboard • Placement Portal</p>
                </div>
                <button onClick={logout} className="btn btn-outline" style={{ borderRadius: 'var(--radius-sm)' }}>
                    <LogOut size={18} /> Logout
                </button>
            </header>

            {error && <div style={{ padding: '1rem', background: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>{error}</div>}
            {success && <div style={{ padding: '1rem', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>{success}</div>}

            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '2rem' }}>

                {/* Main Job Board */}
                <div>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Briefcase size={22} className="text-primary" /> Available Drives</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {sortedJobs.length === 0 ? <p>No placement drives currently available.</p> : (
                            <>
                                {matchedJobs.length > 0 && (
                                    <>
                                        <h3 style={{ marginTop: '0.25rem', marginBottom: '0.25rem', color: '#0f766e', letterSpacing: '0.03em' }}>DRIVES FOR YOU</h3>
                                        {matchedJobs.map(job => {
                                            const jobScore = scoreByJob.get(job.id) || 0;
                                            return (
                                            <div
                                                key={job.id}
                                                className="glass-panel"
                                                style={{
                                                    padding: '1.5rem',
                                                    border: '2px solid rgba(20, 184, 166, 0.45)',
                                                    boxShadow: '0 0 0 1px rgba(20, 184, 166, 0.18), 0 0 24px rgba(45, 212, 191, 0.35)',
                                                    background: 'linear-gradient(135deg, rgba(240,253,250,0.95), rgba(255,255,255,0.92))'
                                                }}
                                            >
                                <div className="job-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div>
                                        <h3 style={{ color: 'var(--primary-hover)', marginBottom: '0.25rem' }}>{job.title}</h3>
                                        <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>{job.company}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                        {scoreByJob.has(job.id) && (
                                            <span className="badge" style={{ background: '#ecfeff', color: '#0e7490' }}>
                                                Match {jobScore}%
                                            </span>
                                        )}
                                        <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)', whiteSpace: 'nowrap' }}>{job.salary}</span>
                                    </div>
                                </div>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{job.description}</p>
                                <div className="job-card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>

                                    {hasApplied(job.id) ? (
                                        <button className="btn btn-secondary" disabled style={{ opacity: 0.7 }}>
                                            <CheckCircle size={18} /> Applied
                                        </button>
                                    ) : (
                                        <button className="btn btn-primary" onClick={() => applyToJob(job.id)}>
                                            Apply Now
                                        </button>
                                    )}
                                </div>
                            </div>
                                            )})}
                                    </>
                                )}

                                {otherJobs.length > 0 && otherJobs.map(job => (
                                    <div key={job.id} className="glass-panel" style={{ padding: '1.5rem' }}>
                                <div className="job-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div>
                                        <h3 style={{ color: 'var(--primary-hover)', marginBottom: '0.25rem' }}>{job.title}</h3>
                                        <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>{job.company}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                        <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)', whiteSpace: 'nowrap' }}>{job.salary}</span>
                                    </div>
                                </div>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{job.description}</p>
                                <div className="job-card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>

                                    {hasApplied(job.id) ? (
                                        <button className="btn btn-secondary" disabled style={{ opacity: 0.7 }}>
                                            <CheckCircle size={18} /> Applied
                                        </button>
                                    ) : (
                                        <button className="btn btn-primary" onClick={() => applyToJob(job.id)}>
                                            Apply Now
                                        </button>
                                    )}
                                </div>
                            </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div>
                    {/* Resume Card */}
                    <div className="resume-card glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', background: 'var(--primary-light)', color: 'var(--primary)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                            <FileText size={32} />
                        </div>
                        <h3>Your Resume</h3>

                        {user.resume ? (
                            <p style={{ color: 'var(--success)', fontWeight: '600', marginBottom: '1rem' }}>✓ Uploaded</p>
                        ) : (
                            <p style={{ color: 'var(--warning)', fontWeight: '600', marginBottom: '1rem' }}>⚠ Not Uploaded</p>
                        )}

                        <label className="btn btn-outline" style={{ width: '100%', cursor: 'pointer' }}>
                            <Upload size={18} /> {uploading ? 'Uploading...' : 'Update Resume'}
                            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} style={{ display: 'none' }} disabled={uploading} />
                        </label>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>PDF recommended for automatic text extraction, max 2MB</p>
                    </div>

                    <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <Sparkles size={18} /> Resume Insights
                        </h3>

                        {aiLoading && (
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>Running AI analysis...</p>
                        )}

                        {(resumeFeedback || aiFeedback) && (
                            <div style={{ marginTop: '1rem' }}>
                                <div style={{ padding: '0.75rem', borderRadius: '0.5rem', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#1e40af', marginBottom: '0.2rem' }}>Resume Rating</div>
                                    <div style={{ fontWeight: '700', fontSize: '1.1rem', color: '#1d4ed8' }}>{displayRating}/100 • {displayRatingLabel}</div>
                                </div>

                                {(!aiFeedback && resumeFeedback?.suggestions?.length > 0) && (
                                    <div style={{ marginTop: '0.75rem' }}>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Feedback</p>
                                        <ul style={{ paddingLeft: '1rem', margin: 0, fontSize: '0.8rem', color: 'var(--text-main)' }}>
                                            {resumeFeedback.suggestions.slice(0, 3).map((tip, idx) => (
                                                <li key={idx} style={{ marginBottom: '0.25rem' }}>{tip}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {aiFeedback && (
                            <div style={{ marginTop: '1rem', padding: '0.85rem', borderRadius: '0.5rem', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                <p style={{ fontSize: '0.8rem', color: '#0f172a', marginBottom: '0.35rem', fontWeight: 700 }}>Resume Score: {aiFeedback.rating}/100</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>{aiFeedback.summary}</p>

                                <p style={{ fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Strengths</p>
                                <ul style={{ paddingLeft: '1rem', margin: 0, fontSize: '0.78rem', marginBottom: '0.6rem' }}>
                                    {aiFeedback.strengths.map((item, idx) => (
                                        <li key={`s-${idx}`}>{item}</li>
                                    ))}
                                </ul>

                                <p style={{ fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Improvements</p>
                                <ul style={{ paddingLeft: '1rem', margin: 0, fontSize: '0.78rem', marginBottom: '0.6rem' }}>
                                    {aiFeedback.improvements.map((item, idx) => (
                                        <li key={`i-${idx}`}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Application Status */}
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>My Applications</h3>
                        {myApps.length === 0 ? <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>You haven't applied to any drives yet.</p> : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {myApps.map(app => {
                                    const job = jobs.find(j => j.id === app.jobId);
                                    return (
                                        <li key={app.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                            <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>{job?.company || 'Unknown'}</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{job?.title}</p>
                                            <div style={{ marginTop: '0.5rem' }}>
                                                <span className={`badge badge-${app.status === 'pending' ? 'pending' : app.status === 'shortlisted' ? 'success' : 'danger'}`}>
                                                    {app.status}
                                                </span>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
