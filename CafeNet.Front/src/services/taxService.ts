import apiClient from '@/api/apiClient';
import { AxiosError } from 'axios';

export interface CreateTaxRequest {
  type: string;
  percent: number;
}

export interface Tax {
  id: number;
  type: string;
  percent: number;
  version?: number;
}

export const createTax = async (
  request: CreateTaxRequest
): Promise<Tax | string> => {
  try {
    const response = await apiClient.post<Tax | { message: string }>(
      '/taxes',
      request
    );

    if (response.status === 201) {
      return response.data as Tax;
    } else {
      return (response.data as { message: string }).message;
    }
  } catch (error) {
    let message = 'An unexpected error occurred.';

    if (error instanceof AxiosError && error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return message;
  }
};

export const getTaxes = async (): Promise<Tax[]> => {
  const response = await apiClient.get<Tax[]>('/taxes');
  return response.data;
};

export const deleteTax = async (id: number) => {
  await apiClient.delete(`/taxes/${id}`);
};

export const updateTax = async (data: Tax, taxId: number): Promise<Tax> => {
  try {
    const response = await apiClient.put(`taxes/${taxId}`, data);
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
