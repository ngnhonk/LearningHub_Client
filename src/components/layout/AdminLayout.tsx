import { AppShell } from './AppShell';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

// AdminLayout is just AppShell — can extend with admin-specific elements later
export function AdminLayout({ children, title }: AdminLayoutProps) {
  return <AppShell title={title}>{children}</AppShell>;
}
