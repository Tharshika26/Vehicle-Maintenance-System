import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const Owners = () => {
    const [owners, setOwners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchOwners = async () => {
        try {
            const response = await api.get('users/');
            const allUsers = response.data;
            const filteredOwners = allUsers.filter(user => user.role === 'owner');
            setOwners(filteredOwners);
        } catch (err) {
            console.error('Error fetching owners:', err);
            setError('Failed to fetch owners.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOwners();
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#0B1221]">Vehicle Owners</h1>
                <p className="text-gray-500 mt-1">Manage and view registered vehicle owners.</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                                <th className="py-4 px-6">Name</th>
                                <th className="py-4 px-6">Vehicle Number</th>
                                <th className="py-4 px-6">Vehicle Type</th>
                                <th className="py-4 px-6">Phone Number</th>
                                <th className="py-4 px-6">City</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            {isLoading ? (
                                <tr><td colSpan="5" className="py-12 text-center text-gray-400">Loading owners...</td></tr>
                            ) : owners.length === 0 ? (
                                <tr><td colSpan="5" className="py-12 text-center text-gray-400">No owners found.</td></tr>
                            ) : (
                                owners.map((owner) => (
                                    <tr key={owner.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6 font-bold text-[#0B1221]">{owner.name || owner.username}</td>
                                        <td className="py-4 px-6">
                                            {owner.vehicles && owner.vehicles.length > 0 ? (
                                                owner.vehicles.map((v, idx) => (
                                                    <div key={idx} className="mb-1">{v.license_plate}</div>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 italic">No Vehicle</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">
                                            {owner.vehicles && owner.vehicles.length > 0 ? (
                                                owner.vehicles.map((v, idx) => (
                                                    <div key={idx} className="mb-1">{v.vehicle_type}</div>
                                                ))
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">{owner.phone || '-'}</td>
                                        <td className="py-4 px-6">{owner.city || '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Owners;
