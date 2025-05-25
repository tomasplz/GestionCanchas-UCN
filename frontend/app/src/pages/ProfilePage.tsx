import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CreditCard, Key, History, Wallet, Edit2, Plus, Eye, EyeOff } from 'lucide-react';

// Interfaces para tipado
interface Card {
    id: string;
    brand: string;
    last4: string;
    expiry: string;
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    balance: number;
    cards?: Card[];
}

interface Reservation {
    id: string;
    court: string;
    date: string;
    time: string;
    duration: number;
    total: number;
    equipment?: string[];
}

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { user,isAuthenticated , isLoading:authLoading } = useAuth();
    const [activeTab, setActiveTab] = useState<'info' | 'security' | 'payments' | 'history'>('info');
    const [showBalance, setShowBalance] = useState(false);
    const [showAddCard, setShowAddCard] = useState(false);
    const [showTopUp, setShowTopUp] = useState(false);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            // Redirigir a la página de autenticación si no está autenticado
            navigate('/auth');
        
    }
        // Función para cargar reservaciones (descomentada y mejorada)
        const fetchReservations = async () => {
            try {
                setLoading(true);
                // Aquí deberías hacer la llamada real a tu API o Supabase
                // const { data, error } = await 
                //     .from('reservations')
                //     .select('*')
                //     .eq('user_id', user.id)
                //     .order('date', { ascending: false });

                // if (error) throw error;
                // setReservations(data || []);

                // Datos de ejemplo mientras implementas la API
                const mockReservations: Reservation[] = [
                    {
                        id: '1',
                        court: 'Cancha 1',
                        date: '2024-01-15',
                        time: '10:00',
                        duration: 60,
                        total: 50000,
                        equipment: ['Raqueta', 'Pelotas']
                    }
                ];
                setReservations(mockReservations);
            } catch (err) {
                setError('Error al cargar las reservaciones');
                console.error('Error fetching reservations:', err);
            } finally {
                setLoading(false);
            }
        };
        if (isAuthenticated && user) {
        fetchReservations();
        }
    }, [isAuthenticated, authLoading,navigate, user]);

    if(authLoading) {
        return ( <div>Cargando...</div>)}
    if (!isAuthenticated ){return null;}  

    const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const currentPassword = formData.get('currentPassword') as string;
        const newPassword = formData.get('newPassword') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        // Validaciones
        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (newPassword.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await updatePassword(newPassword);
            alert('Contraseña actualizada exitosamente');
            form.reset();
        } catch (error) {
            setError('Error al actualizar la contraseña');
            console.error('Password update error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCard = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        
        const cardData = {
            number: formData.get('cardNumber') as string,
            expiry: formData.get('expiry') as string,
            cvv: formData.get('cvv') as string,
        };

        try {
            setLoading(true);
            setError(null);
            // Aquí implementarías la lógica para agregar la tarjeta
            // await addCardToUser(cardData);
            
            console.log('Adding card:', cardData);
            setShowAddCard(false);
            form.reset();
            // Recargar datos del usuario si es necesario
        } catch (error) {
            setError('Error al agregar la tarjeta');
            console.error('Add card error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTopUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        
        const amount = parseFloat(formData.get('amount') as string);
        const cardId = formData.get('cardId') as string;

        if (amount <= 0) {
            setError('El monto debe ser mayor a 0');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            // Aquí implementarías la lógica para recargar saldo
            // await topUpBalance(amount, cardId);
            
            console.log('Top up:', { amount, cardId });
            setShowTopUp(false);
            form.reset();
            // Recargar datos del usuario si es necesario
        } catch (error) {
            setError('Error al recargar el saldo');
            console.error('Top up error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveCard = async (cardId: string) => {
        if (!confirm('¿Estás seguro de que quieres eliminar esta tarjeta?')) {
            return;
        }

        try {
            setLoading(true);
            setError(null);
            // Aquí implementarías la lógica para eliminar la tarjeta
            // await removeCardFromUser(cardId);
            
            console.log('Removing card:', cardId);
            // Recargar datos del usuario si es necesario
        } catch (error) {
            setError('Error al eliminar la tarjeta');
            console.error('Remove card error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#071d40]"></div>
                    <p className="mt-4 text-gray-600">Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow pt-24 pb-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    {/* Mostrar errores */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            {error}
                            <button 
                                onClick={() => setError(null)}
                                className="float-right font-bold"
                            >
                                ×
                            </button>
                        </div>
                    )}

                    {/* Header del perfil */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-[#071d40] rounded-full flex items-center justify-center text-white text-2xl">
                                {user.firstName?.[0]}{user.lastName?.[0]}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-[#071d40]">
                                    {user.firstName} {user.lastName}
                                </h1>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Sidebar Navigation */}
                        <div className="space-y-2">
                            <button
                                onClick={() => setActiveTab('info')}
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                                    activeTab === 'info' ? 'bg-[#071d40] text-white' : 'bg-white hover:bg-gray-50'
                                }`}
                            >
                                <Edit2 className="h-5 w-5" />
                                <span>Información Personal</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('security')}
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                                    activeTab === 'security' ? 'bg-[#071d40] text-white' : 'bg-white hover:bg-gray-50'
                                }`}
                            >
                                <Key className="h-5 w-5" />
                                <span>Seguridad</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('payments')}
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                                    activeTab === 'payments' ? 'bg-[#071d40] text-white' : 'bg-white hover:bg-gray-50'
                                }`}
                            >
                                <Wallet className="h-5 w-5" />
                                <span>Pagos</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('history')}
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                                    activeTab === 'history' ? 'bg-[#071d40] text-white' : 'bg-white hover:bg-gray-50'
                                }`}
                            >
                                <History className="h-5 w-5" />
                                <span>Historial</span>
                            </button>
                        </div>

                        {/* Main Content */}
                        <div className="md:col-span-3">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                {/* Loading overlay */}
                                {loading && (
                                    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#071d40]"></div>
                                    </div>
                                )}

                                {/* Personal Information */}
                                {activeTab === 'info' && (
                                    <div>
                                        <h2 className="text-xl font-semibold mb-6">Información Personal</h2>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Nombre
                                                </label>
                                                <input
                                                    type="text"
                                                    value={user.firstName || ''}
                                                    className="w-full px-4 py-2 border rounded-md bg-gray-50"
                                                    disabled
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Apellido
                                                </label>
                                                <input
                                                    type="text"
                                                    value={user.lastName || ''}
                                                    className="w-full px-4 py-2 border rounded-md bg-gray-50"
                                                    disabled
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Correo Electrónico
                                                </label>
                                                <input
                                                    type="email"
                                                    value={user.email || ''}
                                                    className="w-full px-4 py-2 border rounded-md bg-gray-50"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Security Settings */}
                                {activeTab === 'security' && (
                                    <div>
                                        <h2 className="text-xl font-semibold mb-6">Cambiar Contraseña</h2>
                                        <form onSubmit={handlePasswordChange} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Contraseña Actual
                                                </label>
                                                <input
                                                    type="password"
                                                    name="currentPassword"
                                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#071d40] focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Nueva Contraseña
                                                </label>
                                                <input
                                                    type="password"
                                                    name="newPassword"
                                                    minLength={6}
                                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#071d40] focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Confirmar Nueva Contraseña
                                                </label>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    minLength={6}
                                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#071d40] focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-[#071d40] text-white py-2 rounded-md hover:bg-[#122e5e] transition disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
                                            </button>
                                        </form>
                                    </div>
                                )}

                                {/* Payment Methods and Balance */}
                                {activeTab === 'payments' && (
                                    <div>
                                        <h2 className="text-xl font-semibold mb-6">Métodos de Pago y Saldo</h2>

                                        {/* Balance */}
                                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-sm text-gray-600">Tu saldo actual</p>
                                                    <p className="text-2xl font-bold text-[#071d40] flex items-center">
                                                        ${showBalance ? (user.balance || 0).toLocaleString() : '****'}
                                                        <button
                                                            onClick={() => setShowBalance(!showBalance)}
                                                            className="ml-2 hover:bg-gray-200 p-1 rounded"
                                                        >
                                                            {showBalance ? (
                                                                <EyeOff className="h-5 w-5 text-gray-500" />
                                                            ) : (
                                                                <Eye className="h-5 w-5 text-gray-500" />
                                                            )}
                                                        </button>
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => setShowTopUp(true)}
                                                    className="bg-[#071d40] text-white px-4 py-2 rounded-md hover:bg-[#122e5e] transition flex items-center"
                                                >
                                                    <Plus className="h-5 w-5 mr-2" />
                                                    Recargar
                                                </button>
                                            </div>
                                        </div>

                                        {/* Cards */}
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-lg font-medium">Tarjetas guardadas</h3>
                                                <button
                                                    onClick={() => setShowAddCard(true)}
                                                    className="text-[#071d40] hover:text-[#122e5e] transition flex items-center"
                                                >
                                                    <Plus className="h-5 w-5 mr-1" />
                                                    Agregar tarjeta
                                                </button>
                                            </div>

                                            {user.cards && user.cards.length > 0 ? (
                                                user.cards.map(card => (
                                                    <div
                                                        key={card.id}
                                                        className="border rounded-lg p-4 flex items-center justify-between"
                                                    >
                                                        <div className="flex items-center">
                                                            <CreditCard className="h-6 w-6 text-gray-500 mr-3" />
                                                            <div>
                                                                <p className="font-medium">
                                                                    {card.brand} terminada en {card.last4}
                                                                </p>
                                                                <p className="text-sm text-gray-500">Expira: {card.expiry}</p>
                                                            </div>
                                                        </div>
                                                        <button 
                                                            onClick={() => handleRemoveCard(card.id)}
                                                            className="text-red-500 hover:text-red-600 text-sm transition"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-500 text-center py-4">No tienes tarjetas guardadas</p>
                                            )}
                                        </div>

                                        {/* Add Card Modal */}
                                        {showAddCard && (
                                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                                                    <h3 className="text-lg font-semibold mb-4">Agregar nueva tarjeta</h3>
                                                    <form onSubmit={handleAddCard} className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Número de tarjeta
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="cardNumber"
                                                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#071d40] focus:border-transparent"
                                                                placeholder="1234 5678 9012 3456"
                                                                maxLength={19}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Fecha de expiración
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="expiry"
                                                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#071d40] focus:border-transparent"
                                                                    placeholder="MM/YY"
                                                                    maxLength={5}
                                                                    required
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    CVV
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="cvv"
                                                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#071d40] focus:border-transparent"
                                                                    placeholder="123"
                                                                    maxLength={4}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end space-x-3 mt-6">
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowAddCard(false)}
                                                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
                                                            >
                                                                Cancelar
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                disabled={loading}
                                                                className="bg-[#071d40] text-white px-4 py-2 rounded-md hover:bg-[#122e5e] transition disabled:opacity-50"
                                                            >
                                                                {loading ? 'Agregando...' : 'Agregar'}
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        )}

                                        {/* Top Up Modal */}
                                        {showTopUp && (
                                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                                                    <h3 className="text-lg font-semibold mb-4">Recargar saldo</h3>
                                                    <form onSubmit={handleTopUp} className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Monto a recargar
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="amount"
                                                                min="1"
                                                                step="1000"
                                                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#071d40] focus:border-transparent"
                                                                placeholder="10000"
                                                                required
                                                            />
                                                        </div>
                                                        {user.cards && user.cards.length > 0 && (
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Seleccionar tarjeta
                                                                </label>
                                                                <select 
                                                                    name="cardId"
                                                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#071d40] focus:border-transparent"
                                                                    required
                                                                >
                                                                    <option value="">Selecciona una tarjeta</option>
                                                                    {user.cards.map(card => (
                                                                        <option key={card.id} value={card.id}>
                                                                            {card.brand} terminada en {card.last4}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        )}
                                                        <div className="flex justify-end space-x-3 mt-6">
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowTopUp(false)}
                                                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
                                                            >
                                                                Cancelar
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                disabled={loading || !user.cards || user.cards.length === 0}
                                                                className="bg-[#071d40] text-white px-4 py-2 rounded-md hover:bg-[#122e5e] transition disabled:opacity-50"
                                                            >
                                                                {loading ? 'Recargando...' : 'Recargar'}
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Reservation History */}
                                {activeTab === 'history' && (
                                    <div>
                                        <h2 className="text-xl font-semibold mb-6">Historial de Reservas</h2>
                                        <div className="space-y-4">
                                            {reservations.length > 0 ? (
                                                reservations.map(reservation => (
                                                    <div
                                                        key={reservation.id}
                                                        className="border rounded-lg p-4"
                                                    >
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <h3 className="font-medium">{reservation.court}</h3>
                                                                <p className="text-sm text-gray-600">
                                                                    {new Date(reservation.date).toLocaleDateString('es-ES', {
                                                                        weekday: 'long',
                                                                        year: 'numeric',
                                                                        month: 'long',
                                                                        day: 'numeric'
                                                                    })}
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    {reservation.time} ({reservation.duration} minutos)
                                                                </p>
                                                            </div>
                                                            <p className="font-medium">${reservation.total.toLocaleString()}</p>
                                                        </div>
                                                        {reservation.equipment && reservation.equipment.length > 0 && (
                                                            <div className="mt-2">
                                                                <p className="text-sm text-gray-600">
                                                                    Equipamiento: {reservation.equipment.join(', ')}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-8">
                                                    <History className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                                    <p className="text-gray-500">No tienes reservas registradas</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProfilePage;