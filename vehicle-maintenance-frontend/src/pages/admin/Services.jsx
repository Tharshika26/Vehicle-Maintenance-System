import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const Services = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentService, setCurrentService] = useState({ name: '', description: '', base_cost: '' });
    const [error, setError] = useState('');

    const API_URL = 'services/';

    const fetchServices = async () => {
        try {
            const response = await api.get(API_URL);
            setServices(response.data);
            setError('');
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to fetch services. Please ensure the backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleChange = (e) => {
        setCurrentService({ ...currentService, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isEditing) {
                await api.put(`${API_URL}${currentService.id}/`, currentService);
            } else {
                await api.post(API_URL, currentService);
            }
            fetchServices();
            resetForm();
        } catch (err) {
            console.error('Submit error:', err);
            setError('Failed to save service. ' + (err.response?.data?.detail || ''));
        }
    };

    const handleEdit = (service) => {
        setCurrentService(service);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service type?')) {
            try {
                await api.delete(`${API_URL}${id}/`);
                fetchServices();
            } catch (err) {
                console.error('Delete error:', err);
                setError('Failed to delete service.');
            }
        }
    };

    const resetForm = () => {
        setCurrentService({ name: '', description: '', base_cost: '' });
        setIsEditing(false);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#0B1221]">Service Catalog</h1>
                <p className="text-gray-500 mt-1">Manage the available service types and their base costs.</p>
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
                        <h2 className="text-xl font-bold text-[#0B1221] mb-6">{isEditing ? 'Edit Service' : 'Add New Service'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Service Name</label>
                                <input
                                    name="name"
                                    placeholder="e.g. Oil Change"
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C27B] focus:bg-white transition text-sm font-medium"
                                    onChange={handleChange}
                                    value={currentService.name}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Brief description..."
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C27B] focus:bg-white transition text-sm font-medium h-24"
                                    onChange={handleChange}
                                    value={currentService.description}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Base Cost (Rs.)</label>
                                <input
                                    name="base_cost"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C27B] focus:bg-white transition text-sm font-medium"
                                    onChange={handleChange}
                                    value={currentService.base_cost}
                                    required
                                />
                            </div>

                            <div className="flex gap-3">
                                <button type="submit" className="flex-1 bg-[#0B1221] text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition flex items-center justify-center gap-2">
                                    {isEditing ? 'Update' : 'Add Service'}
                                </button>
                                {isEditing && (
                                    <button type="button" onClick={resetForm} className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition">
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
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-[#0B1221]">Current Services</h2>
                        </div>
                        {isLoading ? (
                            <div className="p-12 text-center text-gray-400">Loading services...</div>
                        ) : services.length === 0 ? (
                            <div className="p-12 text-center text-gray-400">No services found. Add your first service type.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                                            <th className="py-4 px-6">Service</th>
                                            <th className="py-4 px-6">Base Cost</th>
                                            <th className="py-4 px-6 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700 text-sm">
                                        {services.map((s) => (
                                            <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-[#0B1221]">{s.name}</span>
                                                        <span className="text-xs text-gray-400 truncate max-w-xs">{s.description}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 font-bold text-[#00C27B]">Rs.{parseFloat(s.base_cost).toFixed(2)}</td>
                                                <td className="py-4 px-6 text-right space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(s)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(s.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
