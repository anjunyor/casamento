import React, { useState } from 'react';
import { Gift, GuestInfo } from '../types';
import { Check, ShoppingBag, Bookmark } from 'lucide-react';
import ReservationModal from './ReservationModal';

interface GiftCardProps {
  gift: Gift;
  currentGuest: GuestInfo | null;
}

const GiftCard: React.FC<GiftCardProps> = ({ gift, currentGuest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(gift.price);

  const translateCategory = (category: string) => {
    const translations: { [key: string]: string } = {
      'kitchen': 'Cozinha',
      'bedroom': 'Quarto',
      'living': 'Sala',
      'bathroom': 'Banheiro',
      'other': 'Outros'
    };
    return translations[category] || category;
  };

  const getStatusStyles = () => {
    switch (gift.status) {
      case 'available':
        return {
          className: 'bg-olive-light/20 text-olive-dark',
          icon: <ShoppingBag size={16} className="mr-1" />,
          text: 'Disponível'
        };
      case 'reserved':
        return {
          className: 'bg-yellow-100 text-yellow-800',
          icon: <Bookmark size={16} className="mr-1" />,
          text: 'Reservado'
        };
      case 'purchased':
        return {
          className: 'bg-green-100 text-green-800',
          icon: <Check size={16} className="mr-1" />,
          text: 'Comprado'
        };
      default:
        return {
          className: 'bg-gray-100 text-gray-800',
          icon: null,
          text: 'Desconhecido'
        };
    }
  };

  const statusStyles = getStatusStyles();

  return (
    <>
      <div 
        className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={gift.image} 
            alt={gift.name} 
            className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          <div className={`absolute top-2 right-2 ${statusStyles.className} px-2 py-1 rounded-full text-xs flex items-center`}>
            {statusStyles.icon}
            {statusStyles.text}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium mb-1">{gift.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{gift.description}</p>
          
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-lg">{formattedPrice}</span>
            <span className="text-xs px-2 py-1 bg-beige rounded-full capitalize">
              {translateCategory(gift.category)}
            </span>
          </div>
          
          {gift.status === 'available' ? (
            <button 
              onClick={() => currentGuest ? setIsModalOpen(true) : alert('Por favor, faça login primeiro')}
              disabled={!currentGuest}
              className={`w-full py-2 rounded-md transition-colors ${
                currentGuest 
                  ? 'bg-olive hover:bg-olive-dark text-white' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Reservar Presente
            </button>
          ) : (
            <div className="text-center py-2 text-gray-500 italic text-sm">
              {gift.status === 'reserved' ? 'Reservado por ' : 'Comprado por '}
              <span className="font-medium">{gift.reservedBy?.name}</span>
            </div>
          )}
        </div>
      </div>
      
      {isModalOpen && (
        <ReservationModal 
          gift={gift} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default GiftCard;