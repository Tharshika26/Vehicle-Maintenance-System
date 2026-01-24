import React from 'react';
import { Link } from 'react-router-dom';

const OwnerDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const ownerName = user.name || 'Owner';

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#0B1221]">Welcome Back, {ownerName}</h1>
                <p className="text-gray-500 mt-1">Here's what's happening with your vehicles.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Card 1 */}
                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-[#0B1221]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 19H5V5h14v14z" /></svg>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">My Vehicles</p>
                        <h3 className="text-4xl font-extrabold text-[#0B1221]">0</h3>
                    </div>
                    <div className="mt-6 flex items-center">
                        <Link to="/owner/vehicles" className="text-[#0B1221] font-bold text-sm flex items-center hover:underline">
                            View All Vehicles
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </Link>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Next Service Due</p>
                        <h3 className="text-2xl font-bold text-[#0B1221]">--</h3>
                        <p className="text-sm text-gray-500 mt-1">No upcoming services</p>
                    </div>
                    <div className="mt-6 flex items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Up to date
                        </span>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-[#00C27B]" fill="currentColor" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" /></svg>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Spent (YTD)</p>
                        <h3 className="text-4xl font-extrabold text-[#0B1221]">$0</h3>
                    </div>
                    <div className="mt-6 flex items-center">
                        <span className="text-gray-400 text-sm">
                            Last expense: <span className="text-[#0B1221] font-medium">--</span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100">
                <h2 className="text-xl font-bold text-[#0B1221] mb-6">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <Link to="/owner/add-vehicle" className="bg-[#0B1221] text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-900/20 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Add Vehicle
                    </Link>
                    <Link to="/owner/service-history" className="bg-white text-[#0B1221] border border-gray-200 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                        View History
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboard;
