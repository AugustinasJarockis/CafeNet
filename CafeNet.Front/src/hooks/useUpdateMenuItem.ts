import { updateMenuItem, CreateMenuItemRequestPopup } from '@/services/menuItemService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ menuItemId, data }: { menuItemId: number; data: CreateMenuItemRequestPopup }) =>
      updateMenuItem(data, menuItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['MenuItem'] });
    },
    onError: (error: Error) => {
      queryClient.invalidateQueries({ queryKey: ['MenuItem'] });
      console.error('Update failed:', error.message);
    },
  });
}
