import React from 'react';
import { cn } from '../../lib/utils';
import { LoadingSpinner } from '../feedback/LoadingSpinner';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  keyField?: keyof T;
}

export function Table<T extends Record<string, unknown>>({
  data,
  columns,
  isLoading,
  emptyMessage = 'Không có dữ liệu',
  keyField = 'id' as keyof T,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border-3 border-[var(--color-border-strong)] shadow-[4px_4px_0px_var(--color-border-strong)]"
      style={{ borderWidth: '3px' }}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--color-primary-50)] border-b-3 border-[var(--color-border-strong)]"
            style={{ borderBottomWidth: '3px' }}>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn(
                  'px-4 py-3 text-left font-bold text-[var(--color-foreground)]',
                  col.className
                )}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-[var(--color-muted)]">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={String(row[keyField] ?? i)}
                className={cn(
                  'border-b border-[var(--color-border)] transition-colors',
                  'hover:bg-[var(--color-muted-bg)]',
                  i === data.length - 1 && 'border-b-0'
                )}
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={cn('px-4 py-3 text-[var(--color-foreground)]', col.className)}
                  >
                    {col.render
                      ? col.render(row[col.key as keyof T], row)
                      : String(row[col.key as keyof T] ?? '—')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
