import React from 'react';

interface CourtCardProps {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    available: boolean;
}

const CourtCard: React.FC<CourtCardProps> =
    ({
         name,
         description,
         price,
         imageUrl,
         available
    }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:transform hover:scale-105">
            <img
                src={imageUrl}
                alt={name}
                className="w-full h-48 object-cover"
            />

            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-[#071d40]">{name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            ${price} / hora
          </span>
                </div>

                <p className="text-gray-600 mt-2 mb-4">{description}</p>

                <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              available
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
          }`}>
            {available ? 'Disponible' : 'No disponible'}
          </span>

                    <button
                        className={`px-4 py-2 rounded-md text-white ${
                            available
                                ? 'bg-[#071d40] hover:bg-[#122e5e]'
                                : 'bg-gray-400 cursor-not-allowed'
                        } transition`}
                        disabled={!available}
                    >
                        Reservar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourtCard;