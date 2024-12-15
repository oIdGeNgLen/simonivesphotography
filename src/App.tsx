import React, { useState, Suspense } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-white">
      <Header isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <Suspense fallback={<LoadingSpinner />}>
        <Gallery />
      </Suspense>
    </div>
  );
}

export default App;