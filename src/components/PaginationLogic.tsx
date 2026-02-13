import { useState, useEffect, useCallback } from 'react';
import { AxiosResponse } from 'axios';

type FetchFn = (page: number, limit?: number) => Promise<AxiosResponse | undefined>;

function usePaginatedExhibits(fetchFn: FetchFn) {
  const [exhibits, setExhibits] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const load = useCallback(() => {
    fetchFn(page).then((response) => {
      const data = response?.data?.data;
      setExhibits(Array.isArray(data) ? data : []);
      setLastPage(response?.data?.lastPage || 1);
    });
  }, [fetchFn, page]);

  useEffect(() => {
    load();
  }, [load]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return { page, lastPage, handlePageChange, exhibits };
}

export default usePaginatedExhibits;