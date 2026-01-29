import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const ServiceHistory = () => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await api.get('service-records/');
            setHistory(response.data);
        } catch (error) {
            console.error('Error fetching service history:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const totalCost = history.reduce((acc, curr) => acc + parseFloat(curr.cost || 0), 0);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Service History</h1>
                <div className="bg-[#00C27B]/10 text-[#00C27B] px-4 py-2 rounded-lg border border-[#00C27B]/20">
                    <span className="font-semibold">Total Maintenance Cost:</span> Rs.{totalCost.toFixed(2)}
                </div>
            </div>

            <div className="bg-white rounded shadow overflow-hidden">
                <table className="min-w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Date</th>
                            <th className="p-3">Vehicle Number</th>
                            <th className="p-3">Vehicle Type</th>
                            <th className="p-3">Service Type</th>
                            <th className="p-3">Cost</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" className="p-6 text-center text-gray-500">Loading service history...</td>
                            </tr>
                        ) : history.length > 0 ? (
                            history.map(record => (
                                <tr key={record.id} className="hover:bg-gray-50">
                                    <td className="p-3 whitespace-nowrap">{record.date}</td>
                                    <td className="p-3">{record.vehicle_plate}</td>
                                    <td className="p-3">{record.vehicle_type}</td>
                                    <td className="p-3">{record.service_name || 'General Service'}</td>
                                    <td className="p-3 font-medium text-green-600">Rs.{record.cost}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-6 text-center text-gray-500">No service records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServiceHistory;
