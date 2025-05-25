import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateMenuItemVariationDTO } from '@/services/menuItemService';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { PlusIcon } from 'lucide-react';

interface AddMenuItemVariationFormProps {
    className?: string | undefined,
    handleSubmit: (payload: CreateMenuItemVariationDTO) => void
}

export function AddMenuItemVariationForm(props: AddMenuItemVariationFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [priceChange, setPriceChange] = useState<string>();

  const handleInternalSubmit = () => {
    const payload: CreateMenuItemVariationDTO = {
      title,
      priceChange: priceChange ? Math.round(+priceChange * 100) / 100 : 0
    };

    props.handleSubmit(payload);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button size="icon">
                <PlusIcon className="h-4 w-4" />
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create new menu item variation</DialogTitle>
                <DialogDescription>
                    Specify the item variation details.
                </DialogDescription>
            </DialogHeader>
            <div className={cn('flex flex-col gap-6', props.className)} {...props}>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="title">Title</Label>
                        <Input
                        id="title"
                        type="text"
                        placeholder="With vanilla"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="priceChange">Price Change</Label>
                        <Input
                        id="priceChange"
                        type="number"
                        placeholder="1.10"
                        value={priceChange}
                        onChange={(e) => setPriceChange(e.target.value)}
                        required
                        />
                    </div>
                </div>
                <br/>
                <DialogFooter>
                    <Button
                        type="submit"
                        className="w-full"
                        onClick={handleInternalSubmit}
                        >
                        Create Menu Item Variation
                    </Button>
                </DialogFooter>
            </div>
        </DialogContent>
    </Dialog>
  );
}