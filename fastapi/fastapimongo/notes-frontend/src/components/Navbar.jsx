// Navbar.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useSearch } from '../SearchContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { searchTerm, setSearchTerm, filter, setFilter } = useSearch();
    const navigate = useNavigate();
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);

    const showSearch = user && location.pathname === '/';

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
            padding: '1rem 2rem',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #dee2e6',
            marginBottom: '2rem',
            gap: '1rem',
            position: 'relative'
        }}>
            {user && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', position: 'relative' }} onClick={toggleDropdown}>
                    <img
                        src={user.profile_picture}
                        alt="Profile"
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '1px solid #ccc'
                        }}
                    />
                    <span style={{
                        fontSize: '1rem',
                        fontWeight: '500',
                        color: '#333',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}>
                        {user.username}
                        <span style={{ fontSize: '0.8rem' }}>▼</span>
                    </span>
                    {showDropdown && (
                        <div style={{
                            position: 'absolute',
                            top: '110%',
                            left: 0,
                            backgroundColor: 'white',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            padding: '0.5rem 0',
                            zIndex: 10,
                            minWidth: '160px'
                        }}>
                            <div
                                onClick={() => handleNavigate('/profile')}
                                style={dropdownItemStyle}
                            >
                                View Profile
                            </div>
                            <div
                                onClick={() => handleNavigate('/profile/edit')}
                                style={dropdownItemStyle}
                            >
                                Update Profile
                            </div>
                            <div
                                onClick={handleLogout}
                                style={{ ...dropdownItemStyle, color: '#dc3545' }}
                            >
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
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '0.9rem',
                            backgroundColor: 'white',
                            transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#007bff';
                            e.target.style.boxShadow = '0 0 0 2px rgba(0, 123, 255, 0.25)';
                            e.target.style.outline = 'none';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#ddd';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{
                            padding: '0.3rem 0.6rem',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            transition: 'background-color 0.2s ease',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="all" style={{ backgroundColor: 'transparent' }}>All</option>
                        <option value="todo" style={{ backgroundColor: 'transparent' }}>To Do</option>
                        <option value="In Progress" style={{ backgroundColor: 'transparent' }}>In Progress</option>
                        <option value="In Review" style={{ backgroundColor: 'transparent' }}>In Review</option>
                        <option value="Done" style={{ backgroundColor: 'transparent' }}>Done</option>
                        <option value="Archived" style={{ backgroundColor: 'transparent' }}>Archived</option>
                    </select>
                </div>
            )}
        </nav>
    );
};

const dropdownItemStyle = {
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    cursor: 'pointer',
    color: '#333',
    whiteSpace: 'nowrap',
    transition: 'background 0.2s'
};

export default Navbar;