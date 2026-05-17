import React from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollProgress } from '../ui/Premium';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-platinum-100 font-sans text-navy-charcoal selection:bg-cyber-cyan/30 selection:text-white">
      <ScrollProgress />
      <Header />
      <main className="flex-1 flex flex-col relative">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};
