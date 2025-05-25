import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login, LoginRequest } from '@/services/authService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/services/authService';
import { useAuth } from '@/context/authContext'; 

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogin = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const loginRequest: LoginRequest = {
        username: username,
        password: password,
      };

      const response = await login(loginRequest);
      if (!response.isSuccess || !response.token) {
        setError(response.message);
        return;
      }

      const decoded = jwtDecode<DecodedToken>(response.token);
      setAuth(response.token, decoded);

      const role = decoded.role;

      if (role === 'ADMIN') {
        navigate('/menu-admin');
      } else if (role === 'BARISTA') {
        navigate('/menu-barista');
      } else if (role === 'CLIENT') {
        navigate('/menu-client');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred.'
      );
    }
  };

  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your username and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="your username"
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleNavigateToRegister}
                >
                  Sign up
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      {error}
    </div>
  );
}
