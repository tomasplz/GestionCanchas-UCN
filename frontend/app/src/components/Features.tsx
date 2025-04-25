import React from 'react';
import FeatureCard from './FeatureCard';
import { Smartphone, Calendar, DollarSign, CreditCard } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Smartphone size={48} className="stroke-[1.5]" />,
      title: "Reservas tus canchas en línea",
      description: "Selecciona tu cancha ideal y elige la hora."
    },
    {
      icon: <Calendar size={48} className="stroke-[1.5]" />,
      title: "Agenda automáticamente en tu calendario",
      description: "Al reservar, te enviaremos un correo que agendará automáticamente tu partido."
    },
    {
      icon: <DollarSign size={48} className="stroke-[1.5]" />,
      title: "Encuentra el mejor precio",
      description: "Compara entre canchas y reserva en el que más te convenga."
    },
    {
      icon: <CreditCard size={48} className="stroke-[1.5]" />,
      title: "Pagos en línea",
      description: "Puedes pagar en línea con Mercado Pago, WebPay One Click."
    }
  ];

  return (
    <section id="caracteristicas" className="py-16 bg-[#0A1838] px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Características principales
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;