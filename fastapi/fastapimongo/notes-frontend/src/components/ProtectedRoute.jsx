// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
    }

    return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
