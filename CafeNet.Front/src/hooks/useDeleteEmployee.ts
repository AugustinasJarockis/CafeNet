import { deleteEmployee } from '@/services/employeeService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (error: Error) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      console.error('Delete failed:', error.message);
    },
  });
};
