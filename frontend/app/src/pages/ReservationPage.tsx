import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourtCard from '../components/CourtCard';
import ReservationCalendar from '../components/ReservationCalendar';

interface TimeSlot {
    time: string;
    available: boolean;
}

interface Court {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    available: boolean;
}

interface Equipment {
    id: string;
    name: string;
    description: string;
    price: number;
    available: boolean;
    imageUrl: string;
}

const ReservationPage: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDuration, setSelectedDuration] = useState<number>(90);
    const [selectedCourt, setSelectedCourt] = useState<string | null>(null);
    const [needsEquipment, setNeedsEquipment] = useState<boolean>(false);
    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

    // Sample courts data
    const courts: Court[] = [
        {
            id: 'court1',
            name: 'Cancha 1',
            description: 'Cancha de padel profesional con paredes de cristal templado y césped artificial de alta calidad.',
            price: 10.000,
            imageUrl: 'assets/imagenes/cancha.webp',
            available: true
        },
        {
            id: 'court2',
            name: 'Cancha 2',
            description: 'Cancha techada ideal para jugar en cualquier condición climática con iluminación profesional.',
            price: 15.000,
            imageUrl: 'assets/imagenes/canchadepadelCerrado.png',
            available: true
        },
        {
            id: 'court3',
            name: 'Cancha 3',
            description: 'Cancha panorámica con vistas al campus y equipada con gradas para espectadores.',
            price: 12.000,
            imageUrl: 'assets/imagenes/canchacongradas.webp ',
            available: true
        }
    ];

    // Sample equipment data
    const equipment: Equipment[] = [
        {
            id: 'eq1',
            name: 'Raqueta Profesional',
            description: 'Raqueta de padel profesional, peso medio',
            price: 5.000,
            available: true,
            imageUrl: 'assets/imagenes/raquetaspadel.png'
        },
        {
            id: 'eq2',
            name: 'Set de Pelotas',
            description: 'Set de 3 pelotas de padel nuevas',
            price: 3.000,
            available: true,
            imageUrl: ''
        },
        {
            id: 'eq3',
            name: 'Malla de Padel',
            description: 'Malla profesional para padel',
            price: 2.500,
            available: true,
            imageUrl: ' '
        }
    ];


    const timeSlots: TimeSlot[] = Array.from({ length: 21 }, (_, i) => {
        const hour = Math.floor(i / 2) + 8;
        const minute = (i % 2) * 30;
        return {
            time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
            available: true
        };
    });

    const handleTimeSelect = (time: string, duration: number) => {
        setSelectedTime(time);
        setSelectedDuration(duration);
        setSelectedCourt(null);
    };

    const handleCourtSelect = (courtId: string) => {
        setSelectedCourt(courtId);
    };

    const toggleEquipment = (equipmentId: string) => {
        setSelectedEquipment(prev =>
            prev.includes(equipmentId)
                ? prev.filter(id => id !== equipmentId)
                : [...prev, equipmentId]
        );
    };

    const calculateTotal = () => {
        let total = 0;

        if (selectedCourt) {
            const court = courts.find(c => c.id === selectedCourt);
            if (court) {
                // Adjust price based on duration
                const hourlyRate = court.price;
                total += (hourlyRate * selectedDuration) / 60;
            }
        }

        selectedEquipment.forEach(eqId => {
            const eq = equipment.find(e => e.id === eqId);
            if (eq) total += eq.price;
        });

        return Math.round(total);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const equipmentList = selectedEquipment.map(eqId =>
            equipment.find(eq => eq.id === eqId)?.name
        ).join(', ');

        alert(
            `Reserva enviada:\nCancha: ${selectedCourt}\nFecha: ${selectedDate.toLocaleDateString()}\nHora: ${selectedTime}\nDuración: ${selectedDuration} minutos\nEquipamiento: ${equipmentList || 'Ninguno'}\nTotal: $${calculateTotal()} CLP`
        );
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-28 pb-16 px-4">
                <div className="container mx-auto">
                    <div className="mb-10 relative">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#071d40] mb-2">
                            Reserva tu cancha
                        </h1>
                        <div className="absolute bottom-0 left-0 w-20 h-1 bg-[#071d40] rounded-full"></div>
                    </div>

                    {/* Step 1: Select Date and Time */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-[#071d40] mb-4">1. Selecciona fecha y hora</h2>
                        <ReservationCalendar
                            selectedDate={selectedDate}
                            onDateChange={setSelectedDate}
                            timeSlots={timeSlots}
                            onTimeSelect={handleTimeSelect}
                        />
                    </div>
                    {/* Step 2: Select Court - Only shown after date and time selection */}
                    {selectedTime && (
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-[#071d40] mb-4">
                                2. Canchas disponibles para {selectedDate.toLocaleDateString()} a las {selectedTime} ({selectedDuration} min)
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courts.map(court => (
                                    <div
                                        key={court.id}
                                        onClick={() => court.available && handleCourtSelect(court.id)}
                                        className={`${
                                            selectedCourt === court.id ? 'ring-2 ring-blue-500' : ''
                                        } ${court.available ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'}`}
                                    >
                                        <CourtCard {...court} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Equipment Selection - Only shown after court selection */}
                    {selectedCourt && (
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-[#071d40] mb-4">3. ¿Necesitas equipamiento?</h2>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => setNeedsEquipment(true)}
                                        className={`px-6 py-3 rounded-md ${
                                            needsEquipment
                                                ? 'bg-[#071d40] text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        Sí, necesito equipamiento
                                    </button>
                                    <button
                                        onClick={() => {
                                            setNeedsEquipment(false);
                                            setSelectedEquipment([]);
                                        }}
                                        className={`px-6 py-3 rounded-md ${
                                            !needsEquipment
                                                ? 'bg-[#071d40] text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        No, tengo mi propio equipamiento
                                    </button>
                                </div>

                                {needsEquipment && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                        {equipment.map(eq => (
                                            <div
                                                key={eq.id}
                                                className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
                                                    selectedEquipment.includes(eq.id) ? 'ring-2 ring-blue-500' : ''
                                                }`}
                                                onClick={() => toggleEquipment(eq.id)}
                                            >
                                                <img
                                                    src={eq.imageUrl}
                                                    alt={eq.name}
                                                    className="w-full h-48 object-cover"
                                                />
                                                <div className="p-4">
                                                    <h3 className="text-lg font-semibold text-[#071d40]">{eq.name}</h3>
                                                    <p className="text-gray-600 text-sm mb-2">{eq.description}</p>
                                                    <p className="text-[#071d40] font-bold">${eq.price} CLP</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Reservation Summary - Only shown after court selection */}
                    {selectedCourt && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-[#071d40] mb-4">Resumen de tu reserva</h3>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <p className="text-sm text-gray-500">Cancha seleccionada</p>
                                    <p className="font-medium">
                                        {courts.find(court => court.id === selectedCourt)?.name || 'No seleccionada'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Fecha</p>
                                    <p className="font-medium">
                                        {selectedDate.toLocaleDateString('es-ES', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Hora y duración</p>
                                    <p className="font-medium">{selectedTime} ({selectedDuration} minutos)</p>
                                </div>

                                {needsEquipment && selectedEquipment.length > 0 && (
                                    <div>
                                        <p className="text-sm text-gray-500">Equipamiento seleccionado</p>
                                        <ul className="list-disc list-inside">
                                            {selectedEquipment.map(eqId => {
                                                const eq = equipment.find(e => e.id === eqId);
                                                return eq && (
                                                    <li key={eqId} className="font-medium">
                                                        {eq.name} - ${eq.price} CLP
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}

                                <div>
                                    <p className="text-sm text-gray-500">Total</p>
                                    <p className="font-medium text-lg">
                                        ${calculateTotal()} CLP
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-[#071d40] text-white py-3 rounded-md hover:bg-[#122e5e] transition duration-300"
                            >
                                Confirmar Reserva
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ReservationPage;