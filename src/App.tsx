import React from 'react';
import { GiftProvider } from './context/GiftContext';
import Header from './components/Header';
import Hero from './components/Hero';
import GiftList from './components/GiftList';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import { useGiftContext } from './context/GiftContext';

const AppContent = () => {
  const { currentGuest } = useGiftContext();

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />
      {currentGuest?.isAdmin ? (
        <AdminDashboard />
      ) : (
        <>
          <Hero />
          <GiftList />
        </>
      )}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <GiftProvider>
      <AppContent />
    </GiftProvider>
  );
}

export default App;