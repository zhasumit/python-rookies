// Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useSearch } from '../SearchContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { searchTerm, setSearchTerm, filter, setFilter } = useSearch();
    const navigate = useNavigate();
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const showSearch = user && location.pathname === '/';

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const handleNavigate = (path) => {
        setShowDropdown(false);
        navigate(path);
    };

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0rem 1.5rem',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #dee2e6',
            gap: '1rem',
            position: 'relative'
        }}>
            {user && (
                <div
                    ref={dropdownRef}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        cursor: 'pointer',
                        position: 'relative',
                        padding: '0.5rem',
                        borderRadius: '6px',
                        transition: 'background-color 0.2s ease',
                        backgroundColor: showDropdown ? '#f0f0f0' : 'transparent'
                    }}
                    onClick={toggleDropdown}
                    onMouseEnter={(e) => {
                        if (!showDropdown) e.target.style.backgroundColor = '#f8f9fa';
                    }}
                    onMouseLeave={(e) => {
                        if (!showDropdown) e.target.style.backgroundColor = 'transparent';
                    }}>
                    <img
                        src={user.profile_picture}
                        alt="Profile"
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid #9147ff'
                        }}
                    />
                    <span style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#333',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}>
                        {user.username}
                        <span style={{
                            fontSize: '0.8rem',
                            transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease'
                        }}>▼</span>
                    </span>
                    {showDropdown && (
                        <div style={{
                            position: 'absolute',
                            top: '110%',
                            left: 0,
                            backgroundColor: '#ffffff',
                            border: '1px solid #e1e5e9',
                            borderRadius: '8px',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                            padding: '0rem 0',
                            zIndex: 10,
                            minWidth: '180px',
                            animation: 'dropdownSlide 0.2s ease-out'
                        }}>
                            <div
                                onClick={() => handleNavigate('/profile')}
                                style={{
                                    ...dropdownstyling,
                                    borderBottom: '1px solid rgb(168, 196, 233)',
                                    marginBottom: '0.25rem',
                                    paddingBottom: '0.75rem',
                                    borderTopLeftRadius: '10px',
                                    borderTopRightRadius: '10px'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#f8f9fa';
                                    e.target.style.color = '#9147ff';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#333';
                                }}
                            >
                                <span style={{ marginRight: '0.5rem' }}>👤</span>
                                View Profile
                            </div>
                            <div
                                onClick={handleLogout}
                                style={{
                                    ...dropdownstyling,
                                    color: '#ff6b6b', 
                                    borderBottomLeftRadius: '10px',
                                    borderBottomRightRadius: '10px'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#ff6b6b';
                                    e.target.style.color = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#ff6b6b';
                                }}
                            >
                                <span style={{ marginRight: '0.5rem' }}>🚪</span>
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            )}

            {showSearch && (
                <div style={{ display: 'flex', gap: '0.75rem', flex: 1, maxWidth: '500px' }}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm || ''}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #dee2e6',
                            borderRadius: '6px',
                            fontSize: '0.9rem',
                            backgroundColor: '#fff',
                            color: '#333',
                            transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#9147ff';
                            e.target.style.boxShadow = '0 0 0 2px rgba(145, 71, 255, 0.2)';
                            e.target.style.outline = 'none';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#dee2e6';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #dee2e6',
                            borderRadius: '6px',
                            fontSize: '0.9rem',
                            backgroundColor: '#fff',
                            color: '#333',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="all">All</option>
                        <option value="todo">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="In Review">In Review</option>
                        <option value="Done">Done</option>
                        <option value="Archived">Archived</option>
                    </select>
                </div>
            )}

            <style jsx>{`
                @keyframes dropdownSlide {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </nav>
    );
};

const dropdownstyling = {
    padding: '0.75rem 1rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    color: '#333',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent'
};

export default Navbar;