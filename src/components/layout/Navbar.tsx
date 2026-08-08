import { Sun, Moon, Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { getAvatarUrl, getInitials } from '../../lib/utils';

interface NavbarProps {
  title?: string;
}

export function Navbar({ title }: NavbarProps) {
  const { user } = useAuth();
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const avatarUrl = getAvatarUrl(user?.avatar_url);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header
      className="h-[var(--navbar-height)] flex items-center justify-between px-6 border-b-3 border-[var(--color-border)] bg-[var(--color-surface)] sticky top-0 z-30"
      style={{ borderBottomWidth: '3px' }}
    >
      {/* Title / Breadcrumb */}
      <div>
        {title && (
          <h1 className="text-xl font-extrabold text-[var(--color-foreground)]"
            style={{ fontFamily: 'var(--font-heading)' }}>
            {title}
          </h1>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <button
          className="relative p-2 rounded-xl hover:bg-[var(--color-muted-bg)] transition-colors cursor-pointer text-[var(--color-muted)]"
          aria-label="Thông báo"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-accent)] border-2 border-[var(--color-surface)]" />
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={() => setIsDark((d) => !d)}
          className="p-2 rounded-xl hover:bg-[var(--color-muted-bg)] transition-colors cursor-pointer text-[var(--color-muted)]"
          aria-label={isDark ? 'Chế độ sáng' : 'Chế độ tối'}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl border-3 border-[var(--color-border-strong)] overflow-hidden bg-gradient-to-br from-teal-400 to-purple-500 flex items-center justify-center cursor-pointer"
          style={{ borderWidth: '3px' }}>
          {avatarUrl
            ? <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
            : <span className="text-sm font-bold text-white">{getInitials(user?.full_name)}</span>
          }
        </div>
      </div>
    </header>
  );
}
