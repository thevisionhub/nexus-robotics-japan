import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Filter, SlidersHorizontal, LayoutGrid, List, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockRobots } from '../data/robots';
import { RobotCard } from '../components/robot/RobotCard';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';

export const Marketplace: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';
  const initialIndustry = searchParams.get('industry') || '';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState('');
  const [industry, setIndustry] = useState(initialIndustry);
  const [sort, setSort] = useState('match');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Shimmer effect state
  const [isFiltering, setIsFiltering] = useState(false);
  const didMount = useRef(false);

  // Trigger shimmer when filters change
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), 400);
    return () => clearTimeout(timer);
  }, [query, category, industry, sort, viewMode]);

  const filteredRobots = useMemo(() => {
    return mockRobots
      .filter(r => {
        const matchesQuery = query === '' || 
          r.name.toLowerCase().includes(query.toLowerCase()) || 
          r.manufacturer.toLowerCase().includes(query.toLowerCase()) ||
          r.bestFor.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === '' || r.category === category;
        const matchesIndustry = industry === '' || r.industries.includes(industry);
        return matchesQuery && matchesCategory && matchesIndustry;
      })
      .sort((a, b) => {
        if (sort === 'price-low') return a.priceMinJPY - b.priceMinJPY;
        if (sort === 'price-high') return b.priceMinJPY - a.priceMinJPY;
        if (sort === 'payload-high') return b.payloadKg - a.payloadKg;
        if (sort === 'match') return (b.matchScore || 0) - (a.matchScore || 0);
        return 0;
      });
  }, [query, category, industry, sort]);

  const categories = Array.from(new Set(mockRobots.map(r => r.category)));

  const clearAll = () => {
    setQuery('');
    setCategory('');
    setIndustry('');
    setShowFilters(false);
  };

  const hasActiveFilters = category !== '' || industry !== '' || query !== '';
  const matchedConstraints = [
    query && `Query: ${query}`,
    category && `Category: ${category}`,
    industry && `Industry: ${industry}`,
    sort === 'match' ? 'Ranked by readiness' : 'Custom sort active',
  ].filter(Boolean);

  return (
    <div className="flex-1 bg-titanium-900 min-h-[calc(100vh-64px)] pb-20">
      
      {/* Sticky Premium Header */}
      <div className="bg-[#0D0F12] text-white pt-20 sm:pt-24 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-cyber-indigo/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative mx-auto max-w-[1600px] z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase text-cyber-cyan mb-4">
            <Search size={12} /> Registry Search
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 sm:mb-10 text-white tracking-tight">Solutions Registry</h1>
          
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-center">
            <div className="relative flex-1 w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-muted group-focus-within:text-cyber-cyan transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search by manufacturer, robot name, or task..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-titanium-800/80 backdrop-blur-md border border-white/10 rounded-xl px-12 py-4 text-sm sm:text-base text-white placeholder:text-surface-muted focus:outline-none focus:ring-1 focus:ring-cyber-cyan/50 focus:border-cyber-cyan shadow-inner transition-all"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-muted hover:text-white">
                  <X size={18} />
                </button>
              )}
            </div>
            
            <div className="flex gap-2 sm:gap-3 w-full lg:w-auto">
              <Button 
                variant={hasActiveFilters ? "primary" : "secondary"}
                className="flex-1 lg:w-auto h-14 px-4 sm:px-6 shrink-0 relative" 
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} className="mr-2" /> 
                <span className="hidden sm:inline">Filters</span>
                {hasActiveFilters && <span className="absolute top-0 right-0 w-3 h-3 bg-status-warning rounded-full border-2 border-titanium-900" />}
              </Button>
              
              <Select 
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="flex-[2] lg:w-auto min-w-[160px] sm:min-w-[200px]"
                options={[
                  { label: 'Highest Readiness', value: 'match' },
                  { label: 'Price: Low to High', value: 'price-low' },
                  { label: 'Price: High to Low', value: 'price-high' },
                  { label: 'Highest Payload', value: 'payload-high' },
                ]}
              />
              
              <div className="hidden md:flex bg-titanium-800/80 backdrop-blur-md p-1 rounded-xl border border-white/10 h-14 shrink-0 shadow-inner">
                <button onClick={() => setViewMode('grid')} className={cn("px-4 rounded-lg flex items-center justify-center transition-colors", viewMode === 'grid' ? "bg-white/10 text-white shadow-sm" : "text-surface-muted hover:text-white")}><LayoutGrid size={20} /></button>
                <button onClick={() => setViewMode('list')} className={cn("px-4 rounded-lg flex items-center justify-center transition-colors", viewMode === 'list' ? "bg-white/10 text-white shadow-sm" : "text-surface-muted hover:text-white")}><List size={20} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        
        {/* Desktop Collapsible Filters & Mobile Full Drawer */}
        <AnimatePresence>
          {showFilters && (
            <>
              {/* Mobile Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setShowFilters(false)}
                className="md:hidden fixed inset-0 bg-black/80 z-40 backdrop-blur-md"
              />
              
              {/* Filter Content */}
              <motion.div 
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="fixed md:relative bottom-0 left-0 right-0 md:bottom-auto md:left-auto md:right-auto bg-titanium-800 rounded-t-3xl md:rounded-2xl shadow-[0_-20px_40px_rgba(0,0,0,0.5)] md:shadow-2xl border-t md:border border-white/10 p-6 mb-8 overflow-hidden z-50 md:z-auto max-h-[85vh] md:max-h-none overflow-y-auto"
              >
                <div className="flex items-center justify-between gap-2 mb-6 text-white font-bold border-b border-white/10 pb-4">
                  <span className="flex items-center gap-2 tracking-wide"><SlidersHorizontal size={18} className="text-cyber-cyan" /> Intelligence Parameters</span>
                  <button className="md:hidden p-2 -mr-2 bg-white/5 rounded-full text-surface-muted hover:text-white" onClick={() => setShowFilters(false)}><X size={18}/></button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-surface-muted uppercase tracking-widest mb-2">Category</label>
                    <Select 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      options={[
                        { label: 'All Categories', value: '' },
                        ...categories.map(c => ({ label: c, value: c }))
                      ]}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-surface-muted uppercase tracking-widest mb-2">Industry Sector</label>
                    <Select 
                      value={industry} 
                      onChange={(e) => setIndustry(e.target.value)}
                      options={[
                        { label: 'All Industries', value: '' },
                        { label: 'Logistics', value: 'Logistics' },
                        { label: 'Manufacturing', value: 'Manufacturing' },
                        { label: 'Retail', value: 'Retail' },
                        { label: 'Warehousing', value: 'Warehousing' },
                      ]}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" className="w-full h-12 text-surface-muted hover:text-white" onClick={clearAll}>
                      Reset Parameters
                    </Button>
                  </div>
                </div>
                
                <div className="md:hidden mt-6 pt-6 border-t border-white/10">
                  <Button fullWidth onClick={() => setShowFilters(false)}>View {filteredRobots.length} Results</Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Active Filter Chips */}
        <AnimatePresence>
          {(category || industry) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {category && (
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="flex items-center gap-1 bg-cyber-indigo/20 text-cyber-cyan border border-cyber-cyan/30 px-3 py-1.5 rounded-md text-[10px] uppercase tracking-widest font-bold shadow-sm">
                  {category}
                  <button onClick={() => setCategory('')} className="ml-1 hover:bg-white/10 rounded-full p-0.5 transition-colors"><X size={12} /></button>
                </motion.div>
              )}
              {industry && (
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="flex items-center gap-1 bg-cyber-indigo/20 text-cyber-cyan border border-cyber-cyan/30 px-3 py-1.5 rounded-md text-[10px] uppercase tracking-widest font-bold shadow-sm">
                  Industry: {industry}
                  <button onClick={() => setIndustry('')} className="ml-1 hover:bg-white/10 rounded-full p-0.5 transition-colors"><X size={12} /></button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-6 flex flex-col gap-2 bg-titanium-800 px-4 py-3 sm:p-4 rounded-xl shadow-sm border border-white/10 md:flex-row md:items-center md:justify-between">
          <p className="text-white font-semibold text-sm sm:text-base">
            Showing <span className="text-cyber-cyan font-bold">{filteredRobots.length}</span> verified solutions
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-surface-muted">
            {matchedConstraints.length ? matchedConstraints.join(' / ') : 'Full registry scan'}
          </p>
        </div>

        {/* Results Grid with Shimmer */}
        {isFiltering ? (
          <div className={cn("grid gap-4 sm:gap-6", viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1")}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={cn("bg-titanium-800 rounded-2xl shadow-sm border border-white/10 overflow-hidden relative", viewMode === 'list' ? 'h-48 flex' : 'h-[380px]')}>
                {/* Shimmer overlay */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />
                <div className={cn("bg-white/5", viewMode === 'list' ? 'w-48 h-full' : 'h-48 w-full')} />
                <div className="p-5 flex-1 space-y-4">
                  <div className="h-4 bg-white/5 rounded w-3/4" />
                  <div className="h-4 bg-white/5 rounded w-1/2" />
                  <div className="h-10 bg-white/5 rounded w-full mt-auto" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredRobots.length > 0 ? (
          <motion.div 
            layout
            className={cn("grid gap-4 sm:gap-6", viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1")}
          >
            <AnimatePresence>
              {filteredRobots.map((robot) => (
                <motion.div 
                  key={robot.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <RobotCard robot={robot} view={viewMode} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-titanium-800 border border-white/10 rounded-2xl p-10 sm:p-16 text-center shadow-sm">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-surface-muted">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No matches found</h3>
            <p className="text-surface-muted mb-6 text-sm">No technical specifications match your current filter parameters.</p>
            <Button variant="outline" onClick={clearAll}>Clear All Filters</Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
