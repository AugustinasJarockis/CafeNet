import { useMutation } from '@tanstack/react-query';
import apiClient from '@/api/apiClient';

export function useCreateStripeIntent() {
  return useMutation({
    mutationFn: async (payload: { amount: number }) => {
      const response = await apiClient.post('payment/stripe/create-payment-intent', payload);
      return response.data.clientSecret;
    },
  });
}