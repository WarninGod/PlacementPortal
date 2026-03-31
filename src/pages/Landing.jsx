import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight } from 'lucide-react';

export default function Landing() {
    return (
        <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div className="glass-panel slideUp" style={{ padding: '4rem 2rem', maxWidth: '800px', width: '100%' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary-light)', color: 'var(--primary)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                    <Briefcase size={48} />
                </div>

                <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                    Your Next Career Move Starts Here
                </h1>

                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                    The ultimate placement portal for students and recruiters. Discover top opportunities, upload your resume, and get hired.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/auth" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                        Get Started <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
