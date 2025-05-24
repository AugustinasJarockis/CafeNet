import { Location, updateLocation } from "@/services/locationService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

   return useMutation({
    mutationFn: ({ data }: { data: Location }) =>
      updateLocation(data),
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['locations/locationsList'], exact: false });
    },
    onError: (error: Error) => {
      console.error('Update failed:', error.message);
      alert(`Update failed: ${error.message}`);
      queryClient.invalidateQueries({ queryKey:['locations/locationsList']}); 
    },
  });
};