import { useCallback, useMemo, useState } from 'react';

export default function usePagination(
  init: { page: number; totalPages: number } = { page: 1, totalPages: 1 },
) {
  const [page, setPage] = useState(init.page);
  const [totalPages, setTotalPages] = useState(init.totalPages);

  const hasNext = useMemo(() => page < totalPages, [page, totalPages]);
  const hasPrevious = useMemo(() => page > 1, [page]);

  const next = useCallback(() => {
    if (hasNext) {
      setPage(prev => prev + 1);
    }
    return hasNext;
  }, [hasNext]);

  const back = useCallback(() => {
    if (hasPrevious) {
      setPage(prev => prev - 1);
    }
    return hasPrevious;
  }, [hasPrevious]);

  const navigatorProps = useMemo(
    () => ({
      page,
      totalPages,
      hasNext,
      hasPrevious,
      next,
      back,
    }),
    [back, hasNext, hasPrevious, next, page, totalPages],
  );

  return {
    next,
    back,
    hasNext,
    hasPrevious,
    page,
    totalPages,
    setTotalPages,
    navigatorProps,
  };
}
