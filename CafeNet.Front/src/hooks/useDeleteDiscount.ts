import { deleteDiscount } from '@/services/discountService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDiscount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
    },
    onError: (error: Error) => {
      console.error('Delete failed:', error.message);
    },
  });
};