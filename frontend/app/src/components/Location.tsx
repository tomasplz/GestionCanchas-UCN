import React from 'react';
import { MapPin } from 'lucide-react';

const Location: React.FC = () => {
  return (
    <section id="ubicacion" className="py-16 bg-[#0A1838] px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
          Ubicación
        </h2>
        
        <div className="max-w-5xl mx-auto bg-[#0e1f45] p-4 rounded-lg shadow-lg">
          <img 
            src="assets/imagenes/MapaUcn.png"
            alt="Mapa UCN" 
            className="w-full h-auto rounded-lg"
          />
          
          <div className="flex items-center justify-center mt-6 text-white">
            <MapPin size={24} className="text-red-500 mr-2" />
            <div className="text-center">
              <p className="text-xl md:text-2xl font-semibold">Estamos ubicados en Campus Guayacán, Coquimbo</p>
              <p className="text-gray-400">en zona recreativa (sector canchas)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;