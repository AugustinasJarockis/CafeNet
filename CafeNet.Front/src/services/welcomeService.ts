import apiClient from '@/api/apiClient';

export interface WelcomeResponse {
  message: string;
}

export const fetchWelcomeMessage = async (): Promise<WelcomeResponse> => {
  const response = await apiClient.get<WelcomeResponse>('/welcome');
  return response.data;
};
