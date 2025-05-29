// SignupForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

// Centralized styles
const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        paddingTop: '10vh'
    },
    formContainer: {
        backgroundColor: 'transparent',
        padding: '1rem',
        width: '100%',
        maxWidth: '400px'
    },
    title: {
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#333'
    },
    error: {
        backgroundColor: '#fee',
        color: '#c33',
        padding: '0.75rem',
        borderRadius: '4px',
        marginBottom: '1rem',
        border: '1px solid #fcc'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    inputGroup: {
        marginBottom: '1em'
    },
    label: {
        display: 'block',
        fontSize: '1em',
        fontWeight: 500,
        color: '#86868b',
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    },
    input: {
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
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1rem'
    },
    button: {
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        fontSize: '1em',
        fontWeight: 400,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: '1px solid transparent',
        textDecoration: 'none',
        display: 'inline-block',
        background: 'rgb(215, 222, 238)',
        color: 'black',
        boxShadow: '0 4px 0 #a0a7bd',
        transform: 'translateY(0)',
        width: '150px'
    },
    linkText: {
        textAlign: 'center',
        marginTop: '1.5rem',
        color: '#666'
    },
    link: {
        color: '#007bff',
        textDecoration: 'none'
    }
};

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const { confirmPassword, ...signupData } = formData;
            await signup(signupData);
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Sign Up</h2>

                {error && (
                    <div style={styles.error}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                            style={styles.input}
                            onFocus={(e) => e.target.style.borderBottomColor = '#007AFF'}
                            onBlur={(e) => e.target.style.borderBottomColor = '#d2d2d7'}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            style={styles.input}
                            onFocus={(e) => e.target.style.borderBottomColor = '#007AFF'}
                            onBlur={(e) => e.target.style.borderBottomColor = '#d2d2d7'}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            style={styles.input}
                            onFocus={(e) => e.target.style.borderBottomColor = '#007AFF'}
                            onBlur={(e) => e.target.style.borderBottomColor = '#d2d2d7'}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                            style={styles.input}
                            onFocus={(e) => e.target.style.borderBottomColor = '#007AFF'}
                            onBlur={(e) => e.target.style.borderBottomColor = '#d2d2d7'}
                        />
                    </div>

                    <div style={styles.buttonContainer}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                ...styles.button,
                                opacity: loading ? 0.5 : 1
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
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </div>
                </form>

                <p style={styles.linkText}>
                    Already have an account?{' '}
                    <Link to="/login" style={styles.link}>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;
