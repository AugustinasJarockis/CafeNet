import { getOrderListByLocation, Order } from '@/services/orderService';
import { PagedResult } from '@/types/PagedResult';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useOrders = (page: number, pageSize: number = 10, locationId?: number) => {
  return useQuery<PagedResult<Order>, Error>({
    queryKey: ['order', locationId, page, pageSize],
    queryFn: () => getOrderListByLocation(locationId, page, pageSize),
    enabled: !!locationId,
    keepPreviousData: true,
  } as UseQueryOptions<PagedResult<Order>, Error>);
  };
  