import { useState } from 'react';

interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
}

export function usePagination({ initialPage = 1, initialPageSize = 10 }: UsePaginationOptions = {}) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  function goToPage(p: number) { setPage(p); }
  function nextPage() { setPage((p) => p + 1); }
  function prevPage() { setPage((p) => Math.max(1, p - 1)); }
  function reset() { setPage(initialPage); }

  return { page, pageSize, setPage: goToPage, nextPage, prevPage, setPageSize, reset };
}
