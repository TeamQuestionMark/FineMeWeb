import { useCallback, useMemo, useState } from 'react';

export default function usePagination() {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const hasNext = useMemo(() => page < totalPage, [page, totalPage]);
  const hasPrevious = useMemo(() => page > 0, [page]);

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

  return {
    next,
    back,
    hasNext,
    hasPrevious,
    page,
    totalPage,
    setTotalPage,
  };
}
