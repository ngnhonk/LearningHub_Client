import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { queryClient } from '../lib/queryClient';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        gutter={8}
        containerStyle={{ top: 70 }}
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--color-surface)',
            color: 'var(--color-foreground)',
            border: '3px solid var(--color-border-strong)',
            borderRadius: '16px',
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '14px',
            boxShadow: '4px 4px 0px var(--color-border-strong)',
            padding: '12px 16px',
          },
          success: {
            iconTheme: { primary: 'var(--color-primary)', secondary: 'white' },
            style: {
              borderColor: '#A7F3D0',
              boxShadow: '4px 4px 0px #A7F3D0',
            },
          },
          error: {
            iconTheme: { primary: '#EF4444', secondary: 'white' },
            style: {
              borderColor: '#FCA5A5',
              boxShadow: '4px 4px 0px #FCA5A5',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}
