import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateMenuItemAvailability,
  UpdateAvailabilityPayload,
  MenuItem,
} from "@/services/menuItemService";

export const useUpdateMenuItemAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation<MenuItem, Error, UpdateAvailabilityPayload>({
    mutationFn: updateMenuItemAvailability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["MenuItem"] }); 
    },
    onError: (error: Error) => {
      queryClient.invalidateQueries({ queryKey: ['MenuItem'] });
      console.error('Update failed:', error.message);
    },
  });
};