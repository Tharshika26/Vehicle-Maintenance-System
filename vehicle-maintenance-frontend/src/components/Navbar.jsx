import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    // Simple mock auth check - in a real app use Context
    const userRole = localStorage.getItem('userRole'); // 'admin' | 'owner' | null
    const isLoggedIn = !!userRole;

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">VehicleTracker</Link>
                <div className="space-x-4">
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="hover:text-blue-200">Login</Link>
                            <Link to="/register" className="hover:text-blue-200">Register</Link>
                        </>
                    ) : (
                        <>
                            {userRole === 'admin' && (
                                <>
                                    <Link to="/admin/dashboard" className="hover:text-blue-200">Dashboard</Link>
                                    <Link to="/admin/service-records" className="hover:text-blue-200">Records</Link>
                                    <Link to="/admin/reports" className="hover:text-blue-200">Reports</Link>
                                </>
                            )}
                            {userRole === 'owner' && (
                                <>
                                    <Link to="/owner/dashboard" className="hover:text-blue-200">Dashboard</Link>
                                    <Link to="/owner/vehicles" className="hover:text-blue-200">Vehicles</Link>
                                    <Link to="/owner/service-history" className="hover:text-blue-200">History</Link>
                                </>
                            )}
                            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
