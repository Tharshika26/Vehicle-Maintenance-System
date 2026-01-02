import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userRole = localStorage.getItem('userRole');

    if (!userRole) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Redirect to appropriate dashboard based on actual role
        if (userRole === 'admin') return <Navigate to="/admin/dashboard" replace />;
        if (userRole === 'owner') return <Navigate to="/owner/dashboard" replace />;
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
