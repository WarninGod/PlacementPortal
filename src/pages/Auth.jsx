import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const { login, registerStudent } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                const user = await login(email, password);
                navigate(user.role === 'admin' ? '/admin' : '/student');
            } else {
                const user = await registerStudent(name, email, password);
                navigate('/student');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="glass-panel slideUp" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>

                {error && (
                    <div style={{ padding: '0.75rem', marginBottom: '1.5rem', background: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="input-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                className="input-field"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="John Doe"
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            className="input-field"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="student@college.edu"
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="input-field"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        {isLogin ? <><LogIn size={20} /> Login</> : <><UserPlus size={20} /> Register Account</>}
                    </button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem' }}
                    >
                        {isLogin ? 'Sign up' : 'Log in'}
                    </button>
                </div>

                {isLogin && (
                    <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-light)', textAlign: 'center', background: 'rgba(255,255,255,0.5)', padding: '0.5rem', borderRadius: '4px' }}>
                        <strong>Demo Credentials:</strong><br />
                        Student: student1@college.edu / password123<br />
                        Admin: admin@college.edu / password123
                    </div>
                )}
            </div>
        </div>
    );
}
