import React from 'react';
import { cn } from '../../lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-bold text-[var(--color-foreground)]"
            style={{ fontFamily: 'var(--font-heading)' }}>
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-2xl px-4 py-2.5 text-sm font-medium appearance-none cursor-pointer',
            'bg-[var(--color-surface)] text-[var(--color-foreground)]',
            'border-3 border-[var(--color-border-strong)]',
            'shadow-[3px_3px_0px_var(--color-border-strong)]',
            'outline-none transition-all duration-150',
            'focus:border-[var(--color-primary)] focus:shadow-[3px_3px_0px_var(--color-primary)]',
            error && 'border-red-400 shadow-[3px_3px_0px_#f87171]',
            className
          )}
          style={{ borderWidth: '3px' }}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
