import React from 'react';
import { Link } from 'react-router-dom';


const AdminDashboard = () => {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#0B1221]">Service Center Overview</h1>
                <p className="text-gray-500 mt-1">Monitor performance and manage service requests.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Stats Card 1 */}
                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 19H5V5h14v14z" /></svg>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Vehicles</p>
                        <h3 className="text-4xl font-extrabold text-[#0B1221]">1,245</h3>
                        <span className="text-green-500 text-sm font-bold flex items-center mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12 7a1 1 0 110-2 1 1 0 010 2 5 5 0 01-5 5 1 1 0 01-1-1 7 7 0 1012 0 1 1 0 01-1 1zm-1 2a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                            +12% this month
                        </span>
                    </div>
                </div>

                {/* Stats Card 2 */}
                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-[#00C27B]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Services (Mo)</p>
                        <h3 className="text-4xl font-extrabold text-[#0B1221]">85</h3>
                        <span className="text-gray-400 text-sm mt-2 block">
                            Target: <span className="font-bold text-gray-600">100</span>
                        </span>
                    </div>
                </div>

                {/* Stats Card 3 */}
                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-purple-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Pending</p>
                        <h3 className="text-4xl font-extrabold text-[#0B1221]">12</h3>
                        <span className="text-purple-500 font-bold text-sm mt-2 block">Requires Attention</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-[#0B1221]">Recent Activity</h2>
                    <Link to="/admin/service-records" className="text-[#0B1221] font-bold text-sm hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                                <th className="py-4 px-6">Date</th>
                                <th className="py-4 px-6">Vehicle</th>
                                <th className="py-4 px-6">Service Type</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-6 font-medium">2023-10-25</td>
                                <td className="py-4 px-6">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-[#0B1221]">Toyota Camry</span>
                                        <span className="text-xs text-gray-400">ABC-1234</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">Oil Change</td>
                            </tr>
                            <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-6 font-medium">2023-10-26</td>
                                <td className="py-4 px-6">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-[#0B1221]">Honda Civic</span>
                                        <span className="text-xs text-gray-400">XYZ-5678</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">Brake Inspection</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
