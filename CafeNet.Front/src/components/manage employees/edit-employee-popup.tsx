import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';
import { User } from '@/services/employeeService';
import { UpdateUserPayload } from '@/types/user/UpdateUserPayload';
import { useLocations } from '@/hooks/useLocations';

interface EditEmployeeFormProps {
  employee: User;
  onSubmit: (payload: UpdateUserPayload, userId: number) => void;
}

export function EditEmployeeForm({
  employee,
  onSubmit,
}: EditEmployeeFormProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [locationId, setLocationId] = useState<number | undefined>(employee.locationId);

  const { data, isLoading, error } = useLocations(1, 100);

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setUsername(employee.username);
      setLocationId(employee.locationId);
    }
  }, [employee]);

  const handleSubmit = () => {
    const payload: UpdateUserPayload = {
      name,
      username,
      locationId,
      version: employee.version,
    };

    onSubmit(payload, employee.id);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogDescription>
            Update the employee’s details below.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="johndoe"
              required
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="location">Location</Label>
            <select
              id="location"
              value={locationId}
              onChange={(e) => setLocationId(Number(e.target.value))}
              className="border p-2 rounded-md w-full"
              required
            >
              <option value="">Select a location</option>
              {isLoading && <option disabled>Loading...</option>}
              {error && <option disabled>Error loading locations</option>}
              {data?.items.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.address}
                </option>
              ))}
            </select>
          </div>

          <DialogFooter>
            <Button onClick={handleSubmit} className="w-full">
              Save Changes
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
