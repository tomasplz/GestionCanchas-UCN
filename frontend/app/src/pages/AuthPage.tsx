import { useEffect, type FC } from 'react';
import { Link } from 'react-router-dom';
import AuthForms from '../components/AuthForms';

const AuthPage: FC = () => {
    useEffect(() => {
        document.title = "Canchas UCENIN - Iniciar sesión o registrarse";
    }, []);

    return (
        <div className="relative min-h-screen">
            <div
                className="fixed inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/assets/imagenes/canchapadel1.webp')"
                }}
            >
                <div className="absolute inset-0 bg-[#0A1838]/80"></div>
            </div>

            {/* Contenido de autenticación */}
            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Header con botón de volver */}
                <div className="py-4 px-4">
                    <Link
                        to="/"
                        className="text-white hover:text-blue-300 transition inline-flex items-center text-sm"
                        aria-label="Volver al inicio"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Volver al inicio
                    </Link>
                </div>

                {/* Formulario centrado */}
                <div className="flex-grow flex items-center justify-center p-4 py-2">
                    <div className="bg-white backdrop-blur-sm rounded-xl shadow-xl w-full max-w-md p-5">
                        <AuthForms />
                    </div>
                </div>

                {/* Footer */}
                <div className="py-3 text-center text-white text-xs">
                    <p>&copy; {new Date().getFullYear()} Canchas UCENIN. Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;