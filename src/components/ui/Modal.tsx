import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, maxWidth = 'lg' }) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-[95vw]'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy-deep/60 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 flex items-end justify-center z-50 p-0 sm:items-center sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 32 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 32 }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              className={cn(
                "bg-white w-full rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto border border-surface-gray max-h-[92vh]",
                maxWidthClasses[maxWidth]
              )}
            >
              <div className="flex justify-between items-center p-5 sm:p-6 border-b border-surface-gray bg-platinum-100/80">
                <h2 className="text-lg sm:text-xl font-bold text-navy-deep">{title}</h2>
                <button 
                  type="button"
                  aria-label="Close modal"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-surface-light hover:bg-surface-gray text-surface-muted hover:text-navy-deep flex items-center justify-center transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-5 sm:p-6 overflow-y-auto">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
