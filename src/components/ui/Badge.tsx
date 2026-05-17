import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'outline' | 'navy';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase transition-colors backdrop-blur-sm",
          {
            'bg-cyber-indigo/20 text-cyber-cyan border border-cyber-cyan/30 shadow-[0_0_10px_rgba(0,229,255,0.1)]': variant === 'default',
            'bg-status-success/20 text-status-success border border-status-success/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]': variant === 'success',
            'bg-status-warning/20 text-status-warning border border-status-warning/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]': variant === 'warning',
            'bg-status-danger/20 text-status-danger border border-status-danger/30 shadow-[0_0_10px_rgba(239,68,68,0.1)]': variant === 'danger',
            'border border-white/20 text-white/70 hover:text-white hover:border-white/40 bg-white/5': variant === 'outline',
            'bg-titanium-800 text-white border border-white/10 shadow-sm': variant === 'navy',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';
