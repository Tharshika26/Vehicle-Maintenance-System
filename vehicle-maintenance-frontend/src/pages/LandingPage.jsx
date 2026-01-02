import React from 'react';
import { Link } from 'react-router-dom';
import heroCar from '../assets/hero-car.jpeg';

const LandingPage = () => {
    return (
        <div className="font-sans text-gray-800">
            {/* Navbar */}
            <nav className="bg-[#0B1221] py-4 px-6 md:px-12 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.27-3.82c.15-.44.57-.75 1.05-.75h9.36c.48 0 .9.31 1.05.75L19 11H5z" />
                        </svg>
                    </div>
                    <span className="text-white font-bold text-lg tracking-wide">AUTOTRACK</span>
                </div>

                <div className="hidden md:flex space-x-8 text-sm text-gray-300">
                    <a href="#" className="hover:text-white transition">Home</a>
                    <a href="#features" className="hover:text-white transition">Features</a>
                    <a href="#howitworks" className="hover:text-white transition">How It Works</a>
                </div>

                <div className="flex space-x-3">
                    <Link to="/login" className="px-5 py-2 bg-[#00C27B] text-white text-sm font-semibold rounded-full hover:bg-[#00a669] transition">
                        Login
                    </Link>
                    <Link to="/register" className="px-5 py-2 bg-white text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-100 transition">
                        Register
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative bg-[#0B1221] overflow-hidden pb-32 pt-16 md:pt-24 px-6 md:px-12">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="z-10">
                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                            Manage Your <br />
                            <span className="italic font-light">Vehicle</span> <br />
                            <span className="italic font-light text-gray-300">Maintenance</span> <br />
                            Digitally
                        </h1>
                        <p className="text-gray-400 text-lg mb-8 max-w-md">
                            Track service history, maintenance costs, and upcoming service reminders in one seamless dashboard. Never miss an oil change again.
                        </p>
                        <Link to="/register" className="inline-block px-8 py-3 bg-[#00C27B] text-white font-bold rounded-md hover:bg-[#00a669] transition shadow-lg shadow-green-900/20">
                            Register Now
                        </Link>
                    </div>
                    <div className="relative z-10 flex justify-center md:justify-end">
                        <img
                            src={heroCar}
                            alt="White Luxury SUV"
                            className="w-full max-w-lg object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>

                {/* Slanted Background Shape */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg className="relative block w-full h-[100px] md:h-[150px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200 120L0 16.48V0h1200v120z" className="fill-[#0B1221]"></path>
                        <path d="M0,120 L1200,60 L1200,120 Z" className="fill-white"></path>
                    </svg>
                </div>
            </header>

            {/* Welcome & Features Section */}
            <section id="features" className="py-20 px-6 md:px-12 bg-white text-center">
                <div className="container mx-auto">
                    <p className="text-gray-500 text-sm font-bold tracking-widest uppercase mb-2">Helps you to manage your car easily</p>
                    <h2 className="text-4xl font-bold text-gray-900 mb-16">
                        Welcome to <span className="text-[#00C27B]">AutoTrack</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Feature 1 */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 mb-6 text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">DIGITAL VEHICLE RECORDS</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                                Securely store all your documents, from registration to insurance, in one accessible digital location for complete peace of mind.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 mb-6 text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">SERVICE HISTORY TRACKING</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                                Maintain a comprehensive log of all maintenance and repairs to boost your vehicle's resale value and track its health.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 mb-6 text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">SMART REMINDERS</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                                Never miss a service again with automated alerts for oil changes, tire rotations, and insurance renewals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="howitworks" className="py-20 px-6 md:px-12 bg-white text-center relative overflow-hidden">
                <div className="container mx-auto relative">
                    <h2 className="text-4xl font-extrabold text-[#0B1221] mb-4">How It Works</h2>
                    <p className="text-gray-500 mb-20 max-w-xl mx-auto">Get started in minutes and secure your vehicle's history forever.</p>

                    {/* Curved Dotted Line SVG - Desktop Only */}
                    <div className="hidden md:block absolute top-[160px] left-0 w-full h-24 pointer-events-none z-0 px-12 opacity-50">
                        <svg className="w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none" fill="none">
                            <path d="M 200,50 Q 400,90 600,50 Q 800,90 1000,50" stroke="#94A3B8" strokeWidth="2" strokeDasharray="8 8" strokeLinecap="round" />
                        </svg>
                    </div>

                    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Step 1 */}
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 relative group transition-transform hover:-translate-y-1">
                                <span className="absolute top-0 left-1 bg-white text-[#0B1221] border border-gray-100 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-sm z-20">1</span>
                                <div className="p-4 bg-gray-50 rounded-full">
                                    {/* User Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0B1221]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-[#0B1221] mb-3">Create Account</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">Sign up for free as a vehicle owner or register your service center.</p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 relative group transition-transform hover:-translate-y-1">
                                <span className="absolute top-0 left-1 bg-white text-[#0B1221] border border-gray-100 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-sm z-20">2</span>
                                <div className="p-4 bg-gray-50 rounded-full">
                                    {/* Car Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0B1221]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h18M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6M3 13l2-7a2 2 0 012-1.7h10a2 2 0 012 1.7l2 7M9 17h6" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-[#0B1221] mb-3">Add Vehicle</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">Enter your VIN to automatically pull specs or add details manually.</p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 relative group transition-transform hover:-translate-y-1">
                                <span className="absolute top-0 left-1 bg-white text-[#0B1221] border border-gray-100 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-sm z-20">3</span>
                                <div className="p-4 bg-gray-50 rounded-full">
                                    {/* Wrench/Tools Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0B1221]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-[#0B1221] mb-3">Log & Reminders</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">Upload receipts, get alerts, and relax knowing your car is covered.</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#1e2532] text-white py-12 px-6 md:px-12 border-t border-gray-700">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="text-[#00C27B]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" />
                                </svg>
                            </div>
                            <span className="font-bold text-md tracking-wide">AUTOTRACK</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            The smartest way to manage vehicle maintenance, track costs, and increase resale value.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 uppercase tracking-wider text-xs text-gray-300">Product</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">Features</a></li>
                            <li><a href="#" className="hover:text-white">Pricing</a></li>
                            <li><a href="#" className="hover:text-white">For Mechanics</a></li>
                            <li><a href="#" className="hover:text-white">API</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 uppercase tracking-wider text-xs text-gray-300">Company</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">About Us</a></li>
                            <li><a href="#" className="hover:text-white">Blog</a></li>
                            <li><a href="#" className="hover:text-white">Careers</a></li>
                            <li><a href="#" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 uppercase tracking-wider text-xs text-gray-300">Legal</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="container mx-auto mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; 2023 AutoTrack Systems. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        {/* Social Icons Placeholder */}
                        <a href="#" className="hover:text-white">FB</a>
                        <a href="#" className="hover:text-white">LN</a>
                        <a href="#" className="hover:text-white">IG</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
