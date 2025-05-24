import { deleteMenuItem } from '@/services/menuItemService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['MenuItem'] });
    },
    onError: (error: Error) => {
      console.error('Delete failed:', error.message);
      queryClient.invalidateQueries({ queryKey: ['MenuItem'] });
    },
  });
};
