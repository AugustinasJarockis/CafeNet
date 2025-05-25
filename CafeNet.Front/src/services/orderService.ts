import apiClient from '@/api/apiClient';
import { AxiosError } from 'axios';
import { PagedResult } from '@/types/PagedResult';

export interface Order {
  id: number;
  type: string;
  percent: number;
  version?: string;
}

export const getOrderListByLocation = async (): Promise<Order[]> => {
  const response = await apiClient.get<Order[]>('/orders');
  return response.data;
};