import apiClient from '@/api/apiClient';

export interface Location {
  id: number;
  address: string;
  version?: number;
}

export async function getLocations(): Promise<Location[]> {
  const response = await apiClient.get<Location[]>('/locations');
  return response.data;
}
