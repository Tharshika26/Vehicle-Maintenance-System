import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceRecords = () => {
    const [records, setRecords] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');

    const [newRecord, setNewRecord] = useState({
        date: new Date().toISOString().split('T')[0],
        vehicle: '',
        service: '',
        kilometers: '',
        cost: '',
        notes: ''
    });

    const API_BASE = 'http://127.0.0.1:8000/api/';
    const token = localStorage.getItem('accessToken');

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [recordsRes, vehiclesRes, servicesRes] = await Promise.all([
                axios.get(`${API_BASE}service-records/`, { headers: { Authorization: `Bearer ${token}` } }),
                axios.get(`${API_BASE}vehicles/`, { headers: { Authorization: `Bearer ${token}` } }),
                axios.get(`${API_BASE}services/`, { headers: { Authorization: `Bearer ${token}` } })
            ]);
            setRecords(recordsRes.data);
            setVehicles(vehiclesRes.data);
            setServices(servicesRes.data);
            setError('');
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to load data from backend.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRecord({ ...newRecord, [name]: value });

        // Auto-fill cost if service type changes and cost is empty
        if (name === 'service' && value && !newRecord.cost) {
            const selectedService = services.find(s => s.id === parseInt(value));
            if (selectedService) {
                setNewRecord(prev => ({ ...prev, service: value, cost: selectedService.base_cost }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isEditing) {
                await axios.put(`${API_BASE}service-records/${newRecord.id}/`, newRecord, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_BASE}service-records/`, newRecord, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchData();
            handleReset();
        } catch (err) {
            console.error('Submit error:', err);
            setError('Failed to save record. ' + (err.response?.data?.detail || ''));
        }
    };

    const handleEdit = (record) => {
        setNewRecord({
            id: record.id,
            date: record.date,
            vehicle: record.vehicle,
            service: record.service,
            kilometers: record.kilometers,
            cost: record.cost,
            notes: record.notes || ''
        });
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await axios.delete(`${API_BASE}service-records/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchData();
            } catch (err) {
                console.error('Delete error:', err);
                setError('Failed to delete record.');
            }
        }
    };

    const handleReset = () => {
        setNewRecord({
            date: new Date().toISOString().split('T')[0],
            vehicle: '',
            service: '',
            kilometers: '',
            cost: '',
            notes: ''
        });
        setIsEditing(false);
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#0B1221]">Service Records</h1>
                <p className="text-gray-500 mt-1">Manage and track all vehicle service history.</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold text-[#0B1221] mb-6">{isEditing ? 'Edit Record' : 'Add New Record'}</h2>
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
                                    {vehicles.map(v => (
                                        <option key={v.id} value={v.id}>{v.license_plate} - {v.owner_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Service Type</label>
                                <select
                                    name="service"
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C27B] focus:bg-white transition text-sm font-medium appearance-none"
                                    onChange={handleChange}
                                    value={newRecord.service}
                                    required
                                >
                                    <option value="">Select Service Type</option>
                                    {services.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date</label>
                                <input
                                    name="date"
                                    type="date"
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C27B] focus:bg-white transition text-sm font-medium"
                                    onChange={handleChange}
                                    value={newRecord.date}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">KM Reading</label>
                                    <input
                                        name="kilometers"
                                        type="number"
                                        placeholder="0"
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C27B] focus:bg-white transition text-sm font-medium"
                                        onChange={handleChange}
                                        value={newRecord.kilometers}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cost (Rs.)</label>
                                    <input
                                        name="cost"
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C27B] focus:bg-white transition text-sm font-medium"
                                        onChange={handleChange}
                                        value={newRecord.cost}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Notes</label>
                                <textarea
                                    name="notes"
                                    placeholder="Additional details..."
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C27B] focus:bg-white transition text-sm font-medium h-20"
                                    onChange={handleChange}
                                    value={newRecord.notes}
                                />
                            </div>

                            <div className="flex gap-3">
                                <button type="submit" className="flex-1 bg-[#0B1221] text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition shadow-lg shadow-gray-900/20 flex items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                    {isEditing ? 'Update Record' : 'Add Record'}
                                </button>
                                {isEditing && (
                                    <button type="button" onClick={handleReset} className="px-6 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-[#0B1221]">Recent Records</h2>
                            <button onClick={fetchData} className="p-2 text-gray-400 hover:text-[#00C27B] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                                        <th className="py-4 px-6">Date</th>
                                        <th className="py-4 px-6">Vehicle</th>
                                        <th className="py-4 px-6">Service</th>
                                        <th className="py-4 px-6">KM</th>
                                        <th className="py-4 px-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700 text-sm">
                                    {isLoading ? (
                                        <tr><td colSpan="5" className="py-12 text-center text-gray-400">Loading records...</td></tr>
                                    ) : records.length === 0 ? (
                                        <tr><td colSpan="5" className="py-12 text-center text-gray-400">No records found.</td></tr>
                                    ) : (
                                        records.map((r) => (
                                            <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6 font-medium whitespace-nowrap">{r.date}</td>
                                                <td className="py-4 px-6">
                                                    <span className="font-bold text-[#0B1221]">{r.vehicle_plate}</span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-[#00C27B] font-bold">Rs.{r.cost}</span>
                                                        <span className="text-xs text-gray-500">{r.service_name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-gray-500">{parseInt(r.kilometers).toLocaleString()} km</td>
                                                <td className="py-4 px-6 text-right space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(r)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(r.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
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
