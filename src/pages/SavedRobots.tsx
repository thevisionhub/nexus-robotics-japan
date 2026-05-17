import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight, BarChart2 } from 'lucide-react';
import { useSavedRobots } from '../contexts/SavedRobotsContext';
import { RobotCard } from '../components/robot/RobotCard';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const SavedRobots: React.FC = () => {
  const { savedRobots } = useSavedRobots();

  return (
    <div className="flex-1 bg-titanium-900 min-h-[calc(100vh-64px)] pb-20">
      
      {/* Premium Dark Header */}
      <div className="bg-[#0D0F12] text-white pt-20 sm:pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-cyber-indigo/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative mx-auto max-w-[1600px] z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase text-cyber-cyan mb-4">
              <Bookmark size={12} /> Staging Area
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">Procurement Shortlist</h1>
            <p className="text-surface-muted text-lg mt-4 max-w-2xl">
              Active solutions staged for technical evaluation and manufacturer introduction.
            </p>
          </div>
          
          {savedRobots.length > 0 && (
            <div className="flex items-center gap-4 shrink-0">
              <div className="bg-titanium-800 border border-white/10 px-4 py-3 rounded-xl flex flex-col">
                <span className="text-[10px] font-bold text-surface-muted uppercase tracking-widest">Staged Assets</span>
                <span className="text-xl font-extrabold text-white">{savedRobots.length}</span>
              </div>
              <Link to="/compare">
                <Button variant="primary" className="h-14">
                  <BarChart2 size={18} className="mr-2" /> Launch Comparison
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 mt-12 relative z-20">
        {savedRobots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {savedRobots.map(robot => (
                <motion.div 
                  key={robot.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <RobotCard robot={robot} view="grid" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
            className="bg-titanium-800 border border-white/10 rounded-2xl shadow-2xl p-16 text-center max-w-2xl mx-auto mt-12 backdrop-blur-md"
          >
            <div className="mx-auto w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-surface-muted mb-8 relative">
              <div className="absolute inset-0 bg-cyber-indigo/20 rounded-full blur-xl" />
              <Bookmark size={40} className="relative z-10" />
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-4">No assets staged</h2>
            <p className="text-surface-muted mb-10 leading-relaxed max-w-md mx-auto">
              Return to the registry to evaluate hardware and stage solutions for procurement comparison.
            </p>
            <Link to="/marketplace">
              <Button size="lg" className="gap-2 px-8">Access Registry <ArrowRight size={18} /></Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};
