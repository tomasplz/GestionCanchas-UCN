import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../service/authService';
import { useAuth } from '../context/AuthContext';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const AuthForms: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { signIn } = useAuth();

    const validateLogin = () => {
        const newErrors: Record<string, string> = {};
        if (!loginData.email) newErrors.email = 'El correo es requerido';
        else if (!/\S+@\S+\.\S+/.test(loginData.email)) newErrors.email = 'Correo inválido';
        if (!loginData.password) newErrors.password = 'La contraseña es requerida';
        return newErrors;
    };

    const validateRegister = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.firstName) newErrors.firstName = 'El nombre es requerido';
        if (!formData.lastName) newErrors.lastName = 'El apellido es requerido';
        if (!formData.email) newErrors.email = 'El correo es requerido';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Correo inválido';
        if (!formData.password) newErrors.password = 'La contraseña es requerida';
        else if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
        return newErrors;
    };

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateLogin();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);
        try {
            await signIn(loginData.email, loginData.password);
            // Redirigir al inicio en lugar del perfil
            navigate('/');
        } catch (err: any) {
            setErrors({ apiError: err.message || 'Error al iniciar sesión' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateRegister();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);
        try {
            const fullName = `${formData.firstName} ${formData.lastName}`;
            await register(fullName, formData.email, formData.password);
            setActiveTab('login');
            setLoginData({ email: formData.email, password: '' });
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            setErrors({});
            alert('Registro exitoso! Por favor inicia sesión');
        } catch (err: any) {
            setErrors({ apiError: err.message || 'Error al registrarse' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-center mb-4">
                <img
                    src="/assets/imagenes/LogoUcn.jpeg"
                    alt="Logo UCENIN"
                    className="h-16 w-16 object-contain"
                />
            </div>

            <h2 className="text-xl font-bold text-center text-gray-800 mb-1">
                Bienvenido a Canchas UCENIN
            </h2>
            <p className="text-center text-gray-600 mb-4">
                {activeTab === 'login' ? 'Inicia sesión para continuar' : 'Crea una cuenta para reservar'}
            </p>

            {/* Tab Selector */}
            <div className="flex mb-4 border-b border-gray-200">
                <button
                    className={`flex-1 py-2 font-medium ${
                        activeTab === 'login'
                            ? 'bg-[#153672] text-white'
                            : 'text-gray-600 hover:text-white'
                    }`}
                    onClick={() => {
                        setActiveTab('login');
                        setErrors({});
                    }}
                >
                    Iniciar Sesión
                </button>
                <button
                    className={`flex-1 py-2 font-medium ${
                        activeTab === 'register'
                            ? 'bg-[#153672] text-white'
                            : 'text-gray-600 hover:text-white'
                    }`}
                    onClick={() => {
                        setActiveTab('register');
                        setErrors({});
                    }}
                >
                    Registrarse
                </button>
            </div>

            {/* Error Message */}
            {errors.apiError && (
                <div className="mb-3 p-2 bg-red-100 text-red-700 rounded-md text-sm">
                    {errors.apiError}
                </div>
            )}

            {/* Login Form */}
            {activeTab === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-3">
                    <div>
                        <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="tucorreo@ejemplo.com"
                            className={`w-full px-3 py-2 text-sm rounded-md border ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            } focus:ring-[#0A1838] focus:border-[#0A1838]`}
                            value={loginData.email}
                            onChange={handleLoginChange}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className={`w-full px-3 py-2  text-sm rounded-md border ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            } focus:ring-[#0A1838] focus:border-[#0A1838]`}
                            value={loginData.password}
                            onChange={handleLoginChange}
                        />
                        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                    </div>

                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-3 w-3 text-[#0A1838] focus:ring-[#0A1838] border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 text-gray-700">
                                Recordarme
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-[#0A1838] hover:text-[#122752]">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0A1838] hover:bg-[#122752] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A1838] ${
                                isLoading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Procesando...
                                </>
                            ) : 'Iniciar Sesión'}
                        </button>
                    </div>

                    <div className="text-center text-xs text-gray-600 pt-2">
                        <p>
                            ¿No tienes una cuenta?{' '}
                            <button
                                type="button"
                                onClick={() => setActiveTab('register')}
                                className="font-medium text-[#0A1838] hover:text-[#122752]"
                            >
                                Regístrate
                            </button>
                        </p>
                    </div>
                </form>
            )}

            {/* Register Form */}
            {activeTab === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label htmlFor="firstName" className="block text-xs font-medium text-gray-700 mb-1">
                                Nombre
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                className={`w-full px-3 py-2 rounded-md border ${
                                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-[#0A1838] focus:border-[#0A1838]`}
                                value={formData.firstName}
                                onChange={handleRegisterChange}
                            />
                            {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-xs font-medium text-gray-700 mb-1">
                                Apellido
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                className={`w-full px-3 py-2 text-sm rounded-md border ${
                                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-[#0A1838] focus:border-[#0A1838]`}
                                value={formData.lastName}
                                onChange={handleRegisterChange}
                            />
                            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="registerEmail" className="block text-xs font-medium text-gray-700 mb-1">
                            Correo Electrónico
                        </label>
                        <input
                            id="registerEmail"
                            name="email"
                            type="email"
                            placeholder="tucorreo@ejemplo.com"
                            className={`w-full px-3 py-2 text-sm rounded-md border ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            } focus:ring-[#0A1838] focus:border-[#0A1838]`}
                            value={formData.email}
                            onChange={handleRegisterChange}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="registerPassword" className="block text-xs font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            id="registerPassword"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className={`w-full px-3 py-2 text-sm rounded-md border ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            } focus:ring-[#0A1838] focus:border-[#0A1838]`}
                            value={formData.password}
                            onChange={handleRegisterChange}
                        />
                        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700 mb-1">
                            Confirmar Contraseña
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            className={`w-full px-3 py-2 text-sm rounded-md border ${
                                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                            } focus:ring-[#0A1838] focus:border-[#0A1838]`}
                            value={formData.confirmPassword}
                            onChange={handleRegisterChange}
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            className="h-3 w-3 text-[#0A1838] focus:ring-[#0A1838] border-gray-300 rounded"
                            required
                        />
                        <label htmlFor="terms" className="ml-2 text-xs text-gray-700">
                            Acepto los <a href="#" className="text-[#0A1838] hover:text-[#122752]">Términos y Condiciones</a>
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0A1838] hover:bg-[#122752] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A1838] ${
                                isLoading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Procesando...
                                </>
                            ) : 'Registrarse'}
                        </button>
                    </div>

                    <div className="text-center text-xs text-gray-600">
                        <p>
                            ¿Ya tienes una cuenta?{' '}
                            <button
                                type="button"
                                onClick={() => setActiveTab('login')}
                                className="font-medium text-[#0A1838] hover:text-[#122752]"
                            >
                                Inicia sesión
                            </button>
                        </p>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AuthForms;