import { AxiosError } from 'axios';
import apiClient from '@/api/apiClient';

export type AddEmployeeRequest = {
  name: string;
  username: string;
  password: string;
  role: string;
  locationId: number | null;
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

    throw new Error(message)
  }
}
