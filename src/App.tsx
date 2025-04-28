import React from 'react';
import { GiftProvider } from './context/GiftContext';
import Header from './components/Header';
import Hero from './components/Hero';
import GiftList from './components/GiftList';
import Footer from './components/Footer';

function App() {
  return (
    <GiftProvider>
      <div className="min-h-screen flex flex-col bg-cream">
        <Header />
        <Hero />
        <GiftList />
        <Footer />
      </div>
    </GiftProvider>
  );
}

export default App;