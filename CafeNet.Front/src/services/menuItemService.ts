import apiClient from '@/api/apiClient';
import { AxiosError } from 'axios';
import { PagedResult } from '@/types/PagedResult';
import { Tax } from '@/services/taxService';

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
  tax: Tax;
  menuItemVariations: MenuItemVariation[];
  version?: string;
}

export interface UpdateAvailabilityPayload {
  id: number;
  available: boolean;
  version?: string;
}


export interface MenuItemVariation {
    id: number;
    menuItemId: number;
    title: string;
    priceChange: number;
    version?: number;
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

export const getMenuItemList = async (
  pageNumber: number = 1,
  pageSize: number = 10
): Promise<PagedResult<MenuItem>> => {
  const response = await apiClient.get('MenuItem', {
    params: { pageNumber, pageSize },
  });

  return response.data;
};

export async function deleteMenuItem(menuItemId: number) {
  try {
    const response = await apiClient.delete(`/menuItem/${menuItemId}`);
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


export const updateMenuItemAvailability = async (
  data: UpdateAvailabilityPayload
): Promise<MenuItem> => {
  try {
    const response = await apiClient.patch(`menuitem/availability/${data.id}`, data);
    return response.data;
  } catch (error) {
    let message = "An unexpected error occurred.";
    if (error instanceof AxiosError && error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    throw new Error(message);
  }
};
