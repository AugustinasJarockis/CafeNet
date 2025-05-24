import { getDiscount, Discount } from '@/services/discountService';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useDiscount = (id: number) => {
  return useQuery<Discount, Error>({
    queryKey: [`discount${id}`],
    queryFn: () => getDiscount(id),
    keepPreviousData: true,
  } as UseQueryOptions<Discount, Error>);
};
