import apiClient from '@/api/apiClient';
import { AxiosError } from 'axios';
import { PagedResult } from '@/types/PagedResult';

export interface Order {
  id: number;
  status: OrderStatus;
  discountId?: number | null;
  locationId: number;
  userId: number;
  version: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: number;
  refunded: boolean;
  orderId: number;
  menuItemId: number;
  version: string;
  orderItemVariations: OrderItemVariation[];
}

export interface OrderItemVariation {
  id: number;
  menuItemVariationId: number;
  orderItemId: number;
  version: string;
}

export enum OrderStatus {
  OPEN = 0,
  IN_PROGRESS = 1,
  DONE = 2,
  TAKEN = 3
}

export const getOrderListByLocation = async (
  locationId?: number, 
  pageNumber: number = 1,
  pageSize: number = 10
): Promise<PagedResult<Order>> => {
  const response = await apiClient.get(`/order/${locationId}`, {
    params: { pageNumber, pageSize },
  });

  return response.data;
};
