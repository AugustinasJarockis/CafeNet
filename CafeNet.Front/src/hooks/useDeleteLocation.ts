import { deleteLocation } from '@/services/locationService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations/locationsList'] });
    },
    onError: (error: Error) => {
      queryClient.invalidateQueries({ queryKey: ['locations/locationsList'] });
      console.error('Delete failed:', error.message);
    },
  });
};
