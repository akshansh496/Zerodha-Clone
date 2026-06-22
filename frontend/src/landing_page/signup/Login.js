import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Please enter all fields');
            return;
        }
        setSubmitting(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed. Please verify your credentials.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container p-5" style={{ minHeight: '80vh', marginTop: '50px' }}>
            <div className="row align-items-center">
                {/* Left Side Info / Media */}
                <div className="col-lg-7 text-center p-4">
                    <img 
                        src="/media/signup.png" 
                        alt="Login to Zerodha" 
                        style={{ width: '85%', maxWidth: '550px' }} 
                    />
                    <h2 className="mt-4 fw-normal text-muted fs-4">Invest in everything</h2>
                    <p className="text-muted fw-light">Online platform to invest in stocks, derivatives, mutual funds, and more</p>
                </div>

                {/* Right Side Form Card */}
                <div className="col-lg-5 p-4">
                    <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '8px', backgroundColor: '#fff', border: '1px solid #eee' }}>
                        <h2 className="fw-normal mb-1 fs-3">Login</h2>
                        <p className="text-muted small mb-4">Access your virtual trading dashboard</p>
                        
                        {error && (
                            <div className="alert alert-danger py-2 small" role="alert">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label text-muted small fw-medium">Email address</label>
                                <input 
                                    type="email" 
                                    className="form-control py-2" 
                                    style={{ borderColor: '#e0e0e0', fontSize: '0.95rem' }}
                                    placeholder="Enter your email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label text-muted small fw-medium">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control py-2" 
                                    style={{ borderColor: '#e0e0e0', fontSize: '0.95rem' }}
                                    placeholder="Enter your password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary w-100 py-2 fw-medium fs-6" 
                                style={{ backgroundColor: '#387ed1', borderColor: '#387ed1' }}
                                disabled={submitting}
                            >
                                {submitting ? 'Logging in...' : 'Login'}
                            </button>
                        </form>

                        <div className="text-center mt-4 border-top pt-3">
                            <p className="text-muted small mb-0">
                                Don't have an account yet? <Link to="/signup" style={{ textDecoration: 'none', color: '#387ed1', fontWeight: '500' }}>Signup here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row text-center mt-5 text-muted small px-5" style={{ fontSize: '11px', lineHeight: '1.6' }}>
                <p>
                    Zerodha Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration no.: INZ000031633.
                    CDSL Depository Participant DP ID: 12081600.
                </p>
            </div>
        </div>
    );
}
