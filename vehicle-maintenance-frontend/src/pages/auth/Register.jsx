import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import heroCar from '../../assets/hero-car.jpeg';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        password: '',
        confirmPassword: '',
        role: 'owner' // default role
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/register/', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                city: formData.city,
                password: formData.password,
                role: 'owner' // Force role to owner for public registration
            }, {
                headers: { "Content-Type": "application/json" }
            });

            // Assuming backend returns same structure as login: access, refresh, user
            const { access, refresh, user } = response.data;

            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('user', JSON.stringify(user));

            navigate('/owner/dashboard');

        } catch (err) {
            console.error('Registration error:', err);
            if (err.response && err.response.data) {
                // Handle different error objects
                if (err.response.data.detail) {
                    setError(err.response.data.detail);
                } else {
                    // Start extracting field errors
                    const messages = Object.values(err.response.data).flat();
                    setError(messages[0] || 'Registration failed.');
                }
            } else {
                setError('Network error. Is the backend server running?');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen flex bg-white font-sans overflow-hidden">
            {/* Left Section - Form */}
            <div className="w-full lg:w-1/2 flex flex-col p-6 lg:p-10 z-10 bg-white relative overflow-y-auto no-scrollbar">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="bg-[#00C27B] text-white p-1.5 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.27-3.82c.15-.44.57-.75 1.05-.75h9.36c.48 0 .9.31 1.05.75L19 11H5z" />
                        </svg>
                    </div>
                    <span className="text-[#0B1221] font-bold text-lg tracking-wide">AutoTrack</span>
                </div>

                {/* Form Container */}
                <div className="max-w-md w-full mx-auto flex-grow flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-[#0B1221] mb-1">Create Account</h1>
                    <p className="text-gray-500 mb-5 text-sm">
                        Join as a vehicle owner to track your full service history.
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                            <p className="font-bold">Error</p>
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-3">
                        <div>
                            <label className="block text-[#0B1221] font-semibold mb-1 text-xs">Full Name</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00C27B] focus:border-transparent transition text-gray-700 bg-white text-sm"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[#0B1221] font-semibold mb-1 text-xs">Email Address</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00C27B] focus:border-transparent transition text-gray-700 bg-white text-sm"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[#0B1221] font-semibold mb-1 text-xs">Phone</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00C27B] focus:border-transparent transition text-gray-700 bg-white text-sm"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="(555) 000-0000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[#0B1221] font-semibold mb-1 text-xs">City</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        name="city"
                                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00C27B] focus:border-transparent transition text-gray-700 bg-white text-sm"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="New York"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[#0B1221] font-semibold mb-1 text-xs">Password</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="password"
                                        name="password"
                                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00C27B] focus:border-transparent transition text-gray-700 bg-white text-sm"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="........"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[#0B1221] font-semibold mb-1 text-xs">Confirm</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#00C27B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00C27B] focus:border-transparent transition text-gray-700 bg-white text-sm"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="........"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center text-sm mt-1">
                            <label className="flex items-center text-gray-600 cursor-pointer">
                                <input type="checkbox" className="form-checkbox h-3 w-3 text-[#00C27B] border-gray-300 rounded focus:ring-[#00C27B]" />
                                <span className="ml-2 text-xs">I agree to the <a href="#" className="text-[#00C27B] underline">Terms</a></span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-[#00C27B] text-white font-bold py-2.5 rounded-lg hover:bg-[#00a669] transition shadow-md shadow-green-500/20 mt-3 text-sm ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-4 relative flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <span className="relative bg-white px-2 text-xs text-gray-500">Already have an account?</span>
                    </div>

                    <div className="mt-3 text-center pb-2">
                        <Link to="/login" className="text-[#00C27B] font-bold text-sm hover:underline">
                            Sign In
                        </Link>
                    </div>

                    <div className="text-center text-[10px] text-gray-400">
                        &copy; {new Date().getFullYear()} Vehicle Maintenance System. All rights reserved.
                    </div>
                </div>

            </div>

            {/* Right Section - Image & Content */}
            <div className="hidden lg:block lg:w-1/2 bg-[#0B1221] relative">
                {/* Curved Divider SVG */}
                <svg className="absolute top-0 left-0 h-full w-24 md:w-32 lg:w-48 text-white z-20 pointer-events-none transform -translate-x-1/2" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M50 0 C30 30 70 70 50 100 L100 100 L100 0 Z" fill="#0B1221" />
                </svg>

                {/* Real Curve Implementation */}
                <div className="absolute top-0 bottom-0 -left-1 w-24 md:w-32 lg:w-48 z-10">
                    <svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 0 C 40 20 60 80 0 100 L 0 0 Z" fill="#ffffff" />
                    </svg>
                </div>

                <div className="h-full flex flex-col items-center justify-center relative z-20 px-12 text-center">
                    <div className="max-w-lg">
                        <img
                            src={heroCar}
                            alt="Luxury SUV"
                            className="w-full object-contain mb-12 drop-shadow-2xl opacity-90"
                        />
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Your Vehicle's <br />
                            <span className="text-[#00C27B]">Digital Logbook</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Create an account to securely store your service records and boost your car's resale value.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
