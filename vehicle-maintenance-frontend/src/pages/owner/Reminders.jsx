import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const Reminders = () => {
    const [reminders, setReminders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const response = await api.get('reminders/');
                setReminders(response.data);
            } catch (error) {
                console.error('Error fetching reminders:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReminders();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Service Reminders</h1>

            {isLoading ? (
                <div className="text-center text-gray-500 mt-10">Loading reminders...</div>
            ) : (
                <div className="grid gap-4">
                    {reminders.map(reminder => (
                        <div key={reminder.id} className={`p-6 rounded-xl border-l-4 shadow-sm bg-white flex justify-between items-center transition-all hover:shadow-md ${reminder.status === 'Urgent' ? 'border-red-500' : reminder.status === 'Pending' ? 'border-yellow-500' : 'border-[#00C27B]'}`}>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-xl text-gray-900">{reminder.service_name}</h3>
                                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${reminder.status === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-[#00C27B]/10 text-[#00C27B]'}`}>
                                        {reminder.vehicle_type}
                                    </span>
                                </div>
                                <p className="text-gray-600 font-medium">Vehicle Number: {reminder.vehicle_number}</p>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Service Due Date: {reminder.due_date}
                                </p>
                            </div>
                            <div className="text-right">
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${reminder.status === 'Urgent' ? 'bg-red-500 text-white' : reminder.status === 'Pending' ? 'bg-yellow-400 text-yellow-900' : 'bg-[#00C27B]/10 text-[#00C27B]'}`}>
                                    {reminder.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && reminders.length === 0 && (
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center mt-10">
                    <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">No active reminders</h3>
                    <p className="text-gray-500 mt-1">Service reminders will appear here 6 months after your vehicle's maintenance.</p>
                </div>
            )}
        </div>
    );
};

export default Reminders;
