import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!username || !email || !password) {
            setError('Please enter all fields');
            return;
        }
        setSubmitting(true);
        try {
            await signup(username, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
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
                        alt="Signup to Zerodha" 
                        style={{ width: '85%', maxWidth: '550px' }} 
                    />
                    <h2 className="mt-4 fw-normal text-muted fs-4">Invest in everything</h2>
                    <p className="text-muted fw-light">Online platform to invest in stocks, derivatives, mutual funds, and more</p>
                </div>

                {/* Right Side Form Card */}
                <div className="col-lg-5 p-4">
                    <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '8px', backgroundColor: '#fff', border: '1px solid #eee' }}>
                        <h2 className="fw-normal mb-1 fs-3">Signup</h2>
                        <p className="text-muted small mb-4">Create a new account with virtual ₹1,00,000 cash</p>
                        
                        {error && (
                            <div className="alert alert-danger py-2 small" role="alert">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label text-muted small fw-medium">Username</label>
                                <input 
                                    type="text" 
                                    className="form-control py-2" 
                                    style={{ borderColor: '#e0e0e0', fontSize: '0.95rem' }}
                                    placeholder="Enter username" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label text-muted small fw-medium">Email address</label>
                                <input 
                                    type="email" 
                                    className="form-control py-2" 
                                    style={{ borderColor: '#e0e0e0', fontSize: '0.95rem' }}
                                    placeholder="Enter email" 
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
                                    placeholder="Enter password" 
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
                                {submitting ? 'Creating account...' : 'Continue'}
                            </button>
                        </form>

                        <div className="text-center mt-4 border-top pt-3">
                            <p className="text-muted small mb-0">
                                Already have an account? <Link to="/login" style={{ textDecoration: 'none', color: '#387ed1', fontWeight: '500' }}>Login here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row text-center mt-5 text-muted small px-5" style={{ fontSize: '11px', lineHeight: '1.6' }}>
                <p>
                    I authorize Zerodha to contact me. This will override my registry on DND / NDNC.
                    By proceeding, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
}