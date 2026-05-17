import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative w-full group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-muted group-focus-within:text-cyber-cyan transition-colors pointer-events-none z-10">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-xl border border-white/10 bg-titanium-800/50 backdrop-blur-sm px-4 py-2 text-sm text-white placeholder:text-surface-muted focus:outline-none focus:ring-1 focus:ring-cyber-cyan/50 focus:border-cyber-cyan transition-all disabled:cursor-not-allowed disabled:opacity-50 shadow-inner",
            icon && "pl-12",
            className
          )}
          {...props}
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyber-cyan/0 via-cyber-cyan/10 to-cyber-cyan/0 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-500" />
      </div>
    );
  }
);
Input.displayName = 'Input';
