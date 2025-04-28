import React, { useState } from 'react';
import { useGiftContext } from '../context/GiftContext';
import GuestLoginModal from './GuestLoginModal';

const Header: React.FC = () => {
  const { currentGuest, setCurrentGuest } = useGiftContext();
  const [isModalOpen, setIsModalOpen] = useState(!currentGuest);
  
  const handleLogout = () => {
    setCurrentGuest(null);
    localStorage.removeItem('currentGuest');
    setIsModalOpen(true);
  };

  return (
    <header className="bg-olive text-white p-4 md:p-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <img 
            src="https://ibb.co/hR5CVXDD" 
            alt="J & A" 
            className="h-12 md:h-16"
          />
        </div>
        
        <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
          <a href="#home" className="hover:text-beige transition-colors">Home</a>
          <a href="#gifts" className="hover:text-beige transition-colors">Gifts</a>
          
          {currentGuest ? (
            <div className="flex items-center">
              <span className="mr-3 text-beige">Hello, {currentGuest.name}</span>
              <button 
                onClick={handleLogout}
                className="bg-olive-light hover:bg-olive-dark text-white px-4 py-2 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-olive-light hover:bg-olive-dark text-white px-4 py-2 rounded-md transition-colors"
            >
              Guest Login
            </button>
          )}
        </nav>
      </div>
      
      {isModalOpen && <GuestLoginModal onClose={() => setIsModalOpen(false)} />}
    </header>
  );
};

export default Header;