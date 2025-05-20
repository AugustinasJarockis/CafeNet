import { getLocations, Location } from '@/services/locationService';
import { PagedResult } from '@/types/PagedResult';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useLocations = (page: number, pageSize: number = 10) => {
  return useQuery<PagedResult<Location>, Error>({
    queryKey: ['locations', page, pageSize],
    queryFn: () => getLocations(page, pageSize),
    keepPreviousData: true,
  } as UseQueryOptions<PagedResult<Location>, Error>);
};
