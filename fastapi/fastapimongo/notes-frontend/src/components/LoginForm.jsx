// LoginForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(credentials);
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            paddingTop: '10vh'
        }}>
            <div style={{
                backgroundColor: 'transparent',
                padding: '1rem',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '2rem',
                    color: '#333'
                }}>
                    Login
                </h2>

                {error && (
                    <div style={{
                        backgroundColor: '#fee',
                        color: '#c33',
                        padding: '0.75rem',
                        borderRadius: '4px',
                        marginBottom: '1rem',
                        border: '1px solid #fcc'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ marginBottom: '1em' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '1em',
                            fontWeight: 500,
                            color: '#86868b',
                            marginBottom: '0.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            required
                            style={{
                                width: '100%',
                                padding: '0.5em .5em',
                                border: 'none',
                                borderBottom: '1px solid #d2d2d7',
                                background: 'transparent',
                                fontSize: '1em',
                                color: '#1d1d1f',
                                transition: 'all 0.3s ease',
                                outline: 'none',
                                fontFamily: 'inherit',
                                boxSizing: 'border-box',
                                boxShadow: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderBottomColor = '#007AFF'}
                            onBlur={(e) => e.target.style.borderBottomColor = '#d2d2d7'}
                        />
                    </div>

                    <div style={{ marginBottom: '.3rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.9em',
                            fontWeight: 500,
                            color: '#86868b',
                            marginBottom: '0.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            required
                            style={{
                                width: '100%',
                                padding: '0.5em .5em',
                                border: 'none',
                                borderBottom: '1px solid #d2d2d7',
                                background: 'transparent',
                                fontSize: '1em',
                                color: '#1d1d1f',
                                transition: 'all 0.3s ease',
                                outline: 'none',
                                fontFamily: 'inherit',
                                boxSizing: 'border-box',
                                boxShadow: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderBottomColor = '#007AFF'}
                            onBlur={(e) => e.target.style.borderBottomColor = '#d2d2d7'}
                        />
                    </div>


                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '1rem'
                    }}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                fontSize: '1em',
                                fontWeight: 400,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                border: '1px solid transparent',
                                textDecoration: 'none',
                                display: 'inline-block',
                                background: 'rgb(215, 222, 238)',
                                color: 'black',
                                boxShadow: '0 4px 0 #a0a7bd',
                                transform: 'translateY(0)',
                                opacity: loading ? 0.5 : 1,
                                width: '150px' // Set a fixed width or use 'auto' for content width
                            }}
                            onMouseOver={(e) => {
                                if (!loading) {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 0 #a0a7bd';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!loading) {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 0 #a0a7bd';
                                }
                            }}
                            onMouseDown={(e) => {
                                if (!loading) {
                                    e.currentTarget.style.transform = 'translateY(2px)';
                                    e.currentTarget.style.boxShadow = '0 2px 0 #a0a7bd';
                                }
                            }}
                            onMouseUp={(e) => {
                                if (!loading) {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 0 #a0a7bd';
                                }
                            }}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>



                </form>

                <p style={{
                    textAlign: 'center',
                    marginTop: '1.5rem',
                    color: '#666'
                }}>
                    Don't have an account?{' '}
                    <Link to="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;