import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiGetJobs, apiApplyForJob, apiGetApplicationsForStudent, apiUpdateUserResume } from '../lib/storage';
import { LogOut, Upload, Briefcase, FileText, CheckCircle } from 'lucide-react';

export default function StudentDashboard() {
    const { user, logout, updateUserInContext } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [myApps, setMyApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        loadData();
    }, [user.id]);

    const loadData = async () => {
        try {
            const j = await apiGetJobs();
            const a = await apiGetApplicationsForStudent(user.id);
            setJobs(j);
            setMyApps(a);
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

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const base64 = event.target.result;
                const updatedUser = await apiUpdateUserResume(user.id, base64);
                updateUserInContext({ resume: updatedUser.resume });
                setSuccess('Resume uploaded successfully!');
                setTimeout(() => setSuccess(''), 3000);
            } catch (err) {
                setError(err.message);
            } finally {
                setUploading(false);
            }
        };
        reader.readAsDataURL(file);
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

    if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}>Loading Dashboard...</div>;

    return (
        <div className="container slideUp" style={{ padding: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem' }}>Welcome, {user.name}</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Student Dashboard • Placement Portal</p>
                </div>
                <button onClick={logout} className="btn btn-outline" style={{ borderRadius: 'var(--radius-sm)' }}>
                    <LogOut size={18} /> Logout
                </button>
            </header>

            {error && <div style={{ padding: '1rem', background: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>{error}</div>}
            {success && <div style={{ padding: '1rem', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>{success}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '2rem' }}>

                {/* Main Job Board */}
                <div>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Briefcase size={22} className="text-primary" /> Available Drives</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {jobs.length === 0 ? <p>No placement drives currently available.</p> : jobs.map(job => (
                            <div key={job.id} className="glass-panel" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-hover)', marginBottom: '0.25rem' }}>{job.title}</h3>
                                        <p style={{ fontWeight: '600' }}>{job.company}</p>
                                    </div>
                                    <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>{job.salary}</span>
                                </div>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{job.description}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>

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
                    </div>
                </div>

                {/* Sidebar */}
                <div>
                    {/* Resume Card */}
                    <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', background: 'var(--primary-light)', color: 'var(--primary)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                            <FileText size={32} />
                        </div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Your Resume</h3>

                        {user.resume ? (
                            <p style={{ color: 'var(--success)', fontWeight: '600', marginBottom: '1rem' }}>✓ Uploaded</p>
                        ) : (
                            <p style={{ color: 'var(--warning)', fontWeight: '600', marginBottom: '1rem' }}>⚠ Not Uploaded</p>
                        )}

                        <label className="btn btn-outline" style={{ width: '100%', cursor: 'pointer' }}>
                            <Upload size={18} /> {uploading ? 'Uploading...' : 'Update Resume'}
                            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} style={{ display: 'none' }} disabled={uploading} />
                        </label>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>PDF or Word, max 2MB</p>
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
