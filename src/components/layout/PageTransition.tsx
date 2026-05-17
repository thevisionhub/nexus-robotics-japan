import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { motionPresets } from '../ui/Premium';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      {...motionPresets.page}
      className="flex-1 flex flex-col w-full h-full"
    >
      {children}
    </motion.div>
  );
};
