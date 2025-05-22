import apiClient from '@/api/apiClient';
import { AxiosError } from 'axios';

export interface CreateDiscountRequest {
  code: string;
  percent?: number;
  amount?: number;
}

export interface Discount {
  id: number;
  code: string;
  percent?: number;
  amount?: number;
  version?: number;
}

export const createDiscount = async (request: CreateDiscountRequest): Promise<Discount | string> => {
    try {
        const response = await apiClient.post<Discount | { message: string }>('/discounts', request);

        if (response.status === 201) {
            return response.data as Discount;
        } else {
            return (response.data as {message: string}).message;
        }
    }
    catch (error) {
        let message = 'An unexpected error occurred.';
        
        if (error instanceof AxiosError && error.response?.data?.message) {
            message = error.response.data.message;
        } else if (error instanceof Error) {
            message = error.message;
        }

        return message;
    }
};