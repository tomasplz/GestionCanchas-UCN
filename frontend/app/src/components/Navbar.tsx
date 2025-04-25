import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0A1838] py-3 px-4 md:px-8 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img
              src="assets/imagenes/LogoUCN.jpeg"
              alt="UCN Logo"
              className="h-16 w-16 object-cover rounded-full"
            />
            <span className="text-white text-lg ml-2 hidden md:block font-semibold">Canchas UCENIN</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#inicio" className="text-white hover:text-blue-300 transition-colors">Inicio</a>
          <a href="#caracteristicas" className="text-white hover:text-blue-300 transition-colors">Características</a>
          <a href="#equipamiento" className="text-white hover:text-blue-300 transition-colors">Equipamiento</a>
          <a href="#ubicacion" className="text-white hover:text-blue-300 transition-colors">Ubicación</a>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
            Reservar
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ?
              <X size={28} className="text-white" /> :
              <Menu size={28} className="text-white" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0A1838] absolute top-full left-0 w-full py-4 px-6 shadow-lg transition-all duration-300 ease-in-out">
          <div className="flex flex-col space-y-4">
            <a
              href="#inicio"
              className="text-white hover:text-blue-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </a>
            <a
              href="#caracteristicas"
              className="text-white hover:text-blue-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Características
            </a>
            <a
              href="#equipamiento"
              className="text-white hover:text-blue-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Equipamiento
            </a>
            <a
              href="#ubicacion"
              className="text-white hover:text-blue-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Ubicación
            </a>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors w-full">
              Reservar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;