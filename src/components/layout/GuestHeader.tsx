import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, LogIn, UserPlus, LayoutDashboard, HelpCircle, PhoneCall, Info, Layers, Home } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../features/auth/hooks/useAuth';

export function GuestHeader() {
  const location = useLocation();
  const { isAuthenticated, isTeacherOrAdmin } = useAuth();
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Trang chủ', path: ROUTES.HOME, icon: Home },
    { label: 'Giới thiệu', path: ROUTES.ABOUT, icon: Info },
    { label: 'Tính năng', path: ROUTES.FEATURES, icon: Layers },
    { label: 'Hướng dẫn & FAQ', path: ROUTES.FAQ, icon: HelpCircle },
    { label: 'Liên hệ', path: ROUTES.CONTACT, icon: PhoneCall },
  ];

  const dashboardTarget = isTeacherOrAdmin ? ROUTES.ADMIN : ROUTES.DASHBOARD;

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-surface)]/90 backdrop-blur-md border-b-3 border-[var(--color-border-strong)] transition-colors duration-200" style={{ borderBottomWidth: '3px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-3 group cursor-pointer">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 via-emerald-400 to-amber-400 p-0.5 shadow-md clay-card-sm flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[var(--color-surface)] rounded-[14px] flex items-center justify-center font-bold text-xl text-[var(--color-primary)]">
              ⚡
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tight text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
              Learning<span className="text-[var(--color-accent)]">Hub</span>
            </span>
            <span className="text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-wider -mt-1">
              Hệ thống luyện thi AI
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[var(--color-primary-100)] text-[var(--color-primary-dark)] border-2 border-[var(--color-primary)] shadow-sm'
                    : 'text-[var(--color-foreground)] hover:bg-[var(--color-muted-bg)] hover:text-[var(--color-primary)]'
                }`}
              >
                <Icon size={17} className={isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-muted)]'} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Dark mode toggle */}
          <button
            onClick={() => setIsDark((d) => !d)}
            className="p-2.5 rounded-xl bg-[var(--color-surface-2)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-foreground)] transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-teal-600" />}
          </button>

          {/* Auth Action Buttons */}
          {isAuthenticated ? (
            <Link
              to={dashboardTarget}
              className="px-4 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold text-sm flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <LayoutDashboard size={18} />
              <span>Vào Dashboard</span>
            </Link>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to={ROUTES.LOGIN}
                className="px-4 py-2 rounded-xl border-2 border-[var(--color-border-strong)] text-[var(--color-foreground)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer hover:bg-[var(--color-muted-bg)]"
              >
                <LogIn size={16} />
                <span>Đăng nhập</span>
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-amber-500 hover:opacity-95 text-white font-bold text-sm flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-amber-600"
              >
                <UserPlus size={16} />
                <span>Đăng ký</span>
              </Link>
            </div>
          )}

          {/* Mobile menu hamburger button */}
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="md:hidden p-2.5 rounded-xl bg-[var(--color-surface-2)] border-2 border-[var(--color-border)] text-[var(--color-foreground)] cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--color-surface)] border-b-3 border-[var(--color-border-strong)] px-4 pt-3 pb-6 space-y-3 animate-slide-up">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl text-base font-bold flex items-center gap-3 transition-colors ${
                    isActive
                      ? 'bg-[var(--color-primary-100)] text-[var(--color-primary-dark)] border-2 border-[var(--color-primary)]'
                      : 'text-[var(--color-foreground)] hover:bg-[var(--color-muted-bg)]'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-muted)]'} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {!isAuthenticated && (
            <div className="pt-3 border-t border-[var(--color-border)] flex flex-col gap-2">
              <Link
                to={ROUTES.LOGIN}
                className="w-full py-3 rounded-xl border-2 border-[var(--color-border-strong)] text-[var(--color-foreground)] font-bold text-center flex items-center justify-center gap-2"
              >
                <LogIn size={18} />
                <span>Đăng nhập</span>
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-amber-500 text-white font-bold text-center flex items-center justify-center gap-2 shadow-md"
              >
                <UserPlus size={18} />
                <span>Tạo tài khoản mới</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
