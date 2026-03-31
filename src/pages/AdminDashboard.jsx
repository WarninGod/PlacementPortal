import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiGetJobs, apiCreateJob, apiGetAllApplications, apiUpdateApplicationStatus } from '../lib/storage';
import { LogOut, Plus, Users, Download, Activity } from 'lucide-react';

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('drives'); // drives | applications
    const [jobs, setJobs] = useState([]);
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}>Loading Dashboard...</div>;

    return (
        <div className="container slideUp" style={{ padding: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem' }}>TPO Admin Panel</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage drives and student applications</p>
                </div>
                <button onClick={logout} className="btn btn-outline" style={{ borderRadius: 'var(--radius-sm)' }}>
                    <LogOut size={18} /> Logout
                </button>
            </header>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
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
                            <form onSubmit={handlePostJob} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
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
                    <div className="glass-panel" style={{ marginTop: '1.5rem', overflowX: 'auto' }}>
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
                                    <tr key={app.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
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
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                {app.status === 'pending' && (
                                                    <>
                                                        <button onClick={() => handleStatusChange(app.id, 'shortlisted')} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>Shortlist</button>
                                                        <button onClick={() => handleStatusChange(app.id, 'rejected')} className="btn btn-outline" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', color: 'var(--danger)' }}>Reject</button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
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
