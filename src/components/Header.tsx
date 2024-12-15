import React from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function Header({ isMenuOpen, toggleMenu }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-black/10">
      <div className="container mx-auto px-4 py-1 sm:py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src="/assets/images/logo.png" 
            alt="Simon Ives Photography" 
            className="w-[100px] h-[25px] object-contain"
          />
          <h1 className="text-lg font-light hidden sm:block">Simon Ives · Photographer</h1>
        </div>
        <button
          onClick={toggleMenu}
          className="p-2 hover:bg-black/5 rounded-full transition-colors"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}