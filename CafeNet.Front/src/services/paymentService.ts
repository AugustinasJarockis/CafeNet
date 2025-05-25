import apiClient from '@/api/apiClient';
import { CreatePaymentRequest } from '@/types/dto/create-payment-request';
import { CreatePaymentResult } from '@/types/dto/create-payment-result';
import { AxiosError } from 'axios';

export const createPayment = async (
  request: CreatePaymentRequest
): Promise<CreatePaymentResult> => {
  try {
    const response = await apiClient.post<CreatePaymentResult>(
      '/payments',
      request
    );

    if (response.status === 201 || response.status === 200) {
      return {
        isSuccess: true,
        paymentId: response.data.paymentId,
        orderId: response.data.orderId,
      };
    } else {
      return {
        isSuccess: false,
        errorMessage: 'Unexpected response from server.',
      };
    }
  } catch (error) {
    let message = 'An unexpected error occurred.';

    if (error instanceof AxiosError && error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return {
      isSuccess: false,
      errorMessage: message,
      paymentId: 0,
      orderId: 0,
    };
  }
};
