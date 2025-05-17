import apiClient from '@/api/apiClient';
import { AxiosError } from 'axios';

export interface CreateLocationRequest {
  address: string;
}

export interface Location {
    id: string;
    address: string;
}

export const createLocation = async (request: CreateLocationRequest): Promise<Location | string> => {
    try {
        const response = await apiClient.post<Location | { message: string }>('/location', request);

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
