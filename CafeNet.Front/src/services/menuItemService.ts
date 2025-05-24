import apiClient from '@/api/apiClient';
import { AxiosError } from 'axios';

export interface CreateMenuItemRequest {
  title: string;
  price: number;
  imgPath?: string;
  taxId: number;
  menuItemVariations?: CreateMenuItemVariationDTO[]
}

export interface CreateMenuItemVariationDTO {
    title: string;
    priceChange: number;
}

export interface MenuItem {
  id: number;
  code: string;
  title: string;
  price: number;
  available: boolean;
  imgPath?: string;
  taxId: number;
  menuItemVariations: MenuItemVariation[];
  version?: string;
}

export interface MenuItemVariation {
    id: number;
    menuItemId: number;
    title: string;
    priceChange: number;
    version?: string;
}

export const createMenuItem = async (request: CreateMenuItemRequest): Promise<MenuItem | string> => {
    try {
        const response = await apiClient.post<MenuItem | { message: string }>('/menuItem', request);

        if (response.status === 201) {
            return response.data as MenuItem;
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

export const getMenuItemsByTax = async (
    taxId: number
): Promise<MenuItem[]> => {
  const response = await apiClient.get('/menuItem/menuItemsByTax', {
    params: { taxId },
  });

  return response.data;
};