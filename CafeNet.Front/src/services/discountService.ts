import apiClient from '@/api/apiClient';
import { AxiosError } from 'axios';
import { PagedResult } from '@/types/PagedResult';

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
  version: number;
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

export const updateDiscount = async (
  data: Discount
): Promise<Discount> => {
  try {
    const response = await apiClient.put('/discounts', data);
    return response.data;
  } catch (error) {
    let message = 'An unexpected error occurred.';
    if (error instanceof AxiosError && error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    throw new Error(message);
  }
};

export const getDiscounts = async (
  pageNumber: number = 1,
  pageSize: number = 10
): Promise<PagedResult<Discount>> => {
  const response = await apiClient.get('/discounts', {
    params: { pageNumber, pageSize },
  });

  return response.data;
};

export const getDiscount = async (
  id: number
): Promise<Discount> => {
  const response = await apiClient.get(`/discounts/${id}`);

  return response.data;
};

export async function deleteDiscount(discountId: number) {
  try {
    const response = await apiClient.delete(`/discounts/${discountId}`);
    return response.data;
  } catch (error) {
    let message = 'An unexpected error occurred.';

    if (error instanceof AxiosError && error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    throw new Error(message);
  }
}