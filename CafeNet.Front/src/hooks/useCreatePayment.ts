import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPayment } from '@/services/paymentService';
import { CreatePaymentRequest } from '@/types/dto/create-payment-request';
import { CreatePaymentResult } from '@/types/dto/create-payment-result';

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation<CreatePaymentResult, Error, CreatePaymentRequest>({
    mutationFn: (request: CreatePaymentRequest) => createPayment(request),
    onSuccess: (data) => {
      if (data.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ['payments'] });
      }
    },
    onError: (error: Error) => {
      console.error('Create payment failed:', error.message);
    },
  });
}
