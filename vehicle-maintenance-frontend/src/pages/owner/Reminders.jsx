import React from 'react';

const Reminders = () => {
    const reminders = [];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Service Reminders</h1>

            <div className="grid gap-4">
                {reminders.map(reminder => (
                    <div key={reminder.id} className={`p-4 rounded-lg border-l-4 shadow bg-white flex justify-between items-center ${reminder.status === 'Urgent' ? 'border-red-500' : 'border-yellow-500'}`}>
                        <div>
                            <h3 className="font-bold text-lg">{reminder.type}</h3>
                            <p className="text-gray-600">{reminder.vehicle}</p>
                            <p className="text-sm text-gray-500">Due: {reminder.dueDate}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${reminder.status === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                            {reminder.status}
                        </span>
                    </div>
                ))}
            </div>

            {reminders.length === 0 && (
                <div className="text-center text-gray-500 mt-10">No active reminders.</div>
            )}
        </div>
    );
};

export default Reminders;
