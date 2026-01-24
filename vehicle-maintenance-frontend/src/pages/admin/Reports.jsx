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
                    <div className="h-64 flex items-center justify-center bg-gray-50/50 rounded-xl border border-gray-100 relative">
                        <p className="text-gray-400 font-medium">No revenue data available</p>
                    </div>
                </div>

                {/* Chart 2 */}
                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-[#0B1221]">Service Type Distribution</h2>
                        <button className="text-[#0B1221] text-xs font-bold hover:underline">Export Data</button>
                    </div>
                    <div className="flex-grow flex items-center justify-center relative min-h-[200px]">
                        <p className="text-gray-400 font-medium">No service data available</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
