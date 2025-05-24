import { Tax, updateTax } from '@/services/taxService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateTax() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taxId, data }: { taxId: number; data: Tax }) =>
      updateTax(data, taxId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taxes'] });
    },
    onError: (error: Error) => {
      console.error('Update failed:', error.message);
    },
  });
}
