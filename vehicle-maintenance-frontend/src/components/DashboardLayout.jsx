import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <Sidebar />
            <div className="flex-1 ml-64 flex flex-col">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex-1"></div>
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end text-right mr-2">
                            <span className="text-sm font-bold text-[#0B1221] leading-none">
                                {JSON.parse(localStorage.getItem('user') || '{}').name || 'User'}
                            </span>
                            <span className="text-[10px] text-gray-500 font-medium capitalize">
                                {localStorage.getItem('userRole') || 'owner'}
                            </span>
                        </div>
                        <Link to="/owner/profile" className="h-10 w-10 rounded-full bg-[#00C27B] text-white flex items-center justify-center font-bold text-sm shadow-md shadow-green-500/20 hover:scale-105 transition-transform">
                            {(JSON.parse(localStorage.getItem('user') || '{}').name || 'U').charAt(0).toUpperCase()}
                        </Link>
                    </div>
                </header>

                <main className="flex-grow p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
