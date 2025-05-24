import apiClient from '@/api/apiClient';
import { AxiosError } from 'axios';
import { PagedResult } from '@/types/PagedResult';

export interface CreateLocationRequest {
  address: string;
}

export interface Location {
  id: number;
  address: string;
  version?: string;
}

export const createLocation = async (request: CreateLocationRequest): Promise<Location | string> => {
    try {
        const response = await apiClient.post<Location | { message: string }>('/locations', request);

        if (response.status === 201) {
            return response.data as Location;
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

export async function getLocations(): Promise<Location[]> {
  const response = await apiClient.get<Location[]>('/locations');
  return response.data;
}

export const getLocationsList = async (
  pageNumber: number = 1,
  pageSize: number = 10
): Promise<PagedResult<Location>> => {
  const response = await apiClient.get('/locations/locationsList', {
    params: { pageNumber, pageSize },
  });

  return response.data;
};

export async function deleteLocation(locationId: number) {
  try {
    const response = await apiClient.delete(`/locations/${locationId}`);
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

export const updateLocation = async (data: Location, locationId: number): Promise<Location> => {
  try {
    const response = await apiClient.put(`locations/${locationId}`, data);
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
