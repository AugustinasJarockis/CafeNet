import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTax } from '@/services/taxService';

export function useDeleteTax() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTax,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taxes'] });
    },
    onError: (error: Error) => {
      queryClient.invalidateQueries({ queryKey: ['taxes'] });
      console.error('Failed to delete tax:', error.message);
    },
  });
}