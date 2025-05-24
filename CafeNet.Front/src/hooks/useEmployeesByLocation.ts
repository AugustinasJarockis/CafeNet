import { getEmployeesByLocation, User } from '@/services/employeeService';
import { useQuery } from '@tanstack/react-query';

export function useEmployeesByLocation(locationId: number | undefined) {
  return useQuery<User[], Error>({
    queryKey: ['employeesByLocation', locationId],
    queryFn: () => locationId ? getEmployeesByLocation(locationId) : Promise.resolve([]),
    enabled: !!locationId,
  });
}
