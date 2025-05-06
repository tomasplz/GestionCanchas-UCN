import React from 'react';

const Equipment: React.FC = () => {
  return (
    <section id="equipamiento" className="w-full relative py-16">
      <div className="absolute inset-0 bg-cover bg-center" >
          <img
              src="assets/imagenes/equipamiento.webp"
              alt="cancha de padel"
              className="w-full h-full object-cover"
          />
      </div>
      <div className="absolute inset-0 bg-[#0A1838]/50" />
      
      <div className="relative container mx-auto px-4 z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif italic">
            Si no tienes equipamiento, no te preocupes. Nos puedes pedir!!
          </h2>
          
          <button className="mt-6 inline-flex items-center bg-white hover:bg-gray-100 text-[#0A1838] px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg">
            <span className="mr-2">🎾</span>
            reserva los equipamientos aquí
          </button>
        </div>
      </div>
    </section>
  );
};

export default Equipment;