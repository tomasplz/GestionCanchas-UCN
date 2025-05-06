import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (sectionId: string) => {
    if (location.pathname === '/') {
      // Si ya estamos en la página de inicio, hacer scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Si estamos en otra página, navegar al inicio con hash
      navigate(`/#${sectionId}`);
    }
    setIsOpen(false); // Cerrar el menú móvil si está abierto
  };

  return (
      <nav className="bg-[#0A1838] py-3 px-4 fixed w-full top-0 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link
              to="/"
              onClick={() => handleNavigation('inicio')}
              className="flex items-center"
          >
            <img
                src="/assets/imagenes/LogoUCN.jpeg"
                alt="Logo UCENIN"
                className="h-12 w-12 object-cover rounded-full"
            />
            <span className="text-white text-xl ml-2 hidden md:block font-semibold">
            Canchas UCENIN
          </span>
          </Link>

          {/* Navegación Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <button
                onClick={() => handleNavigation('inicio')}
                className="text-white hover:text-blue-300 transition-colors text-lg"
            >
              Inicio
            </button>

            <button
                onClick={() => handleNavigation('caracteristicas')}
                className="text-white hover:text-blue-300 transition-colors text-lg"
            >
              Características
            </button>

            <button
                onClick={() => handleNavigation('equipamiento')}
                className="text-white hover:text-blue-300 transition-colors text-lg"
            >
              Equipamiento
            </button>

            <button
                onClick={() => handleNavigation('ubicacion')}
                className="text-white hover:text-blue-300 transition-colors text-lg"
            >
              Ubicación
            </button>

            <Link
                to="/auth"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors text-lg"
            >
              Iniciar Sesión
            </Link>
          </div>

          {/* Botón Menú Móvil */}
          <div className="md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none"
                aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Menú Móvil */}
        {isOpen && (
            <div className="md:hidden bg-[#0A1838] absolute top-full left-0 w-full py-4 px-6 shadow-lg">
              <div className="flex flex-col space-y-4">
                <button
                    onClick={() => handleNavigation('inicio')}
                    className="text-white hover:text-blue-300 transition-colors text-lg text-left"
                >
                  Inicio
                </button>

                <button
                    onClick={() => handleNavigation('caracteristicas')}
                    className="text-white hover:text-blue-300 transition-colors text-lg text-left"
                >
                  Características
                </button>

                <button
                    onClick={() => handleNavigation('equipamiento')}
                    className="text-white hover:text-blue-300 transition-colors text-lg text-left"
                >
                  Equipamiento
                </button>

                <button
                    onClick={() => handleNavigation('ubicacion')}
                    className="text-white hover:text-blue-300 transition-colors text-lg text-left"
                >
                  Ubicación
                </button>

                <Link
                    to="/reservar"
                    onClick={() => setIsOpen(false)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-center text-lg"
                >
                  Reservar
                </Link>

                <Link
                    to="/auth"
                    onClick={() => setIsOpen(false)}
                    className="bg-white hover:bg-blue-300 text-black px-4 py-2 rounded-md text-center text-lg"
                >
                  Iniciar sesion
                </Link>
              </div>
            </div>
        )}
      </nav>
  );
};

export default Navbar;