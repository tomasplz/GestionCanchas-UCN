import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; 

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleNavigation = (sectionId: string) => {
    if (location.pathname === '/') {
      
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
    setIsOpen(false); 
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsOpen(false);
    navigate('/');
  };

  const navigateToDashboard = () => {
    navigate('/profile'); 
    setIsOpen(false);
    setIsUserMenuOpen(false);
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

          {/* Mostrar diferentes opciones según el estado de autenticación */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors text-lg"
              >
                <User size={20} />
                <span>{user?.name || 'Usuario'}</span>
              </button>
              
              {/* Menú desplegable del usuario */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={navigateToDashboard}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Mi Panel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors text-lg"
            >
              Iniciar Sesión
            </Link>
          )}
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

            {/* Opciones diferentes para móvil según autenticación */}
            {isAuthenticated ? (
              <>
                <button
                  onClick={navigateToDashboard}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-center text-lg flex items-center justify-center"
                >
                  <User size={20} className="mr-2" />
                  Mi Panel
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-center text-lg flex items-center justify-center"
                >
                  <LogOut size={20} className="mr-2" />
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
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
                  Iniciar Sesión
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;