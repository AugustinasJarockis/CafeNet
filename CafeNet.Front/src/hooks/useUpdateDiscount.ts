import { Discount, updateDiscount } from "@/services/discountService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation<Discount, Error, Discount>({
    mutationFn: updateDiscount,
    onSuccess: (updatedDiscount) => {
      queryClient.setQueryData([`discount${updatedDiscount.id}`], updatedDiscount);
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
    },
    onError: (error: Error) => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      console.error('Update failed:', error.message);
    },
  });
};