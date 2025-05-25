import { getOrderListByLocation, Order } from '@/services/orderService';
import { PagedResult } from '@/types/PagedResult';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useOrders = (page: number, pageSize: number = 10) => {
  return useQuery<PagedResult<Order>, Error>({
    queryKey: ['order', page, pageSize],
    queryFn: () => getOrderListByLocation(page, pageSize),
    keepPreviousData: true,
  } as UseQueryOptions<PagedResult<Order>, Error>);
};
