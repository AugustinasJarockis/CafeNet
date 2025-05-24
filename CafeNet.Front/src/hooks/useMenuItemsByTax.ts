import { useQuery } from '@tanstack/react-query';
import { getMenuItemsByTax, MenuItem } from '@/services/menuItemService';

export function useMenuItemsByTax(taxId: number, enabled: boolean) {
  return useQuery<MenuItem[], Error>({
    queryKey: ['menuItemsByTax', taxId],
    queryFn: () => getMenuItemsByTax(taxId),
    enabled,
  });
}