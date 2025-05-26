import { Discount, getDiscountByCode } from '@/services/discountService';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useDiscountByCode = (
  code: string,
  options?: Omit<UseQueryOptions<Discount, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<Discount, Error>({
    queryKey: [`discount${code}`],
    queryFn: () => getDiscountByCode(code),
    keepPreviousData: true,
    ...options,
  } as UseQueryOptions<Discount, Error>);
};
