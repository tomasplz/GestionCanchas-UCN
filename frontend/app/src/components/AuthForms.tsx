import React, { useState } from 'react';

interface LoginFormProps {
    onSwitchToRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login submitted:', { email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-gray-600 mb-2">
                    Correo Electrónico
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="correo@email.com"
                    className="w-full px-4 py-3 rounded bg-[#0c2a5c] text-white border border-[#153672] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-gray-600 mb-2">
                    Contraseña
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder=" "
                    className="w-full px-4 py-3 rounded bg-[#0c2a5c] text-white border border-[#153672] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full bg-[#153672] text-white py-3 rounded-md hover:bg-[#1c4390] transition duration-300"
                >
                    Iniciar Sesión
                </button>
            </div>

            <div className="text-center text-gray-400">
                <p>
                    ¿No tienes cuenta?
                    <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="text-blue-400 hover:text-blue-300 ml-1">
                        Regístrate
                    </button>
                </p>
            </div>
        </form>
    );
};

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle registration logic here
        console.log('Registration submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="block text-gray-600 mb-2">
                        Nombre
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        className="w-full px-4 py-3 rounded bg-[#0c2a5c] text-white border border-[#153672] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="lastName" className="block text-gray-600 mb-2">
                        Apellido
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        className="w-full px-4 py-3 rounded bg-[#0c2a5c] text-white border border-[#153672] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div>
                <label htmlFor="registerEmail" className="block text-gray-600 mb-2">
                    Correo Electrónico
                </label>
                <input
                    id="registerEmail"
                    name="email"
                    type="email"
                    placeholder="correo@email.com"
                    className="w-full px-4 py-3 rounded bg-[#0c2a5c] text-white border border-[#153672] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="registerPassword" className="block text-gray-600 mb-2">
                    Contraseña
                </label>
                <input
                    id="registerPassword"
                    name="password"
                    type="password"
                    className="w-full px-4 py-3 rounded bg-[#0c2a5c] text-white border border-[#153672] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-gray-600 mb-2">
                    Reescribe tu contraseña
                </label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="w-full px-4 py-3 rounded bg-[#0c2a5c] text-white border border-[#153672] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition duration-300"
                >
                    Registrarse
                </button>
            </div>
        </form>
    );
};

const AuthForms: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

    const switchToRegister = () => {
        setActiveTab('register');
    };
    return (
        <div className="max-w-md w-full mx-auto">
            <div className="flex justify-center mb-8">
                <img src="/assets/imagenes/LogoUcn.jpeg" alt="Logo UCENIN" className="h-24 w-24" />
            </div>

            <h2 className="text-3xl font-bold text-center text-black mb-2">
                Bienvenidos a Canchas UCENIN
            </h2>
            <p className="text-center text-gray-600 mb-8">
                Inician sesión o regístrate para reservar tus canchas
            </p>

            <div className="bg-[#0a1f3d] rounded-lg p-1 mb-6">
                <div className="grid grid-cols-2 gap-1">
                    <button
                        className={`py-3 rounded ${
                            activeTab === 'login'
                                ? 'bg-[#153672] text-white'
                                : 'text-gray-600 hover:text-white'
                        }`}
                        onClick={() => setActiveTab('login')}
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        className={`py-3 rounded ${
                            activeTab === 'register'
                                ? 'bg-black text-white'
                                : 'text-gray-600 hover:text-white'
                        }`}
                        onClick={() => setActiveTab('register')}
                    >
                        Registrarse
                    </button>
                </div>
            </div>

            {activeTab === 'login' ? <LoginForm onSwitchToRegister={switchToRegister}/> : <RegisterForm />}
        </div>
    );
};

export default AuthForms;