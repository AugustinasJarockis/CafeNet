import { getCurrentUser, User } from '@/services/employeeService';
import { useQuery } from '@tanstack/react-query';

export const useCurrentUser = () => {
  return useQuery<User>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
  });
};
