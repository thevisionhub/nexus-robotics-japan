import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, 'ref'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-bold tracking-wider uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group outline-none",
          {
            'bg-cyber-indigo text-white shadow-[0_14px_35px_rgba(99,102,241,0.30)] border border-cyber-indigo/50 hover:bg-[#5658de]': variant === 'primary',
            'bg-ink-800 text-white hover:bg-ink-700 border border-white/10 shadow-sm': variant === 'secondary',
            'border border-platinum-300 bg-white/70 text-ink-900 hover:border-cyber-cyan hover:text-ink-950 shadow-sm': variant === 'outline',
            'hover:bg-white/10 text-current': variant === 'ghost',
            'bg-status-danger/90 text-white hover:bg-status-danger shadow-[0_0_20px_rgba(239,68,68,0.3)] border border-status-danger/50': variant === 'danger',
            
            'h-10 px-4 text-[10px]': size === 'sm',
            'h-12 px-6 text-xs': size === 'md',
            'h-14 px-8 text-sm': size === 'lg',
            
            'w-full': fullWidth,
          },
          className
        )}
        {...props}
      >
        {/* Futuristic Glass/Glow overlays */}
        {variant === 'primary' && (
          <span className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
        {(variant === 'secondary' || variant === 'outline') && (
          <span className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
        <span className="relative z-10 flex items-center justify-center">
          {props.children as React.ReactNode}
        </span>
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
