import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Robot } from '../data/robots';

interface CompareContextType {
  compareList: Robot[];
  addToCompare: (robot: Robot) => boolean;
  removeFromCompare: (robotId: string) => void;
  clearCompare: () => void;
  isCompared: (robotId: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareList, setCompareList] = useState<Robot[]>(() => {
    const saved = localStorage.getItem('nexus_compare_list');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nexus_compare_list', JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (robot: Robot) => {
    if (compareList.length >= 4) {
      return false;
    }
    
    if (compareList.find(r => r.id === robot.id)) {
      return false;
    }

    setCompareList(prev => [...prev, robot]);
    return true;
  };

  const removeFromCompare = (robotId: string) => {
    setCompareList(prev => prev.filter(r => r.id !== robotId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isCompared = (robotId: string) => {
    return compareList.some(r => r.id === robotId);
  };

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare, isCompared }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
