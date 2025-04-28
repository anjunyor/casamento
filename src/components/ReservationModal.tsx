import React, { useState } from 'react';
import { X, Gift as GiftIcon, ShoppingBag } from 'lucide-react';
import { Gift } from '../types';
import { useGiftContext } from '../context/GiftContext';

interface ReservationModalProps {
  gift: Gift;
  onClose: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ gift, onClose }) => {
  const [willBring, setWillBring] = useState(true);
  const { reserveGift } = useGiftContext();
  
  const handleReserve = () => {
    reserveGift(gift.id, willBring);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative animate-fadeIn">
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-olive-light/20 mb-4">
            <GiftIcon className="text-olive" />
          </div>
          <h2 className="text-2xl font-serif text-olive">Reservar Presente</h2>
          <p className="text-gray-600 mt-1">{gift.name}</p>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-4">Como você deseja proceder com este presente?</p>
          
          <div className="space-y-3">
            <label className="flex items-start p-3 border rounded-md cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="giftOption"
                checked={willBring}
                onChange={() => setWillBring(true)}
                className="mt-1"
              />
              <div className="ml-3">
                <span className="block font-medium">Vou comprar e levar este presente</span>
                <span className="text-sm text-gray-500">Marcar como comprado por você</span>
              </div>
            </label>
            
            <label className="flex items-start p-3 border rounded-md cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="giftOption"
                checked={!willBring}
                onChange={() => setWillBring(false)}
                className="mt-1"
              />
              <div className="ml-3">
                <span className="block font-medium">Vou reservar este presente</span>
                <span className="text-sm text-gray-500">Marcar como reservado, mas ainda não comprado</span>
              </div>
            </label>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={onClose}
            className="flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleReserve}
            className="flex-1 bg-olive hover:bg-olive-dark text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
          >
            <ShoppingBag size={18} className="mr-2" />
            {willBring ? 'Marcar como Comprado' : 'Reservar Presente'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;