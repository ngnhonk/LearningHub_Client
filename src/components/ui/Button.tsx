import React from 'react';
import { cn } from '../../lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'success' | 'warning';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:   'bg-teal-500 text-white border-3 border-teal-700 hover:bg-teal-600 active:translate-y-0.5',
  secondary: 'bg-purple-400 text-white border-3 border-purple-600 hover:bg-purple-500 active:translate-y-0.5',
  danger:    'bg-red-400 text-white border-3 border-red-600 hover:bg-red-500 active:translate-y-0.5',
  success:   'bg-green-400 text-white border-3 border-green-600 hover:bg-green-500 active:translate-y-0.5',
  warning:   'bg-yellow-400 text-white border-3 border-yellow-600 hover:bg-yellow-500 active:translate-y-0.5',
  ghost:     'bg-transparent text-[var(--color-foreground)] border-3 border-transparent hover:bg-[var(--color-muted-bg)]',
  outline:   'bg-transparent text-[var(--color-primary)] border-3 border-[var(--color-primary)] hover:bg-[var(--color-primary-50)]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-xl gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-2xl gap-2',
  lg: 'px-6 py-3 text-base rounded-2xl gap-2.5',
};

const shadowStyles: Record<ButtonVariant, string> = {
  primary:   'shadow-[3px_3px_0px_#0f766e] hover:shadow-[4px_4px_0px_#0f766e] active:shadow-none',
  secondary: 'shadow-[3px_3px_0px_#7c3aed] hover:shadow-[4px_4px_0px_#7c3aed] active:shadow-none',
  danger:    'shadow-[3px_3px_0px_#b91c1c] hover:shadow-[4px_4px_0px_#b91c1c] active:shadow-none',
  success:   'shadow-[3px_3px_0px_#15803d] hover:shadow-[4px_4px_0px_#15803d] active:shadow-none',
  warning:   'shadow-[3px_3px_0px_#a16207] hover:shadow-[4px_4px_0px_#a16207] active:shadow-none',
  ghost:     '',
  outline:   'shadow-[3px_3px_0px_var(--color-primary)] hover:shadow-[4px_4px_0px_var(--color-primary)] active:shadow-none',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, fullWidth, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-bold cursor-pointer',
          'transition-all duration-150 select-none',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0',
          variantStyles[variant],
          sizeStyles[size],
          shadowStyles[variant],
          fullWidth && 'w-full',
          className
        )}
        style={{ borderWidth: '3px' }}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
