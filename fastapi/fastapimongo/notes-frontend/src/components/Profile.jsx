// Profile.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import api from '../api';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const data = await api.profile.get();
            setProfile(data.profile);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        return new Date(timestamp * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const parseSocialMedia = (socialMediaString) => {
        if (!socialMediaString) return {};
        try {
            return typeof socialMediaString === 'string'
                ? JSON.parse(socialMediaString)
                : socialMediaString;
        } catch (e) {
            return {};
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-message">
                    Error: {error}
                </div>
                <button onClick={fetchProfile} className="btn btn-primary">
                    Retry
                </button>
            </div>
        );
    }

    const socialMedia = parseSocialMedia(profile?.social_media);
    const socialPlatforms = [
        { key: 'linkedin', label: 'LinkedIn', icon: '💼' },
        { key: 'github', label: 'GitHub', icon: '🐙' },
        { key: 'twitter', label: 'Twitter', icon: '🐦' },
        { key: 'kaggle', label: 'Kaggle', icon: '📊' },
        { key: 'codepen', label: 'CodePen', icon: '✏️' },
        { key: 'portfolio', label: 'Portfolio', icon: '🌐' }
    ];

    const activeSocial = socialPlatforms.filter(platform => socialMedia[platform.key]);

    return (
        <>
            <style>{`
                .profile-page {
                    background: #fafafa;
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .loading-container, .error-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    gap: 1rem;
                    background: #fafafa;
                }

                .loading-spinner {
                    width: 24px;
                    height: 24px;
                    border: 2px solid #e5e7eb;
                    border-top: 2px solid #374151;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .error-message {
                    color: #dc2626;
                    font-size: 0.875rem;
                    margin-bottom: 1rem;
                }

                .header {
                    background: white;
                    border-bottom: 1px solid #e5e7eb;
                    padding: 1rem 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .header-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #111827;
                    margin: 0;
                }

                .profile-header {
                    position: relative;
                }

                .edit-link {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: rgb(215, 222, 238);
                    color: black;
                    text-decoration: none;
                    padding: 0.7rem 1rem;
                    border-radius: 6px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    z-index: 1;
                    
                    /* Initial shadow */
                    box-shadow: 0 4px 0 #a0a7bd;
                    transform: translateY(0);
                }

                .edit-link:hover {
                    /* Lift up effect */
                    transform: translateY(-2px);
                    box-shadow: 0 6px 0 #a0a7bd;
                }

                .edit-link:active {
                    /* Press down effect */
                    transform: translateY(2px);
                    box-shadow: 0 2px 0 #a0a7bd;
                }

                .profile-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 2rem;
                }

                .profile-header {
                    background: white;
                    border-radius: 8px;
                    border: 1px solid #e5e7eb;
                    padding: 2rem;
                    margin-bottom: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                }

                .profile-avatar {
                    flex-shrink: 0;
                }

                .avatar-image {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #e5e7eb;
                }

                .avatar-placeholder {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: #e5e7eb;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    color: #6b7280;
                    font-weight: 500;
                }

                .profile-info {
                    flex: 1;
                }

                .profile-name {
                    font-size: 3rem;
                    font-weight: 400;
                    color: #111827;
                    margin: 0 0 0.5rem 0;
                }

                .profile-email {
                    color: #6b7280;
                    font-size: 1.2em;
                    margin: 0em 0em .5em .3em;
                }

                .status-badges {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .badge {
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 1em;
                    font-weight: 500;
                }

                .badge-active {
                    background: #dcfce7;
                    color: #16a34a;
                }

                .badge-inactive {
                    background: #fef2f2;
                    color: #dc2626;
                }

                .badge-verified {
                    background: #dbeafe;
                    color: #2563eb;
                }

                .badge-unverified {
                    background: #fef3c7;
                    color: #d97706;
                }

                .info-section {
                    background: white;
                    border-radius: 8px;
                    border: 1px solid #e5e7eb;
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .section-title {
                    font-size: 1.4em;
                    font-weight: 500;
                    color: #111827;
                    margin: 0 0 1rem 0;
                }

                .info-grid {
                    display: grid;
                    gap: 1rem;
                }

                .info-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.75rem 0;
                    border-bottom: 1px solid #f3f4f6;
                }

                .info-item:last-child {
                    border-bottom: none;
                }

                .info-label {
                    font-weight: 500;
                    color: #374151;
                    font-size: 0.875rem;
                }

                .info-value {
                    color: #6b7280;
                    font-size: 0.875rem;
                    text-align: right;
                }

                .social-links {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                }

                .social-link {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem;
                    border: 1px solid #e5e7eb;
                    border-radius: 6px;
                    text-decoration: none;
                    color: #374151;
                    transition: all 0.2s;
                }

                .social-link:hover {
                    background: #f9fafb;
                    border-color: #d1d5db;
                }

                .social-icon {
                    font-size: 1.25rem;
                }

                .social-info {
                    flex: 1;
                    min-width: 0;
                }

                .social-label {
                    font-weight: 500;
                    font-size: 0.875rem;
                    margin-bottom: 0.25rem;
                }

                .social-url {
                    color: #6b7280;
                    font-size: 0.75rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .empty-state {
                    text-align: center;
                    color: #9ca3af;
                    font-style: italic;
                    padding: 2rem;
                }

                .btn {
                    padding: 0.75rem 1.5rem;
                    border-radius: 6px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 1px solid transparent;
                    text-decoration: none;
                    display: inline-block;
                }

                .btn-primary {
                    background: #2563eb;
                    color: white;
                }

                .btn-primary:hover {
                    background: #1d4ed8;
                }

                @media (max-width: 768px) {
                    .header {
                        padding: 1rem;
                    }
                    
                    .profile-container {
                        padding: 1rem;
                    }
                    
                    .profile-header {
                        flex-direction: column;
                        text-align: center;
                        gap: 1rem;
                    }
                    
                    .social-links {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>

            <div className="profile-page">


                <div className="profile-container">
                    {/* Profile Header */}
                    <div className="profile-header">
                        <Link to="/profile/edit" className="edit-link">
                            Edit Profile
                        </Link>
                        <div className="profile-avatar">
                            {profile?.profile_picture ? (
                                <img
                                    src={profile.profile_picture}
                                    alt="Profile"
                                    className="avatar-image"
                                />
                            ) : (
                                <div className="avatar-placeholder">
                                    {profile?.username?.charAt(0).toUpperCase() || 'U'}
                                </div>
                            )}
                        </div>

                        <div className="profile-info">
                            <h2 className="profile-name">
                                {profile?.username || 'Anonymous User'}
                            </h2>
                            <div className="profile-email">
                                {profile?.email || 'No email provided'}
                            </div>
                            <div className="status-badges">
                                <span className={`badge ${profile?.is_active ? 'badge-active' : 'badge-inactive'}`}>
                                    {profile?.is_active ? 'Active' : 'Inactive'}
                                </span>
                                <span className={`badge ${profile?.is_verified ? 'badge-verified' : 'badge-unverified'}`}>
                                    {profile?.is_verified ? 'Verified' : 'Unverified'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="info-section">
                        <h3 className="section-title">Contact Information</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Location</span>
                                <span className="info-value">
                                    {profile?.location || 'Not specified'}
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Mobile Number</span>
                                <span className="info-value">
                                    {profile?.mobile_number || 'Not specified'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Account Information */}
                    {/* <div className="info-section">
                        <h3 className="section-title">Account Information</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Member Since</span>
                                <span className="info-value">
                                    {formatDate(profile?.created_at)}
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Last Updated</span>
                                <span className="info-value">
                                    {formatDate(profile?.updated_at)}
                                </span>
                            </div>
                        </div>
                    </div> */}

                    {/* Social Links */}
                    <div className="info-section">
                        <h3 className="section-title">Social Links</h3>
                        {activeSocial.length > 0 ? (
                            <div className="social-links">
                                {activeSocial.map(platform => (
                                    <a
                                        key={platform.key}
                                        href={socialMedia[platform.key]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                    >
                                        <span className="social-icon">{platform.icon}</span>
                                        <div className="social-info">
                                            <div className="social-label">{platform.label}</div>
                                            <div className="social-url">
                                                {socialMedia[platform.key]}
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                No social links added yet
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;