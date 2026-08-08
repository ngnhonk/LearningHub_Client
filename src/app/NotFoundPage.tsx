import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Home } from 'lucide-react';
import { ROUTES } from '../constants/routes';

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
      <div className="text-center space-y-4">
        <div className="text-8xl animate-float">🔍</div>
        <h1 className="text-4xl font-extrabold text-[var(--color-foreground)]"
          style={{ fontFamily: 'var(--font-heading)' }}>
          404
        </h1>
        <p className="text-[var(--color-muted)] font-semibold">Trang này không tồn tại!</p>
        <Button variant="primary" leftIcon={<Home size={16} />}
          onClick={() => navigate(ROUTES.HOME)}>
          Về trang chủ
        </Button>
      </div>
    </div>
  );
}
