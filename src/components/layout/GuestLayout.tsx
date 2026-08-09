import { Outlet } from 'react-router-dom';
import { GuestHeader } from './GuestHeader';
import { GuestFooter } from './GuestFooter';

export function GuestLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-200">
      <GuestHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <GuestFooter />
    </div>
  );
}
