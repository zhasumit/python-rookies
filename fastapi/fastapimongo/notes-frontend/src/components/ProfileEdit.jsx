// ProfileEdit.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import api from '../api';

const ProfileEdit = () => {
    const [formData, setFormData] = useState({
        username: '',
        profile_picture: '',
        location: '',
        mobile_number: '',
        social_media: {
            linkedin: '',
            github: '',
            twitter: '',
            kaggle: '',
            codepen: '',
            portfolio: ''
        }
    });
    const [originalData, setOriginalData] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const data = await api.profile.get();
            const profile = data.profile;

            // Parse social_media from JSON string if it exists
            let socialMedia = {
                linkedin: '',
                github: '',
                twitter: '',
                kaggle: '',
                codepen: '',
                portfolio: ''
            };

            if (profile.social_media) {
                try {
                    const parsed = typeof profile.social_media === 'string'
                        ? JSON.parse(profile.social_media)
                        : profile.social_media;
                    socialMedia = { ...socialMedia, ...parsed };
                } catch (e) {
                    console.warn('Failed to parse social_media:', e);
                }
            }

            const profileData = {
                username: profile.username || '',
                profile_picture: profile.profile_picture || '',
                location: profile.location || '',
                mobile_number: profile.mobile_number || '',
                social_media: socialMedia
            };

            setFormData(profileData);
            setOriginalData(profileData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            // Only send changed fields
            const changedData = {};
            Object.keys(formData).forEach(key => {
                if (key === 'social_media') {
                    // Compare social media objects
                    if (JSON.stringify(formData[key]) !== JSON.stringify(originalData[key])) {
                        changedData[key] = JSON.stringify(formData[key]);
                    }
                } else if (formData[key] !== originalData[key]) {
                    changedData[key] = formData[key] || null;
                }
            });

            // If no changes, just redirect
            if (Object.keys(changedData).length === 0) {
                navigate('/profile');
                return;
            }

            const data = await api.profile.update(changedData);

            setSuccess('Profile updated successfully!');

            // Update auth context if username or profile_picture changed
            if (changedData.username || changedData.profile_picture) {
                updateUser({
                    ...user,
                    username: changedData.username || user.username,
                    profile_picture: changedData.profile_picture || user.profile_picture
                });
            }

            // Redirect after 1.5 seconds
            setTimeout(() => {
                navigate('/profile');
            }, 1500);

        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSocialChange = (platform, value) => {
        setFormData({
            ...formData,
            social_media: {
                ...formData.social_media,
                [platform]: value
            }
        });
    };

    const handleCancel = () => {
        navigate('/profile');
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    const socialPlatforms = [
        { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/username' },
        { key: 'github', label: 'GitHub', placeholder: 'github.com/username' },
        { key: 'twitter', label: 'Twitter', placeholder: 'twitter.com/username' },
        { key: 'kaggle', label: 'Kaggle', placeholder: 'kaggle.com/username' },
        { key: 'codepen', label: 'CodePen', placeholder: 'codepen.io/username' },
        { key: 'portfolio', label: 'Portfolio', placeholder: 'yoursite.com' }
    ];

    return (
        <>
           <style>{`
    .profile-edit-page {
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
    }

    .loading-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: #ffffff;
    }

    .loading-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #007AFF;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .header-title {
        font-size: 2rem;
        font-weight: 600;
        color: #1d1d1f;
        margin: 0;
        letter-spacing: -0.02em;
    }

    .form-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem 2rem 0rem;
    }

    .alert {
        padding: 1rem;
        border-radius: 12px;
        margin-bottom: 2rem;
        font-size: 0.9rem;
        font-weight: 500;
        text-align: center;
    }

    .alert-error {
        background: rgba(255, 59, 48, 0.1);
        color: #FF3B30;
    }

    .alert-success {
        background: rgba(52, 199, 89, 0.1);
        color: #34C759;
    }

    .form-section {
        margin-bottom: 1.6rem;
    }

    .section-title {
        font-size: 1.5rem;
        font-weight: 500;
        color: #1d1d1f;
        margin: 0 0 1.5rem 0;
        letter-spacing: -0.01em;
    }

    .form-group {
        margin-bottom: 1.4rem;
        position: relative;
    }

    .form-group-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }

    .form-group-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
    }

    @media (max-width: 768px) {
        .form-group-row,
        .form-group-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
    }

    .form-label {
        display: block;
        font-size: 0.9rem;
        font-weight: 500;
        color: #86868b;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .form-input {
        width: 100%;
        padding: 0.3rem 0;
        border: none;
        border-bottom: 1px solid #d2d2d7;
        background: transparent;
        font-size: 1rem;
        color: #1d1d1f;
        transition: all 0.3s ease;
        outline: none;
        font-family: inherit;
    }

    .form-input:focus {
        border-bottom-color: #007AFF;
        outline: none;
        box-shadow: none;
    }

    .form-input::placeholder {
        color: #86868b;
        font-weight: 400;
    }

    .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        padding-top: 1rem;
        border-top: 1px solid #f1f1f1;
    }

    .btn {
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        font-size: 1.5em;
        font-weight: 400;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 1px solid transparent;
        text-decoration: none;
        display: inline-block;
    }

    .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .btn-primary {
        background: rgb(215, 222, 238);
        color: black;
        text-decoration: none;
        border-radius: 6px;
        font-size: .9em;
        font-weight: 400;
        transition: all 0.2s ease;
        z-index: 1;

        /* Initial shadow */
        box-shadow: 0 4px 0 #a0a7bd;
        transform: translateY(0);
    }

    .btn-primary:hover:not(:disabled) {
        /* Lift up effect */
        transform: translateY(-2px);
        box-shadow: 0 6px 0 #a0a7bd;
    }

    .btn-primary:active:not(:disabled) {
        /* Press down effect */
        transform: translateY(2px);
        box-shadow: 0 2px 0 #a0a7bd;
    }

    .btn-secondary {
        background: #d97757;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        transition: all 0.2s ease;
        z-index: 1;

        /* Initial shadow */
        box-shadow: 0 4px 0 #a05d4d;
        transform: translateY(0);
    }

    .btn-secondary:hover:not(:disabled) {
        /* Lift up effect */
        transform: translateY(-2px);
        box-shadow: 0 6px 0 #a05d4d;
    }

    .btn-secondary:active:not(:disabled) {
        /* Press down effect */
        transform: translateY(2px);
        box-shadow: 0 2px 0 #a05d4d;
    }

    @media (max-width: 640px) {
        .form-container {
            padding: 0 1.5rem 2rem 1.5rem;
        }

        .form-actions {
            flex-direction: column;
            gap: 0.75rem;
        }

        .btn {
            width: 100%;
        }
    }
`}</style>


            <div className="profile-edit-page">
               

                <div className="form-container">
                    {error && (
                        <div className="alert alert-error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Basic Information */}
                        <div className="form-section">
                            <h3 className="section-title">Basic Information</h3>

                            <div className="form-group-row">
                                <div className="form-group">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        minLength="3"
                                        maxLength="50"
                                        className="form-input"
                                        placeholder="Enter your username"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Profile Picture</label>
                                    <input
                                        type="url"
                                        name="profile_picture"
                                        value={formData.profile_picture}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Image URL"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="form-section">
                            <h3 className="section-title">Contact Information</h3>

                            <div className="form-group-row">
                                <div className="form-group">
                                    <label className="form-label">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        maxLength="100"
                                        className="form-input"
                                        placeholder="City, Country"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="mobile_number"
                                        value={formData.mobile_number}
                                        onChange={handleChange}
                                        maxLength="20"
                                        className="form-input"
                                        placeholder="+1 234 567 8900"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="form-section">
                            <h3 className="section-title">Social Links</h3>

                            <div className="form-group-grid">
                                {socialPlatforms.map(platform => (
                                    <div key={platform.key} className="form-group">
                                        <label className="form-label">{platform.label}</label>
                                        <input
                                            type="url"
                                            value={formData.social_media[platform.key]}
                                            onChange={(e) => handleSocialChange(platform.key, e.target.value)}
                                            className="form-input"
                                            placeholder={platform.placeholder}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>

                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={saving}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={saving}
                            className="btn btn-primary"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileEdit;