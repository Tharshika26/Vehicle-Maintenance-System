import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        role: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('auth/user/');
                setProfile(response.data);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Failed to load profile information.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsSaving(true);

        try {
            const response = await api.patch('auth/user/', {
                name: profile.name,
                phone: profile.phone,
                city: profile.city
            });
            setProfile(response.data);
            // Also update localStorage user object if it exists
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            localStorage.setItem('user', JSON.stringify({ ...storedUser, ...response.data }));

            setSuccess('Profile updated successfully!');
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating profile:', err);
            if (err.response && err.response.data) {
                const messages = Object.values(err.response.data).flat();
                setError(messages[0] || 'Failed to update profile.');
            } else {
                setError('Network error. Please try again.');
            }
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00C27B]"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#0B1221]">My Profile</h1>
                    <p className="text-gray-500 mt-1">Manage your account information</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-[#0B1221] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Profile
                    </button>
                )}
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl">
                    <p className="font-bold text-sm">Error</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {success && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-r-xl">
                    <p className="font-bold text-sm">Success</p>
                    <p className="text-sm">{success}</p>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Profile Header Background */}
                <div className="h-32 bg-gradient-to-r from-[#0B1221] to-[#1a2a47]"></div>

                <div className="px-8 pb-8 -mt-12 relative">
                    <div className="flex flex-col md:flex-row md:items-end gap-6 mb-8">
                        <div className="h-32 w-32 rounded-2xl bg-white p-1 shadow-lg">
                            <div className="h-full w-full rounded-xl bg-[#00C27B] flex items-center justify-center text-white text-4xl font-bold">
                                {profile.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div className="mb-2">
                            <h2 className="text-2xl font-bold text-[#0B1221]">{profile.name}</h2>
                            <p className="text-gray-500 flex items-center gap-1 uppercase tracking-widest text-[10px] font-bold">
                                <span className="bg-gray-100 px-2 py-1 rounded-md text-gray-600">{profile.role}</span>
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[#0B1221] font-bold mb-2 text-sm">Full Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00C27B]/20 focus:border-[#00C27B] transition"
                                    required
                                />
                            ) : (
                                <div className="px-4 py-3 rounded-xl bg-gray-50 text-gray-700 font-medium">
                                    {profile.name}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-[#0B1221] font-bold mb-2 text-sm">Email Address</label>
                            <div className="px-4 py-3 rounded-xl bg-gray-50 text-gray-400 font-medium border border-transparent">
                                {profile.email}
                                <span className="ml-2 text-[10px] text-gray-400 font-normal">(Read-only)</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[#0B1221] font-bold mb-2 text-sm">Phone Number</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00C27B]/20 focus:border-[#00C27B] transition"
                                    required
                                />
                            ) : (
                                <div className="px-4 py-3 rounded-xl bg-gray-50 text-gray-700 font-medium">
                                    {profile.phone || 'Not provided'}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-[#0B1221] font-bold mb-2 text-sm">City</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="city"
                                    value={profile.city}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00C27B]/20 focus:border-[#00C27B] transition"
                                    required
                                />
                            ) : (
                                <div className="px-4 py-3 rounded-xl bg-gray-50 text-gray-700 font-medium">
                                    {profile.city || 'Not provided'}
                                </div>
                            )}
                        </div>

                        {isEditing && (
                            <div className="md:col-span-2 flex items-center gap-4 mt-6">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className={`bg-[#00C27B] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#00a669] transition shadow-lg shadow-green-500/20 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setError('');
                                    }}
                                    className="text-gray-500 font-bold hover:text-gray-700 px-4 py-3"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
