import apiClient from '@/api/apiClient';
import { AxiosError } from 'axios';
import { PagedResult } from '@/types/PagedResult';
import { Tax } from '@/services/taxService';
import { Discount } from '@/services/discountService';
import { Location } from '@/services/locationService';

export interface MenuItemOrderList {
  id: number;
  title: string;
  price: number;
  available: boolean;
  taxId: number;
  version: string;
  tax?: Tax; 
}

export interface MenuItemVariation {
  id: number;
  title: string;
  priceChange: number;
  menuItemId: number;
}

export interface Order {
  id: number;
  status: OrderStatus;
  discountId?: number | null;
  locationId: number;
  userId: number;
  version: string;
  orderItems: OrderItem[];
  discount?: Discount; 
  paymentStatus: PaymentStatus;
  location: Location;
}

export enum PaymentStatus {
  PENDING = "PENDING",
  DONE = "DONE",
  REFUNDED = "REFUNDED"
}

export interface OrderItem {
  id: number;
  refunded: boolean;
  orderId: number;
  menuItemId: number;
  version: string;
  menuItem: MenuItemOrderList; 
  orderItemVariations: OrderItemVariation[];
}

export interface OrderItemVariation {
  id: number;
  menuItemVariationId: number;
  orderItemId: number;
  version: string;
  menuItemVariation?: MenuItemVariation;
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

export const updateOrderStatus = async (
  id: number,
  status: OrderStatus,
  version: string
): Promise<Order> => {
  const response = await apiClient.patch(`/order/status/${id}`, {
    id,
    status,
    version,
  });

  return response.data;
};

export async function confirmPayment(orderId: number): Promise<void> {
  try {
    await apiClient.patch(`/order/paymentPaid/${orderId}`);
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error confirming payment:", err.message);
    throw err;
  }
}

export const getOrdersByClientId = async (
  clientId: number,
  pageNumber: number = 1,
  pageSize: number = 10
): Promise<PagedResult<Order>> => {
  const response = await apiClient.get(`order/ordersUser/${clientId}`, {
    params: { pageNumber, pageSize },
  });

  return response.data;
};