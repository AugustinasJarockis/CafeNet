import { getMenuItem, MenuItem } from '@/services/menuItemService';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useMenuItem = (id: number) => {
  return useQuery<MenuItem, Error>({
    queryKey: [`menuItem${id}`],
    queryFn: () => getMenuItem(id),
    keepPreviousData: true,
  } as UseQueryOptions<MenuItem, Error>);
};
