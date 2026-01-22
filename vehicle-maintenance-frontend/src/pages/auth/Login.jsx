import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import heroCar from '../../assets/hero-car.jpeg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', {
                email: email.trim(),
                password: password.trim()
            }, {
                headers: { "Content-Type": "application/json" }
            });

            const { access, refresh, user } = response.data;
            const userRole = user.role;

            // Store auth data
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('user', JSON.stringify(user));

            // Redirect based on role
            if (userRole === 'admin') {
                navigate('/admin/dashboard');
            } else if (userRole === 'owner') {
                navigate('/owner/dashboard');
            } else {
                // Default fallback
                navigate('/');
            }

        } catch (err) {
            console.error('Login error:', err);
            if (err.response && err.response.data) {
                // Try to get a specific error message from the backend
                const backendError = err.response.data.detail || err.response.data.non_field_errors?.[0] || 'Login failed. Please check your credentials.';
                setError(backendError);
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
            <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 lg:p-16 xl:p-24 z-10 bg-white relative">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-8">
                    <div className="bg-[#00C27B] text-white p-1.5 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.27-3.82c.15-.44.57-.75 1.05-.75h9.36c.48 0 .9.31 1.05.75L19 11H5z" />
                        </svg>
                    </div>
                    <span className="text-[#0B1221] font-bold text-xl tracking-wide">AutoTrack</span>
                </div>

                {/* Form Container */}
                <div className="max-w-md w-full mx-auto">
                    <h1 className="text-4xl font-bold text-[#0B1221] mb-3">Welcome Back</h1>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        Sign in to access your vehicle service history and maintenance tracking.
                    </p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                            <p className="font-bold">Error</p>
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-[#0B1221] font-semibold mb-2 text-sm">Email or Username</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C27B] focus:border-transparent transition text-gray-700 bg-white"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[#0B1221] font-semibold mb-2 text-sm">Password</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input
                                    type="password"
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C27B] focus:border-transparent transition text-gray-700 bg-white"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="........"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-gray-600 cursor-pointer">
                                <input type="checkbox" className="form-checkbox h-4 w-4 text-[#00C27B] border-gray-300 rounded focus:ring-[#00C27B]" />
                                <span className="ml-2">Remember me</span>
                            </label>

                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-[#00C27B] text-white font-bold py-3.5 rounded-xl hover:bg-[#00a669] transition shadow-lg shadow-green-500/30 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 relative flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <span className="relative bg-white px-4 text-sm text-gray-500">Don't have an account?</span>
                    </div>

                    <div className="mt-6 text-center">
                        <Link to="/register" className="text-[#00C27B] font-bold hover:underline">
                            Register here
                        </Link>
                    </div>
                </div>

                <div className="mt-8 text-center lg:text-left text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} Vehicle Maintenance System. All rights reserved.
                </div>
            </div>

            {/* Right Section - Image & Content */}
            <div className="hidden lg:block lg:w-1/2 bg-[#0B1221] relative">
                {/* Curved Divider SVG */}
                <svg className="absolute top-0 left-0 h-full w-24 md:w-32 lg:w-48 text-white z-20 pointer-events-none transform -translate-x-1/2" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M50 0 C30 30 70 70 50 100 L100 100 L100 0 Z" fill="#0B1221" /> {/* Inverse curve to show white underneath if needed, but here we want content over content. Let's try a simple shape mask. */}
                    {/* Better Approach: A standard curve shape overlaying the right side */}
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
                            Full Service History <br />
                            <span className="text-[#00C27B]">At Your Fingertips</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Track repairs, schedule maintenance, and keep your vehicle running like new.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
