import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Robot } from '../data/robots';

interface SavedRobotsContextType {
  savedRobots: Robot[];
  toggleSaveRobot: (robot: Robot) => void;
  isSaved: (robotId: string) => boolean;
}

const SavedRobotsContext = createContext<SavedRobotsContextType | undefined>(undefined);

export const SavedRobotsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedRobots, setSavedRobots] = useState<Robot[]>(() => {
    const saved = localStorage.getItem('nexus_saved_robots');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nexus_saved_robots', JSON.stringify(savedRobots));
  }, [savedRobots]);

  const toggleSaveRobot = (robot: Robot) => {
    setSavedRobots(prev => {
      const exists = prev.find(r => r.id === robot.id);
      if (exists) {
        return prev.filter(r => r.id !== robot.id);
      }
      return [...prev, robot];
    });
  };

  const isSaved = (robotId: string) => {
    return savedRobots.some(r => r.id === robotId);
  };

  return (
    <SavedRobotsContext.Provider value={{ savedRobots, toggleSaveRobot, isSaved }}>
      {children}
    </SavedRobotsContext.Provider>
  );
};

export const useSavedRobots = () => {
  const context = useContext(SavedRobotsContext);
  if (context === undefined) {
    throw new Error('useSavedRobots must be used within a SavedRobotsProvider');
  }
  return context;
};
