import authClient from '@/api/authClient';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  isSuccess: boolean;
  message: string;
  token?: string;
}

const login = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await authClient.post<LoginResponse>(
      '/login',
      loginRequest,
      { withCredentials: true }
    );

    if (response.status === 200 && response.data.token) {
      localStorage.setItem('token', response.data.token);

      return {
        isSuccess: true,
        message: response.data.message,
        token: response.data.token,
      };
    } else {
      return { isSuccess: false, message: response.data.message };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.',
    };
  }
};

export { login };
