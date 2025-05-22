import { AxiosError } from 'axios';
import apiClient from '@/api/apiClient';
import { PagedResult } from '@/types/PagedResult';
import { UpdateUserPayload } from '@/types/user/UpdateUserPayload';
import { Location } from '@/services/locationService'

export type AddEmployeeRequest = {
  name: string;
  username: string;
  password: string;
  role: string;
  locationId: number | null;
};

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
  role: string;
  locationId: number | null;
  locationAddress: string;
  version: string;
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await apiClient.get('/users/profile');
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

export const updateCurrentUser = async (
  data: UpdateUserPayload
): Promise<User> => {
  try {
    const response = await apiClient.patch('/users', data);
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

export async function addEmployee(addEmployeeRequest: AddEmployeeRequest) {
  try {
    const response = await apiClient.post('/users', addEmployeeRequest);
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

export const getEmployees = async (
  pageNumber: number = 1,
  pageSize: number = 10
): Promise<PagedResult<User>> => {
  const response = await apiClient.get('/users/employees', {
    params: { pageNumber, pageSize },
  });

  return response.data;
};

export const getEmployeesByLocation = async (
  locationId: number
): Promise<User[]> => {
  const response = await apiClient.get('/users/employeesByLocation', {
    params: { locationId },
  });

  return response.data;
};

export async function deleteEmployee(employeeId: number) {
  try {
    const response = await apiClient.delete(`/users/${employeeId}`);
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

export async function getCurrentUserLocation(): Promise<Location> {
  try {
    const response = await apiClient.get('/users/User/location')
    return response.data
  } catch (error) {
    let message = 'Failed to fetch user location.'

    if (error instanceof AxiosError && error.response?.data?.message) {
      message = error.response.data.message
    } else if (error instanceof Error) {
      message = error.message
    }

    throw new Error(message)
  }
}


