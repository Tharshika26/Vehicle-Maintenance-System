import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../api/axios';

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await api.get('vehicles/');
            // Map backend fields to frontend expected fields if necessary, or update frontend usage
            setVehicles(response.data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
        try {
            await api.delete(`vehicles/${id}/`);
            fetchData();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My Vehicles</h1>
                <Link to="/owner/add-vehicle" className="bg-[#0B1221] text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-900/20 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Add Vehicle
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map(vehicle => (
                    <div key={vehicle.id} className="bg-white rounded-lg shadow p-6 relative">
                        <div className="absolute top-4 right-4 space-x-2">
                            <button onClick={() => handleDelete(vehicle.id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{vehicle.brand} {vehicle.model}</h3>
                        <p className="text-gray-500 text-sm mb-4">{vehicle.license_plate}</p>

                        <div className="text-sm text-gray-600 space-y-1">
                            <p><span className="font-semibold">Type:</span> {vehicle.vehicle_type}</p>
                            {/* Fuel not in backend yet */}
                            {/* <p><span className="font-semibold">Fuel:</span> {vehicle.fuel}</p> */}
                        </div>

                        <div className="mt-4 pt-4 border-t">
                            <Link to="/owner/service-history" className="text-blue-600 text-sm hover:underline">View Service History</Link>
                        </div>
                    </div>
                ))}
            </div>

            {vehicles.length === 0 && (
                <div className="text-center text-gray-500 mt-10">No vehicles added yet.</div>
            )}
        </div>
    );
};

export default Vehicles;
