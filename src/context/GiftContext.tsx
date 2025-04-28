import React, { createContext, useContext, useState, useEffect } from 'react';
import { Gift, GuestInfo } from '../types';
import { gifts as initialGifts } from '../data/mockGifts';

interface GiftContextType {
  gifts: Gift[];
  filteredGifts: Gift[];
  categories: string[];
  currentGuest: GuestInfo | null;
  setCurrentGuest: (guest: GuestInfo | null) => void;
  reserveGift: (giftId: string, willBring: boolean) => void;
  filterGifts: (category: string, searchTerm: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const GiftContext = createContext<GiftContextType | undefined>(undefined);

export const GiftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gifts, setGifts] = useState<Gift[]>(() => {
    // Try to load gifts from localStorage
    const savedGifts = localStorage.getItem('gifts');
    return savedGifts ? JSON.parse(savedGifts) : initialGifts;
  });
  
  const [filteredGifts, setFilteredGifts] = useState<Gift[]>(gifts);
  const [currentGuest, setCurrentGuest] = useState<GuestInfo | null>(() => {
    const savedGuest = localStorage.getItem('currentGuest');
    return savedGuest ? JSON.parse(savedGuest) : null;
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Get unique categories from gifts
  const categories = ['all', ...new Set(gifts.map(gift => gift.category))];

  useEffect(() => {
    // Save gifts to localStorage whenever they change
    localStorage.setItem('gifts', JSON.stringify(gifts));
  }, [gifts]);

  useEffect(() => {
    // Save current guest to localStorage
    if (currentGuest) {
      localStorage.setItem('currentGuest', JSON.stringify(currentGuest));
    }
  }, [currentGuest]);

  const reserveGift = (giftId: string, willBring: boolean) => {
    if (!currentGuest) return;

    setGifts(prevGifts => 
      prevGifts.map(gift => 
        gift.id === giftId 
          ? { 
              ...gift, 
              status: willBring ? 'comprado' : 'reservado',
              reservadoBy: {
                name: currentGuest.name,
                email: currentGuest.email,
                willBring
              }
            } 
          : gift
      )
    );
  };

  const filterGifts = (category: string, term: string) => {
    let filtered = gifts;
    
    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(gift => gift.category === category);
    }
    
    // Filter by search term
    if (term) {
      const lowercaseTerm = term.toLowerCase();
      filtered = filtered.filter(gift => 
        gift.name.toLowerCase().includes(lowercaseTerm) || 
        gift.description.toLowerCase().includes(lowercaseTerm)
      );
    }
    
    setFilteredGifts(filtered);
  };

  // Update filtered gifts when category or search term changes
  useEffect(() => {
    filterGifts(selectedCategory, searchTerm);
  }, [selectedCategory, searchTerm, gifts]);

  return (
    <GiftContext.Provider value={{
      gifts,
      filteredGifts,
      categories,
      currentGuest,
      setCurrentGuest,
      reserveGift,
      filterGifts,
      selectedCategory,
      setSelectedCategory,
      searchTerm,
      setSearchTerm
    }}>
      {children}
    </GiftContext.Provider>
  );
};

export const useGiftContext = () => {
  const context = useContext(GiftContext);
  if (context === undefined) {
    throw new Error('useGiftContext must be used within a GiftProvider');
  }
  return context;
};