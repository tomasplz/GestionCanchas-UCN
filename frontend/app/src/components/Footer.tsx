import React from 'react';
import { Mail, Instagram, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A1838] text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="flex justify-center space-x-8 mb-6">
          <a href="mailto:contact@canchasucenin.cl" className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 hover:scale-110 transition-transform duration-300">
            <Mail size={24} />
          </a>
          <a href="https://instagram.com/canchasucenin" className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-110 transition-transform duration-300">
            <Instagram size={24} />
          </a>
          <a href="tel:+56912345678" className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 hover:scale-110 transition-transform duration-300">
            <Phone size={24} />
          </a>
        </div>
        
        <div className="text-center text-gray-400">
          <p>&copy; CanchasUcenin. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;