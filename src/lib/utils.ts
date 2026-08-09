import { BASE_URL } from '../api/axiosClient';

// ---- classnames helper ----
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ---- Date formatting ----
export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '—';
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

export function formatDateShort(dateStr: string | null | undefined): string {
  if (!dateStr) return '—';
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(dateStr));
}

// ---- Score formatting ----
export function formatScore(score: number | null | undefined, total: number = 100): string {
  if (score === null || score === undefined) return '—';
  return `${Number(score).toFixed(1)}/${total} pts`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

// ---- Duration formatting ----
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} phút`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}p` : `${h} giờ`;
}

export function formatSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// ---- Avatar URL ----
export function getAvatarUrl(avatarPath: string | null | undefined): string | null {
  if (!avatarPath) return null;
  if (avatarPath.startsWith('http')) return avatarPath;
  return `${BASE_URL}${avatarPath}`;
}

// ---- Initials fallback ----
export function getInitials(name: string | undefined | null): string {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ---- Subject colors (deterministic by id) ----
const CLAY_COLORS = [
  { bg: '#F0FDF4', border: '#22C55E', shadow: '#16A34A', text: '#15803D' },
  { bg: '#FFF7ED', border: '#F97316', shadow: '#EA6C00', text: '#C2570A' },
  { bg: '#FAF5FF', border: '#A855F7', shadow: '#9333EA', text: '#7C3AED' },
  { bg: '#FFF1F2', border: '#EC4899', shadow: '#DB2777', text: '#BE185D' },
  { bg: '#EFF6FF', border: '#3B82F6', shadow: '#2563EB', text: '#1D4ED8' },
  { bg: '#FEFCE8', border: '#EAB308', shadow: '#CA8A04', text: '#A16207' },
  { bg: '#F0FDFA', border: '#14B8A6', shadow: '#0D9488', text: '#0F766E' },
];

export function getSubjectColor(id: string) {
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return CLAY_COLORS[hash % CLAY_COLORS.length];
}

// ---- Truncate text ----
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '…';
}
