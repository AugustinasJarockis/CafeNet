import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
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
import { addEmployee, AddEmployeeRequest } from '@/services/employeeService';
import axios from 'axios';
import { getLocations, Location } from '@/services/locationService';
import { useEffect } from 'react';

export function AddEmployeeForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('BARISTA');
  const [locationId, setLocationId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (data: AddEmployeeRequest) => addEmployee(data),
    onSuccess: () => {
      navigate('/employees');
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to add employee.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to add employee.');
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const payload: AddEmployeeRequest = {
      name,
      username,
      password,
      role,
      locationId: locationId ? parseInt(locationId) : null,
    };

    mutation.mutate(payload);
  };

  const {
    data: locations,
    isLoading,
    isError,
  } = useQuery<Location[], Error>({
    queryKey: ['locations'],
    queryFn: getLocations,
  });

  useEffect(() => {
    if (role !== 'BARISTA') {
      setLocationId('');
    }
  }, [role]);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Add New Employee</CardTitle>
          <CardDescription>
            Fill out the details below to create a new employee account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border p-2 rounded-md"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="BARISTA">Barista</option>
                </select>
              </div>
              {role === 'BARISTA' && (
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
                    >
                      <option value="">Select a location</option>
                      {Array.isArray(locations) && locations.length > 0 ? (
                        locations.map((loc) => (
                          <option key={loc.id} value={loc.id}>
                            {loc.address}
                          </option>
                        ))
                      ) : (
                        <option disabled>No locations available</option>
                      )}
                    </select>
                  )}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Creating...' : 'Add Employee'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
