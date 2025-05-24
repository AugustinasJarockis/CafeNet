import { Discount, updateDiscount, UpdateDiscountRequest } from "@/services/discountService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation<Discount, Error, UpdateDiscountRequest>({
    mutationFn: updateDiscount,
    onSuccess: (updatedDiscount) => {
      queryClient.setQueryData([`discount${updatedDiscount.id}`], updatedDiscount);
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
    },
  });
};