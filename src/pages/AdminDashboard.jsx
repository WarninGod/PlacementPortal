import { useState, useEffect, Fragment } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiGetJobs, apiCreateJob, apiGetAllApplications, apiUpdateApplicationStatus } from '../lib/storage';
import { LogOut, Plus, Users, Download, Activity } from 'lucide-react';
import { getAiInterviewQuestions } from '../lib/aiResumeAdvisor';

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('drives'); // drives | applications
    const [jobs, setJobs] = useState([]);
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [questionsByApp, setQuestionsByApp] = useState({});
    const [questionLoadingByApp, setQuestionLoadingByApp] = useState({});
    const [questionErrorByApp, setQuestionErrorByApp] = useState({});
    const [visibleQuestionsByApp, setVisibleQuestionsByApp] = useState({});

    // New Job Form State
    const [showForm, setShowForm] = useState(false);
    const [jobForm, setJobForm] = useState({ title: '', company: '', description: '', salary: '', deadline: '' });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const j = await apiGetJobs();
            const a = await apiGetAllApplications();
            setJobs(j);
            setApps(a);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handlePostJob = async (e) => {
        e.preventDefault();
        await apiCreateJob(jobForm);
        setJobForm({ title: '', company: '', description: '', salary: '', deadline: '' });
        setShowForm(false);
        loadData();
    };

    const handleStatusChange = async (appId, newStatus) => {
        await apiUpdateApplicationStatus(appId, newStatus);
        loadData();
    };

    const downloadBase64File = (base64String, fileName) => {
        const link = document.createElement("a");
        link.href = base64String;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleGenerateQuestions = async (app) => {
        const key = import.meta.env.VITE_OPENROUTER_API_KEY
            || import.meta.env.VITE_OPENAI_API_KEY
            || localStorage.getItem('placement_openrouter_api_key')
            || localStorage.getItem('placement_ai_api_key')
            || '';

        if (!key) {
            setQuestionErrorByApp(prev => ({ ...prev, [app.id]: 'Missing AI API key in environment.' }));
            return;
        }

        setQuestionErrorByApp(prev => ({ ...prev, [app.id]: '' }));
        setQuestionLoadingByApp(prev => ({ ...prev, [app.id]: true }));
        try {
            const result = await getAiInterviewQuestions({
                apiKey: key,
                candidateName: app.studentName,
                roleTitle: app.jobTitle,
                company: app.jobCompany,
                resumeText: app.studentResumeText,
                jobDescription: app.jobDescription
            });

            setQuestionsByApp(prev => ({ ...prev, [app.id]: result }));
            setVisibleQuestionsByApp(prev => ({ ...prev, [app.id]: true }));
        } catch (err) {
            setQuestionErrorByApp(prev => ({ ...prev, [app.id]: err.message || 'Failed to generate questions.' }));
            setVisibleQuestionsByApp(prev => ({ ...prev, [app.id]: true }));
        } finally {
            setQuestionLoadingByApp(prev => ({ ...prev, [app.id]: false }));
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading Dashboard...</div>;

    return (
        <div className="container slideUp" style={{ padding: '1.5rem' }}>
            <header className="header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h1>TPO Admin Panel</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage drives and student applications</p>
                </div>
                <button onClick={logout} className="btn btn-outline" style={{ borderRadius: 'var(--radius-sm)' }}>
                    <LogOut size={18} /> Logout
                </button>
            </header>

            {/* Tabs */}
            <div className="tabs-flex" style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                <button
                    onClick={() => setActiveTab('drives')}
                    style={{
                        padding: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600',
                        borderBottom: activeTab === 'drives' ? '2px solid var(--primary)' : '2px solid transparent', color: activeTab === 'drives' ? 'var(--primary)' : 'inherit', marginBottom: '-2px'
                    }}
                ><Activity size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> Placement Drives</button>
                <button
                    onClick={() => setActiveTab('applications')}
                    style={{
                        padding: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600',
                        borderBottom: activeTab === 'applications' ? '2px solid var(--primary)' : '2px solid transparent', color: activeTab === 'applications' ? 'var(--primary)' : 'inherit', marginBottom: '-2px'
                    }}
                ><Users size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> Student Applications</button>
            </div>

            {activeTab === 'drives' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2>Active Drives</h2>
                        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                            <Plus size={18} /> Post New Drive
                        </button>
                    </div>

                    {showForm && (
                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', borderLeft: '4px solid var(--primary)' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Create Placement Drive</h3>
                            <form onSubmit={handlePostJob} className="form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="input-group">
                                    <label>Company Name</label>
                                    <input type="text" required className="input-field" value={jobForm.company} onChange={e => setJobForm({ ...jobForm, company: e.target.value })} />
                                </div>
                                <div className="input-group">
                                    <label>Job Title / Role</label>
                                    <input type="text" required className="input-field" value={jobForm.title} onChange={e => setJobForm({ ...jobForm, title: e.target.value })} />
                                </div>
                                <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                    <label>Description & Requirements</label>
                                    <textarea required className="input-field" rows="3" value={jobForm.description} onChange={e => setJobForm({ ...jobForm, description: e.target.value })}></textarea>
                                </div>
                                <div className="input-group">
                                    <label>CTC / Salary Packages</label>
                                    <input type="text" required className="input-field" value={jobForm.salary} onChange={e => setJobForm({ ...jobForm, salary: e.target.value })} />
                                </div>
                                <div className="input-group">
                                    <label>Application Deadline</label>
                                    <input type="date" required className="input-field" value={jobForm.deadline} onChange={e => setJobForm({ ...jobForm, deadline: e.target.value })} />
                                </div>
                                <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button type="submit" className="btn btn-primary">Publish Drive</button>
                                    <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="job-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {jobs.map(job => (
                            <div key={job.id} className="glass-panel" style={{ padding: '1.5rem' }}>
                                <h3 style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>{job.title}</h3>
                                <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>{job.company}</h4>
                                <p style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Package:</span> <b>{job.salary}</b>
                                </p>
                                <p style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Deadline:</span> <b>{new Date(job.deadline).toLocaleDateString()}</b>
                                </p>
                                <p style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Applications:</span>
                                    <b>{apps.filter(a => a.jobId === job.id).length} received</b>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'applications' && (
                <div>
                    <h2>Review Applications</h2>
                    <div className="table-scroll glass-panel" style={{ marginTop: '1.5rem', overflowX: 'auto', '-webkitOverflowScrolling': 'touch' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.05)', color: 'var(--text-muted)' }}>
                                    <th style={{ padding: '1rem' }}>Student Name</th>
                                    <th style={{ padding: '1rem' }}>Company & Role</th>
                                    <th style={{ padding: '1rem' }}>Resume</th>
                                    <th style={{ padding: '1rem' }}>Status</th>
                                    <th style={{ padding: '1rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {apps.map(app => (
                                    <Fragment key={app.id}>
                                    <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                        <td style={{ padding: '1rem' }}>{app.studentName}<br /><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{app.studentEmail}</span></td>
                                        <td style={{ padding: '1rem' }}>{app.jobCompany}<br /><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{app.jobTitle}</span></td>
                                        <td style={{ padding: '1rem' }}>
                                            <button onClick={() => downloadBase64File(app.resume, `Resume_${app.studentName}.pdf`)} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '4px' }}>
                                                <Download size={14} /> Download
                                            </button>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span className={`badge badge-${app.status === 'pending' ? 'pending' : app.status === 'shortlisted' ? 'success' : 'danger'}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                <button
                                                    onClick={() => handleGenerateQuestions(app)}
                                                    className="btn btn-outline"
                                                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', borderRadius: '4px' }}
                                                    disabled={questionLoadingByApp[app.id]}
                                                >
                                                    {questionLoadingByApp[app.id] ? 'Generating...' : (questionsByApp[app.id] ? 'Regenerate' : 'AI Questions')}
                                                </button>
                                                {app.status === 'pending' && (
                                                    <>
                                                        <button onClick={() => handleStatusChange(app.id, 'shortlisted')} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>Shortlist</button>
                                                        <button onClick={() => handleStatusChange(app.id, 'rejected')} className="btn btn-outline" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', color: 'var(--danger)' }}>Reject</button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                    {visibleQuestionsByApp[app.id] && (questionsByApp[app.id] || questionErrorByApp[app.id]) && (
                                        <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', background: 'rgba(255,255,255,0.45)' }}>
                                            <td colSpan="5" style={{ padding: '1rem 1rem 1.2rem 1rem' }}>
                                                <div style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '12px', padding: '0.9rem' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                                                        <div>
                                                            <p style={{ fontSize: '0.85rem', fontWeight: '700', margin: 0 }}>AI Interview Kit</p>
                                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{app.studentName} • {app.jobCompany} {app.jobTitle}</p>
                                                        </div>
                                                        <button
                                                            className="btn btn-outline"
                                                            style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem', borderRadius: '6px' }}
                                                            onClick={() => setVisibleQuestionsByApp(prev => ({ ...prev, [app.id]: false }))}
                                                        >
                                                            Hide
                                                        </button>
                                                    </div>

                                                    {questionErrorByApp[app.id] && (
                                                        <p style={{ color: 'var(--danger)', fontSize: '0.83rem', marginBottom: '0.5rem' }}>{questionErrorByApp[app.id]}</p>
                                                    )}

                                                    {questionsByApp[app.id] && (
                                                        <>
                                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                                                                {questionsByApp[app.id].intro}
                                                            </p>
                                                            <div style={{ display: 'grid', gap: '0.55rem' }}>
                                                                {questionsByApp[app.id].questions.slice(0, 5).map((q, idx) => (
                                                                    <div key={`${app.id}-${idx}`} style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '0.6rem 0.7rem', background: '#fff' }}>
                                                                        <p style={{ margin: 0, fontSize: '0.86rem', lineHeight: 1.35 }}><b>Q{idx + 1}.</b> {q.question}</p>
                                                                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.74rem', color: 'var(--text-muted)' }}><b>Focus:</b> {q.focus}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    </Fragment>
                                ))}
                                {apps.length === 0 && <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>No applications received yet.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
