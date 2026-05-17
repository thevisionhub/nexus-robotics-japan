import React from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string | number }[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, ...props }, ref) => {
    return (
      <div className="relative w-full group">
        <select
          ref={ref}
          className={cn(
            "flex h-12 w-full appearance-none rounded-xl border border-white/10 bg-titanium-800/50 backdrop-blur-sm px-4 py-2 pr-10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyber-cyan/50 focus:border-cyber-cyan transition-all disabled:cursor-not-allowed disabled:opacity-50 shadow-inner cursor-pointer",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="bg-titanium-900 text-surface-muted">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-titanium-900 text-white py-2">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-surface-muted group-focus-within:text-cyber-cyan transition-colors z-10">
          <ChevronDown size={18} />
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyber-cyan/0 via-cyber-cyan/10 to-cyber-cyan/0 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-500" />
      </div>
    );
  }
);
Select.displayName = 'Select';
