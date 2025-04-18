import axios from 'axios';

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
    console.log('logging in...');
    const response = await axios.post('/api/auth/login', loginRequest);
    console.log('RESPONSE: ' + response);

    if (response.status === 200) {
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
