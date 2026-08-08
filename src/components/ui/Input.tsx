import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-bold text-[var(--color-foreground)]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-[var(--color-muted)] pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-2xl px-4 py-2.5 text-sm font-medium',
              'bg-[var(--color-surface)] text-[var(--color-foreground)]',
              'border-3 border-[var(--color-border-strong)]',
              'shadow-[3px_3px_0px_var(--color-border-strong)]',
              'outline-none transition-all duration-150',
              'placeholder:text-[var(--color-muted)] placeholder:font-normal',
              'focus:border-[var(--color-primary)] focus:shadow-[3px_3px_0px_var(--color-primary)]',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-red-400 shadow-[3px_3px_0px_#f87171] focus:border-red-500 focus:shadow-[3px_3px_0px_#ef4444]',
              !!leftIcon && 'pl-10',
              !!rightIcon && 'pr-10',
              className
            )}
            style={{ borderWidth: '3px' }}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-[var(--color-muted)]">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
        {hint && !error && <p className="text-xs text-[var(--color-muted)]">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Textarea variant
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-bold text-[var(--color-foreground)]"
            style={{ fontFamily: 'var(--font-heading)' }}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-2xl px-4 py-2.5 text-sm font-medium resize-y min-h-[100px]',
            'bg-[var(--color-surface)] text-[var(--color-foreground)]',
            'border-3 border-[var(--color-border-strong)]',
            'shadow-[3px_3px_0px_var(--color-border-strong)]',
            'outline-none transition-all duration-150',
            'placeholder:text-[var(--color-muted)] placeholder:font-normal',
            'focus:border-[var(--color-primary)] focus:shadow-[3px_3px_0px_var(--color-primary)]',
            error && 'border-red-400 shadow-[3px_3px_0px_#f87171]',
            className
          )}
          style={{ borderWidth: '3px' }}
          {...props}
        />
        {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
        {hint && !error && <p className="text-xs text-[var(--color-muted)]">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
