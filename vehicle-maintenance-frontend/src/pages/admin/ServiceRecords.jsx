import React, { useState } from 'react';

const ServiceRecords = () => {
    // Mock Data
    const [records, setRecords] = useState([
        { id: 1, date: '2023-10-01', vehicle: 'ABC-1234', type: 'Oil Change', km: 15000, cost: 50, notes: 'Synthetic Oil' },
        { id: 2, date: '2023-10-15', vehicle: 'XYZ-5678', type: 'Tire Rotation', km: 22000, cost: 30, notes: 'Check pressure' },
        { id: 3, date: '2023-10-20', vehicle: 'LMN-4567', type: 'Brake Inspection', km: 35000, cost: 120, notes: 'Replaced pads' },
    ]);

    // Mock Vehicles List (Simulating database of all owner vehicles)
    const allVehicles = [
        { id: 1, number: 'ABC-1234', owner: 'John Doe' },
        { id: 2, number: 'XYZ-5678', owner: 'Jane Smith' },
        { id: 3, number: 'LMN-4567', owner: 'Mike Ross' },
        { id: 4, number: 'JKL-9012', owner: 'Rachel Zane' }
    ];

    const [newRecord, setNewRecord] = useState({
        date: '',
        vehicle: '',
        type: '',
        km: '',
        cost: '',
        notes: ''
    });

    const handleChange = (e) => {
        setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const record = { id: Date.now(), ...newRecord };
        setRecords([record, ...records]);
        setNewRecord({ date: '', vehicle: '', type: '', km: '', cost: '', notes: '' });
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#0B1221]">Service Records</h1>
                <p className="text-gray-500 mt-1">Manage and track all vehicle service history.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold text-[#0B1221] mb-6">Add New Record</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Vehicle</label>
                                <select
                                    name="vehicle"
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C27B] focus:bg-white transition text-sm font-medium appearance-none"
                                    onChange={handleChange}
                                    value={newRecord.vehicle}
                                    required
                                >
                                    <option value="">Select a Vehicle</option>
                                    {allVehicles.map(v => (
                                        <option key={v.id} value={v.number}>{v.number} - {v.owner}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date</label>
                                <input name="date" type="date" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C27B] focus:bg-white transition text-sm font-medium" onChange={handleChange} value={newRecord.date} required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Service Type</label>
                                <input name="type" placeholder="e.g. Oil Change" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C27B] focus:bg-white transition text-sm font-medium" onChange={handleChange} value={newRecord.type} required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">KM Reading</label>
                                    <input name="km" type="number" placeholder="0" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C27B] focus:bg-white transition text-sm font-medium" onChange={handleChange} value={newRecord.km} required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cost ($)</label>
                                    <input name="cost" type="number" placeholder="0.00" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C27B] focus:bg-white transition text-sm font-medium" onChange={handleChange} value={newRecord.cost} required />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-[#0B1221] text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition shadow-lg shadow-gray-900/20 flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                Add Service Record
                            </button>
                        </form>
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-[#0B1221]">Recent Records</h2>

                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                                        <th className="py-4 px-6">Date</th>
                                        <th className="py-4 px-6">Vehicle</th>
                                        <th className="py-4 px-6">Service</th>
                                        <th className="py-4 px-6">KM</th>
                                        <th className="py-4 px-6">Cost</th>
                                        <th className="py-4 px-6">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700 text-sm">
                                    {records.map((r, index) => (
                                        <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-6 font-medium">{r.date}</td>
                                            <td className="py-4 px-6">
                                                <span className="font-bold text-[#0B1221]">{r.vehicle}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{r.type}</span>
                                                    <span className="text-xs text-gray-400">{r.notes}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-500">{r.km.toLocaleString()} km</td>
                                            <td className="py-4 px-6 font-bold text-[#00C27B]">${r.cost}</td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                                                    Completed
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceRecords;
