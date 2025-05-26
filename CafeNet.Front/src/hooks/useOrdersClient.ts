import { getOrdersByClientId, Order } from '@/services/orderService';
import { PagedResult } from '@/types/PagedResult';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useOrdersClient = (
  clientId?: number,
  page: number = 1,
  pageSize: number = 10
) => {
  return useQuery<PagedResult<Order>, Error>({
    queryKey: ['client-orders', clientId, page, pageSize],
    queryFn: () => getOrdersByClientId(clientId!, page, pageSize),
    enabled: !!clientId,
    keepPreviousData: true,
  } as UseQueryOptions<PagedResult<Order>, Error>);
};