import React from 'react';
import { FeatureCard as FeatureCardType } from '../types';

const FeatureCard: React.FC<FeatureCardType> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl">
      <div className="text-[#4D80E4] mb-4 w-20 h-20 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-semibold text-[#0A1838] mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;