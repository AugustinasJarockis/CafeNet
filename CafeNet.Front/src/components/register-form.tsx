import { useEffect } from 'react';
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
import { register, RegisterRequest } from '@/services/authService';
import { getLocations, Location } from '@/services/locationService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [locationId, setLocationId] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  const fetchLocations = async () => {
    try {
      const res = await getLocations(); 
      setLocations(res);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  fetchLocations();
}, []);

  const handleRegister = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError(null);

    try {
      const registerRequest: Omit<RegisterRequest, 'email'> = {
        name,
        username,
        password,
        locationId,
      };

      const response = await register(registerRequest as RegisterRequest);
      if (!response.isSuccess) {
        setError(response.message);
        return;
      }

      navigate('/');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred.'
      );
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create a new account</CardTitle>
          <CardDescription>
            Fill in your information below to register.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
              <Label htmlFor="locationId">Location</Label>
                {isLoading ? (
                  <p>Loading locations...</p>
                ) : isError ? (
                  <p className="text-red-500">Failed to load locations</p>
                ) : (
                  <select
                    id="locationId"
                    value={locationId}
                    onChange={(e) => setLocationId(e.target.value)}
                    className="border p-2 rounded-md"
                    required
                  >
                    <option value="">Select a location</option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.address}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <a href="/" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
      {error}
    </div>
  );
}
