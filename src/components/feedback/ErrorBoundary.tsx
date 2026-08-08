import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <div className="w-16 h-16 rounded-3xl bg-red-100 border-3 border-red-300 flex items-center justify-center"
            style={{ borderWidth: '3px' }}>
            <AlertCircle className="text-red-500" size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
              Ối! Có lỗi xảy ra
            </h3>
            <p className="text-sm text-[var(--color-muted)] mt-1">Trang này gặp sự cố. Vui lòng thử lại.</p>
          </div>
          <Button
            variant="danger"
            leftIcon={<RefreshCw size={16} />}
            onClick={() => this.setState({ hasError: false })}
          >
            Thử lại
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
