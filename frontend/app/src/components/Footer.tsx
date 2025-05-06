import React from 'react';
import { Mail, Instagram, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
      <footer className="bg-[#0A1838] text-white py-10 px-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row md:justify-between gap-8">

          {/* Información principal */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Canchas UCENIN</h3>
            <p className="max-w-md text-gray-300 text-sm">
              Reserva tus canchas de pádel al mejor precio en la Universidad Católica del Norte.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/reservar" className="text-gray-300 hover:text-white transition">
                  Reservar
                </Link>
              </li>
              <li>
                <Link to="/equipamiento" className="text-gray-300 hover:text-white transition">
                  Equipamiento
                </Link>
              </li>
              <li>
                <Link to="/ubicacion" className="text-gray-300 hover:text-white transition">
                  Ubicación
                </Link>
              </li>
            </ul>
          </div>

          {/* Horarios y contacto */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Horarios de Atención</h3>
            <ul className="space-y-2 text-gray-300 text-sm mb-4">
              <li>Lunes a Viernes: 8:00 - 18:00</li>
            </ul>

            <div className="flex space-x-4">
              <a
                  href="mailto:contact@canchasucenin.cl"
                  aria-label="Correo electrónico"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 hover:scale-110 transition-transform"
              >
                <Mail size={20} />
              </a>
              <a
                  href="https://instagram.com/canchasucenin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-110 transition-transform"
              >
                <Instagram size={20} />
              </a>
              <a
                  href="tel:+56912345678"
                  aria-label="Teléfono"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 hover:scale-110 transition-transform"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
          <p>&copy; {new Date().getFullYear()} Canchas UCENIN. Todos los derechos reservados.</p>
        </div>
      </footer>
  );
};

export default Footer;
