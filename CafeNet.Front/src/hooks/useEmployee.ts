import { getEmployees, User } from '@/services/employeeService';
import { PagedResult } from '@/types/PagedResult';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useEmployees = (page: number, pageSize: number = 10) => {
  return useQuery<PagedResult<User>, Error>({
    queryKey: ['employees', page, pageSize],
    queryFn: () => getEmployees(page, pageSize),
    keepPreviousData: true,
  } as UseQueryOptions<PagedResult<User>, Error>);
};
