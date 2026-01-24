import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const AddVehicle = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        number: '', brand: '', model: '', vehicle_type: 'Car', fuel: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                license_plate: formData.number,
                brand: formData.brand,
                model: formData.model,
                vehicle_type: formData.vehicle_type
            };

            await api.post('vehicles/', payload);

            navigate('/owner/vehicles');
        } catch (error) {
            console.error('Error adding vehicle:', error);
            alert('Failed to add vehicle. Please try again.');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Add New Vehicle</h1>
            <div className="bg-white p-8 rounded shadow max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Vehicle Number</label>
                            <input name="number" className="w-full border p-2 rounded" onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Brand</label>
                            <input name="brand" className="w-full border p-2 rounded" onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Model</label>
                            <input name="model" className="w-full border p-2 rounded" onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Vehicle Type</label>
                            <select name="vehicle_type" className="w-full border p-2 rounded" onChange={handleChange} required>
                                <option value="">Select Vehicle Type</option>
                                <option value="Car">Car</option>
                                <option value="Bike">Bike</option>
                                <option value="Van">Van</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Fuel Type</label>
                            <select name="fuel" className="w-full border p-2 rounded" onChange={handleChange} required>
                                <option value="">Select Fuel Type</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                    </div>
                    <div className="pt-4">
                        <button type="submit" className="bg-[#0B1221] text-white px-6 py-2 rounded hover:bg-gray-800">Save Vehicle</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVehicle;
