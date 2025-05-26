import { useQueries } from '@tanstack/react-query';
import { getMenuItem, MenuItem } from '@/services/menuItemService';

export const useMenuItemsFromOrder = (itemIds: number[]) => {
  const queries = useQueries({
    queries: itemIds.map((id) => ({
      queryKey: [`menuItem${id}`],
      queryFn: () => getMenuItem(id),
    })),
  });

  const allLoaded = queries.every((q) => q.isSuccess);
  const dataMap = Object.fromEntries(
    queries
      .filter((q) => q.data)
      .map((q, i) => [itemIds[i], q.data as MenuItem])
  );

  return { dataMap, isLoading: !allLoaded };
};
