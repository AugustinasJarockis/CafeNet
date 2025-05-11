import authClient from '@/api/authClient';
import { AxiosError } from 'axios';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  username: string;
  password: string;
}

export interface LoginResponse {
  isSuccess: boolean;
  message: string;
  token?: string;
}

export interface RegisterResponse {
  isSuccess: boolean;
  message: string;
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

const register = async (
  registerRequest: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const response = await authClient.post<RegisterResponse>(
      '/register',
      registerRequest,
      { withCredentials: true }
    );

    if (response.status === 200) {
      return {
        isSuccess: true,
        message: response.data.message,
      };
    } else {
      return { isSuccess: false, message: response.data.message };
    }
  } catch (error) {
    let message = 'An unexpected error occurred.';

    if (error instanceof AxiosError && error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return {
      isSuccess: false,
      message,
    };
  }
};

export { login, register };
