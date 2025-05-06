import React, { useState } from 'react';

interface TimeSlot {
    time: string;
    available: boolean;
}

interface ReservationCalendarProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
    timeSlots: TimeSlot[];
    onTimeSelect: (time: string, duration: number) => void;
}

const ReservationCalendar: React.FC<ReservationCalendarProps> = ({
                                                                     selectedDate,
                                                                     onDateChange,
                                                                     timeSlots,
                                                                     onTimeSelect
                                                                 }) => {
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [duration, setDuration] = useState<number>(90); // Default duration 90 minutes

    // Generate dates for the next 2 weeks, excluding weekends
    const generateDates = () => {
        const dates = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let daysToAdd = 7; // Minimum 1 week in advance

        while (dates.length < 14) { // 2 weeks of available dates
            const date = new Date(today);
            date.setDate(today.getDate() + daysToAdd);

            // Only add weekdays (Monday-Friday)
            if (date.getDay() !== 0 && date.getDay() !== 6) {
                dates.push(date);
            }

            daysToAdd++;
        }

        return dates;
    };

    const dates = generateDates();

    const handleDateClick = (date: Date) => {
        onDateChange(date);
        setSelectedTime(null);
    };

    const handleTimeAndDurationSelect = (time: string) => {
        setSelectedTime(time);
        onTimeSelect(time, duration);
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('es-ES', {
            weekday: 'short',
            day: 'numeric'
        });
    };

    const isSameDate = (date1: Date, date2: Date) => {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-[#071d40] mb-4">Selecciona una fecha y hora</h3>

            {/* Date selection */}
            <div className="mb-6">
                <div className="flex overflow-x-auto pb-2 space-x-2">
                    {dates.map((date, index) => (
                        <button
                            key={index}
                            className={`flex-shrink-0 p-3 rounded-lg ${
                                isSameDate(date, selectedDate)
                                    ? 'bg-[#071d40] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            onClick={() => handleDateClick(date)}
                        >
                            <div className="text-center">
                                <p className="text-xs">{date.toLocaleDateString('es-ES', { weekday: 'short' })}</p>
                                <p className="font-bold">{date.getDate()}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Duration selection */}
            <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Duración de la reserva</h4>
                <div className="flex space-x-2">
                    <button
                        className={`py-2 px-4 rounded ${
                            duration === 90 ? 'bg-[#071d40] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setDuration(90)}
                    >
                        90 min
                    </button>
                    <button
                        className={`py-2 px-4 rounded ${
                            duration === 180 ? 'bg-[#071d40] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setDuration(180)}
                    >
                        180 min
                    </button>
                </div>
            </div>

            {/* Time selection */}
            <div>
                <h4 className="font-medium text-gray-700 mb-3">
                    Horarios disponibles para {formatDate(selectedDate)}
                </h4>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots
                        .filter(slot => {
                            const [hours, minutes] = slot.time.split(':').map(Number);
                            const slotTime = hours * 60 + minutes;
                            return slotTime >= 8 * 60 && slotTime <= 18 * 60 - duration;
                        })
                        .map((slot, index) => (
                            <button
                                key={index}
                                className={`py-2 px-3 rounded text-sm ${
                                    selectedTime === slot.time
                                        ? 'bg-[#071d40] text-white'
                                        : slot.available
                                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                                }`}
                                onClick={() => slot.available && handleTimeAndDurationSelect(slot.time)}
                                disabled={!slot.available}
                            >
                                {slot.time}
                            </button>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ReservationCalendar;