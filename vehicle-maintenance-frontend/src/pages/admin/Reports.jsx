import React from 'react';

const Reports = () => {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#0B1221]">Analytics & Reports</h1>
                <p className="text-gray-500 mt-1">Insights into service performance and revenue.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Chart 1 */}
                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-[#0B1221]">Monthly Revenue</h2>
                        <select className="bg-gray-50 border-gray-200 text-xs font-bold text-gray-500 rounded-lg p-2 focus:outline-none">
                            <option>This Year</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-end justify-between px-4 pb-4 bg-gray-50/50 rounded-xl border border-gray-100 relative">
                        {/* Mock Bar Chart */}
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((height, i) => (
                            <div key={i} className="w-4 bg-blue-100 rounded-t-sm hover:bg-[#00C27B] transition-all relative group" style={{ height: `${height}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0B1221] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    ${height * 100}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs font-bold text-gray-400 uppercase px-4">
                        <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span>
                    </div>
                </div>

                {/* Chart 2 */}
                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-[#0B1221]">Service Type Distribution</h2>
                        <button className="text-[#0B1221] text-xs font-bold hover:underline">Export Data</button>
                    </div>
                    <div className="flex-grow flex items-center justify-center relative">
                        {/* Mock Pie/Donut Chart */}
                        <div className="w-48 h-48 rounded-full border-[16px] border-[#00C27B] border-r-blue-500 border-b-purple-500 border-l-yellow-400 bg-transparent flex items-center justify-center relative">
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-[#0B1221]">1,245</span>
                                <span className="text-xs text-gray-400 font-bold uppercase">Total Services</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#00C27B]"></span>
                            <span className="text-sm text-gray-600">Oil Change (35%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                            <span className="text-sm text-gray-600">Brake Service (25%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                            <span className="text-sm text-gray-600">Tire Rotation (20%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                            <span className="text-sm text-gray-600">Others (20%)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
