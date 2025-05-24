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
import { Tax } from '@/services/taxService';

interface EditTaxPopupProps {
  tax: Tax;
  onSubmit: (taxId: number, payload: Tax) => void;
}

export function EditTaxPopup({ tax, onSubmit }: EditTaxPopupProps) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [percentage, setPercentage] = useState('');

  useEffect(() => {
    if (tax) {
      setType(tax.type);
      setPercentage(String(tax.percent));
    }
  }, [tax]);

  const handleSubmit = () => {
    const payload: Tax = {
      id: tax.id,
      type,
      percent: parseFloat(percentage),
      version: tax.version,
    };

    onSubmit(tax.id, payload);
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
          <DialogTitle>Edit Tax</DialogTitle>
          <DialogDescription>Update the tax details below.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="percentage">Percentage (%)</Label>
            <Input
              id="percentage"
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              step="0.01"
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
