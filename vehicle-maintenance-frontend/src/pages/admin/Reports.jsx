import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import api from '../../api/axios';

const COLORS = ['#0B1221', '#00C27B', '#4F46E5', '#F59E0B', '#EF4444'];

const Reports = () => {
    const [data, setData] = useState({
        monthly_revenue: [],
        service_distribution: []
    });
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await api.get('reports/stats/');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching reports data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#0B1221]">Analytics & Reports</h1>
                <p className="text-gray-500 mt-1">Insights into service performance and revenue.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Chart 1: Revenue Bar Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-[#0B1221]">Monthly Revenue</h2>
                    </div>
                    <div className="h-64 flex items-center justify-center bg-gray-50/50 rounded-xl border border-gray-100 relative p-4">
                        {data.monthly_revenue.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.monthly_revenue}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                                    <Tooltip
                                        cursor={{ fill: '#F3F4F6' }}
                                        formatter={(value) => [`$${value}`, 'Revenue']}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Bar dataKey="revenue" fill="#0B1221" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-gray-400 font-medium">No revenue data available</p>
                        )}
                    </div>
                </div>

                {/* Chart 2: Service Distribution Pie Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-[#0B1221]">Service Type Distribution</h2>
                    </div>
                    <div className="h-64 flex items-center justify-center relative min-h-[200px]">
                        {data.service_distribution.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.service_distribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {data.service_distribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-gray-400 font-medium">No service data available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
