import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hideClose?: boolean;
}

const sizeClass = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

export function Modal({ isOpen, onClose, title, children, size = 'md', hideClose }: ModalProps) {
  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full rounded-3xl',
          'bg-[var(--color-surface)] border-3 border-[var(--color-border-strong)]',
          'shadow-[6px_6px_0px_var(--color-primary)] animate-scale-in',
          'max-h-[90vh] overflow-y-auto',
          sizeClass[size]
        )}
        style={{ borderWidth: '3px' }}
      >
        {/* Header */}
        {(title || !hideClose) && (
          <div className="flex items-center justify-between p-5 border-b-3 border-[var(--color-border)]"
            style={{ borderBottomWidth: '3px', borderBottomColor: 'var(--color-border)' }}>
            {title && (
              <h2 className="text-xl font-bold text-[var(--color-foreground)]"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {title}
              </h2>
            )}
            {!hideClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl hover:bg-[var(--color-muted-bg)] transition-colors cursor-pointer"
                aria-label="Đóng"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
