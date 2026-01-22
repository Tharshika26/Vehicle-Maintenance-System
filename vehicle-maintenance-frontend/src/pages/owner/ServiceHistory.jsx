import React from 'react';

const ServiceHistory = () => {
    // Mock Data
    const history = [
        { id: 1, date: '2023-10-01', vehicle: 'ABC-1234', type: 'Oil Change', km: 15000, cost: 50, notes: 'Synthetic Oil' },
        { id: 2, date: '2023-08-15', vehicle: 'ABC-1234', type: 'General Service', km: 10000, cost: 120, notes: 'Filter replacement' },
        { id: 3, date: '2023-09-10', vehicle: 'XYZ-5678', type: 'Tire Replacement', km: 25000, cost: 400, notes: '4 New Tires' },
    ];

    const totalCost = history.reduce((acc, curr) => acc + curr.cost, 0);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Service History</h1>
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                    <span className="font-semibold">Total Maintenance Cost:</span> Rs.{totalCost}
                </div>
            </div>

            <div className="bg-white rounded shadow overflow-hidden">
                <table className="min-w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Date</th>
                            <th className="p-3">Vehicle</th>
                            <th className="p-3">Service Type</th>
                            <th className="p-3">Cost</th>
                            <th className="p-3">Notes</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {history.map(record => (
                            <tr key={record.id} className="hover:bg-gray-50">
                                <td className="p-3 whitespace-nowrap">{record.date}</td>
                                <td className="p-3">{record.vehicle}</td>
                                <td className="p-3">{record.type}</td>
                                <td className="p-3 font-medium text-green-600">Rs.{record.cost}</td>
                                <td className="p-3 text-sm text-gray-500">{record.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServiceHistory;
