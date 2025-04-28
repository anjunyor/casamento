import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useGiftContext } from '../context/GiftContext';
import GiftCard from './GiftCard';

const GiftList: React.FC = () => {
  const { 
    filteredGifts, 
    categories, 
    selectedCategory, 
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    currentGuest
  } = useGiftContext();
  
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  return (
    <section id="gifts" className="py-12 px-4 bg-beige/50">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-olive mb-2">Our Gift Registry</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our wishlist and select items you'd like to gift us for our new life together.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search gifts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive text-gray-900"
              />
            </div>
            
            <button
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
              className="flex items-center text-gray-700 hover:text-olive md:hidden"
            >
              <Filter size={18} className="mr-1" />
              {isFiltersVisible ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            <div className="hidden md:flex space-x-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md capitalize transition-colors ${
                    selectedCategory === category
                      ? 'bg-olive text-white'
                      : 'bg-white text-gray-700 hover:bg-olive-light hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {isFiltersVisible && (
            <div className="flex flex-wrap gap-2 md:hidden mt-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-md text-sm capitalize transition-colors ${
                    selectedCategory === category
                      ? 'bg-olive text-white'
                      : 'bg-white text-gray-700 hover:bg-olive-light hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {filteredGifts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGifts.map(gift => (
              <GiftCard key={gift.id} gift={gift} currentGuest={currentGuest} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-block p-4 rounded-full bg-olive-light/20 mb-4">
              <Search size={32} className="text-olive" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No gifts found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default GiftList;