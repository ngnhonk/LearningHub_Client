import React from 'react';
import { cn } from '../../lib/utils';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'pink' | 'blue' | 'gray' | 'orange';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-teal-100 text-teal-700 border-teal-300',
  success: 'bg-green-100 text-green-700 border-green-300',
  warning: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  danger:  'bg-red-100 text-red-600 border-red-300',
  purple:  'bg-purple-100 text-purple-700 border-purple-300',
  pink:    'bg-pink-100 text-pink-700 border-pink-300',
  blue:    'bg-blue-100 text-blue-700 border-blue-300',
  gray:    'bg-gray-100 text-gray-600 border-gray-300',
  orange:  'bg-orange-100 text-orange-700 border-orange-300',
};

const dotColors: Record<BadgeVariant, string> = {
  primary: 'bg-teal-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger:  'bg-red-500',
  purple:  'bg-purple-500',
  pink:    'bg-pink-500',
  blue:    'bg-blue-500',
  gray:    'bg-gray-500',
  orange:  'bg-orange-500',
};

export function Badge({ variant = 'primary', size = 'md', children, className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-bold rounded-full border-2',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs',
        variantStyles[variant],
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
}
