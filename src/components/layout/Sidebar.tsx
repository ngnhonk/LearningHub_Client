import { NavLink, useNavigate } from 'react-router-dom';
import {
  BookOpen, ClipboardList, LayoutDashboard, LogOut,
  Settings, Sparkles, BarChart3, Users, GraduationCap,
  History, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useLogout } from '../../features/auth/hooks/useLogin';
import { ROUTES } from '../../constants/routes';
import { getAvatarUrl, getInitials } from '../../lib/utils';

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
  studentOnly?: boolean;
}

const studentNavItems: NavItem[] = [
  { label: 'Tổng quan', to: ROUTES.DASHBOARD, icon: <LayoutDashboard size={20} /> },
  { label: 'Môn học', to: ROUTES.SUBJECTS, icon: <BookOpen size={20} /> },
  { label: 'Đề thi', to: ROUTES.EXAMS, icon: <ClipboardList size={20} /> },
  { label: 'Lịch sử', to: ROUTES.HISTORY, icon: <History size={20} /> },
  { label: 'Hồ sơ', to: ROUTES.PROFILE, icon: <Settings size={20} /> },
];

const adminNavItems: NavItem[] = [
  { label: 'Tổng quan', to: ROUTES.ADMIN, icon: <LayoutDashboard size={20} /> },
  { label: 'Môn học', to: ROUTES.ADMIN_SUBJECTS, icon: <BookOpen size={20} /> },
  { label: 'Đề thi', to: ROUTES.ADMIN_EXAMS, icon: <ClipboardList size={20} /> },
  { label: 'Học sinh', to: ROUTES.ADMIN_USERS, icon: <Users size={20} /> },
  { label: 'AI Generator', to: ROUTES.ADMIN_AI, icon: <Sparkles size={20} /> },
  { label: 'Thống kê', to: ROUTES.ADMIN_STATS, icon: <BarChart3 size={20} /> },
];

export function Sidebar() {
  const { user, isAdmin } = useAuth();
  const { mutate: logout, isPending } = useLogout();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const navItems = isAdmin ? adminNavItems : studentNavItems;
  const avatarUrl = getAvatarUrl(user?.avatar_url);

  return (
    <aside
      className={cn(
        'flex flex-col h-screen sticky top-0',
        'bg-[var(--color-surface)] border-r-3 border-[var(--color-border-strong)]',
        'transition-all duration-300 z-40 shrink-0',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}
      style={{ borderRightWidth: '3px' }}
    >
      {/* Logo */}
      <div className={cn(
        'flex items-center gap-3 px-4 py-4 border-b-3 border-[var(--color-border)]',
        collapsed && 'justify-center'
      )} style={{ borderBottomWidth: '3px' }}>
        <button
          onClick={() => navigate(isAdmin ? ROUTES.ADMIN : ROUTES.DASHBOARD)}
          className="flex items-center gap-3 cursor-pointer"
          aria-label="Về trang chủ"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 border-3 border-teal-700 flex items-center justify-center shadow-[3px_3px_0px_#0f766e] shrink-0"
            style={{ borderWidth: '3px' }}>
            <GraduationCap size={20} className="text-white" />
          </div>
          {!collapsed && (
            <span className="font-extrabold text-lg text-[var(--color-foreground)] whitespace-nowrap"
              style={{ fontFamily: 'var(--font-heading)' }}>
              LearningHub
            </span>
          )}
        </button>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 py-2">
          <span className={cn(
            'text-xs font-bold px-2 py-0.5 rounded-full border-2',
            isAdmin
              ? 'bg-purple-100 text-purple-700 border-purple-300'
              : 'bg-teal-100 text-teal-700 border-teal-300'
          )}>
            {isAdmin ? '⚡ Admin' : '🎓 Học sinh'}
          </span>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === ROUTES.DASHBOARD || item.to === ROUTES.ADMIN}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-2xl mb-1 font-bold text-sm',
                'transition-all duration-150 cursor-pointer',
                collapsed && 'justify-center px-2',
                isActive
                  ? 'bg-[var(--color-primary)] text-white shadow-[3px_3px_0px_var(--color-primary-dark)] border-2 border-[var(--color-primary-dark)]'
                  : 'text-[var(--color-muted)] hover:bg-[var(--color-muted-bg)] hover:text-[var(--color-foreground)]'
              )
            }
            title={collapsed ? item.label : undefined}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User profile at bottom */}
      <div className={cn(
        'p-3 border-t-3 border-[var(--color-border)] space-y-2',
      )} style={{ borderTopWidth: '3px' }}>
        {/* User info */}
        <div className={cn(
          'flex items-center gap-3 px-2 py-2 rounded-2xl',
          'hover:bg-[var(--color-muted-bg)] transition-colors cursor-pointer',
          collapsed && 'justify-center'
        )}
          onClick={() => navigate(isAdmin ? ROUTES.PROFILE : ROUTES.PROFILE)}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-purple-500 border-2 border-teal-600 flex items-center justify-center shrink-0 overflow-hidden">
            {avatarUrl
              ? <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              : <span className="text-xs font-bold text-white">{getInitials(user?.full_name)}</span>
            }
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-bold text-[var(--color-foreground)] truncate">{user?.full_name}</p>
              <p className="text-xs text-[var(--color-muted)] truncate">@{user?.username}</p>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={() => logout()}
          disabled={isPending}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-sm font-bold',
            'text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer',
            'disabled:opacity-50',
            collapsed && 'justify-center'
          )}
          title={collapsed ? 'Đăng xuất' : undefined}
        >
          <LogOut size={18} />
          {!collapsed && 'Đăng xuất'}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="w-full flex items-center justify-center py-1.5 rounded-xl hover:bg-[var(--color-muted-bg)] transition-colors text-[var(--color-muted)] cursor-pointer"
          aria-label={collapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
