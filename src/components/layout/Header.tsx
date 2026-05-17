import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bot, Search, BarChart2, Briefcase, Layers } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Intelligence', path: '/dashboard', icon: Layers },
    { name: 'Registry', path: '/marketplace', icon: Search },
    { name: 'AI Matching', path: '/matching', icon: Bot },
    { name: 'Compare', path: '/compare', icon: BarChart2 },
    { name: 'Partners', path: '/manufacturers', icon: Briefcase },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-500",
      scrolled ? "py-2" : "py-4"
    )}>
      {/* Floating Glass Container */}
      <div className={cn(
        "mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 transition-all duration-500",
        scrolled ? "w-[95%] sm:w-full" : "w-full"
      )}>
        <div className={cn(
          "flex items-center justify-between transition-all duration-500 relative overflow-hidden",
          scrolled 
            ? "h-14 bg-titanium-900/86 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl px-3 sm:px-6" 
            : "h-14 rounded-2xl border border-white/10 bg-ink-950/62 px-3 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.18)] md:h-16 md:bg-transparent md:border-transparent md:px-2 md:shadow-none md:backdrop-blur-0"
        )}>
          
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-3 group relative z-10 outline-none" data-cursor="HOME">
              <div className={cn(
                "flex items-center justify-center rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.2)]",
                scrolled ? "h-8 w-8 bg-cyber-indigo text-white" : "h-8 w-8 bg-white text-titanium-900 sm:h-10 sm:w-10"
              )}>
                <Bot size={scrolled ? 18 : 20} />
              </div>
              <span className={cn(
                "font-extrabold tracking-tight transition-colors",
                scrolled ? "text-white text-lg" : "text-white text-base sm:text-xl"
              )}>
                NEXUS
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 z-10">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  data-cursor={link.name.toUpperCase()}
                  className="relative px-4 py-2 text-[11px] font-bold tracking-widest uppercase outline-none group"
                >
                  <span className={cn(
                    "relative z-10 transition-colors duration-300",
                    active ? "text-cyber-cyan" : (scrolled ? "text-surface-gray hover:text-white" : "text-white/70 hover:text-white")
                  )}>
                    {link.name}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="header-active-tab"
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-lg -z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3 relative z-10">
            <Link to="/saved" data-cursor="VIEW">
              <button className={cn(
                "text-[10px] font-bold tracking-widest uppercase px-4 py-2 rounded-lg transition-colors border outline-none",
                scrolled ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-black/10 border-transparent text-white hover:bg-white/10"
              )}>
                Shortlist
              </button>
            </Link>
            <Link to="/inquiry" data-cursor="START">
              <button className="text-[10px] font-bold tracking-widest uppercase px-5 py-2 rounded-lg bg-cyber-indigo text-white hover:bg-cyber-indigo/90 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-cyber-indigo/50 outline-none">
                Get Access
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-3 relative z-10">
            <button
              type="button"
              aria-label="Open navigation menu"
              className={cn("outline-none p-2 rounded-lg text-white hover:bg-white/10", scrolled ? "text-white" : "text-white")}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-titanium-900/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-white/10">
              <span className="text-xl font-extrabold text-white tracking-tight">NEXUS</span>
              <button aria-label="Close navigation menu" onClick={() => setMobileMenuOpen(false)} className="text-white/70 hover:text-white p-2 outline-none">
                <X size={28} />
              </button>
            </div>
            
            <div className="flex flex-col p-4 sm:p-6 gap-2 overflow-y-auto">
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={link.name}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-4 px-4 py-4 rounded-xl text-sm font-bold uppercase tracking-widest",
                        isActive(link.path) ? "bg-white/10 text-cyber-cyan border border-white/10" : "text-white/70 hover:text-white"
                      )}
                    >
                      <Icon size={20} />
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-4">
                <Link to="/saved" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full text-xs font-bold tracking-widest uppercase px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white">
                    Procurement Shortlist
                  </button>
                </Link>
                <Link to="/inquiry" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full text-xs font-bold tracking-widest uppercase px-5 py-4 rounded-xl bg-cyber-indigo text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-cyber-indigo/50">
                    Request Enterprise Access
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
