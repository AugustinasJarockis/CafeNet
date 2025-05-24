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
    DialogTrigger 
} from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';
import { Location } from '@/services/locationService';

interface EditLocationDialogProps {
  location: Location;
  onSubmit: (locationId: number, payload: Location ) => void;
}

export function EditLocationPopup({ 
    location, 
    onSubmit,
}: EditLocationDialogProps) {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (location) {
      setAddress(location.address);
    }
  }, [location]);

  const handleSubmit = () => {
    const payload: Location = {
      id: location.id,
      address,
      version: location.version,
    };
    onSubmit(location.id, payload);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Location</DialogTitle>
          <DialogDescription>Update the address for this location.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St"
              required
            />
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
