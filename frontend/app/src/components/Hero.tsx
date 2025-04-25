import React from 'react';
import { Calendar } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="w-full h-screen pt-20 relative">
      <div className="absolute inset-0 bg-cover bg-center">
        <img
        src="assets/imagenes/canchaPadel.jpeg"
        alt="cancha de padel"
        className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1838]/40 to-[#0A1838]/90" />
      
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-serif italic transform transition-all duration-700 hover:scale-105">
          canchas UCENIN
        </h1>
        
        <p className="text-white text-lg md:text-xl max-w-3xl mb-10 leading-relaxed">
          Con canchas UCENIN podrás reservar tus canchas de padel 
          que quieras y al mejor precio.
        </p>
        
        <button className="flex items-center space-x-2 bg-white hover:bg-gray-100 text-[#0A1838] px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
          <Calendar size={20} />
          <span>Reserva tu cancha aquí</span>
        </button>
      </div>
    </section>
  );
};

export default Hero;