import { getMenuItemList, MenuItem } from '@/services/menuItemService';
import { PagedResult } from '@/types/PagedResult';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useMenuItems = (page: number, pageSize: number = 10) => {
  return useQuery<PagedResult<MenuItem>, Error>({
    queryKey: ['MenuItem', page, pageSize],
    queryFn: () => getMenuItemList(page, pageSize),
    keepPreviousData: true,
  } as UseQueryOptions<PagedResult<MenuItem>, Error>);
};
