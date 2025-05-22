import { getDiscounts, Discount } from '@/services/discountService';
import { PagedResult } from '@/types/PagedResult';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useDiscounts = (page: number, pageSize: number = 10) => {
  return useQuery<PagedResult<Discount>, Error>({
    queryKey: ['discounts', page, pageSize],
    queryFn: () => getDiscounts(page, pageSize),
    keepPreviousData: true,
  } as UseQueryOptions<PagedResult<Discount>, Error>);
};
