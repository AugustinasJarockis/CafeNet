import authClient from '@/api/authClient';

export interface LoginRequest {
  Email: string;
  Password: string;
}

export interface LoginResponse {
  IsSuccess: boolean;
  Message: string;
  Token?: string;
}

const login = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await authClient.post<LoginResponse>(
      '/login',
      loginRequest,
      { withCredentials: true }
    );

    if (response.status === 200 && response.data.Token) {
      localStorage.setItem('token', response.data.Token);

      return {
        IsSuccess: true,
        Message: response.data.Message,
        Token: response.data.Token,
      };
    } else {
      return { IsSuccess: false, Message: response.data.Message };
    }
  } catch (error) {
    return {
      IsSuccess: false,
      Message:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.',
    };
  }
};

export { login };
