import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateMenuItemAvailability,
  UpdateAvailabilityPayload,
} from "@/services/menuItemService";

export const useUpdateMenuItemAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateAvailabilityPayload>({
    mutationFn: updateMenuItemAvailability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
    },
  });
};