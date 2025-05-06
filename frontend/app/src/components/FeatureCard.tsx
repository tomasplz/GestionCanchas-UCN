import React from 'react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-transform hover:transform hover:scale-105">
            <div className="text-[#071d40] mb-4 w-16 h-16 flex items-center justify-center">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#071d40]">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default FeatureCard;