import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MenuItemVariation } from '@/services/menuItemService';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface SelectMenuItemVariationFormProps {
    className?: string | undefined,
    handleSubmit: (variation: MenuItemVariation) => void;
    menuItemVariations: MenuItemVariation[];
}

export function SelectMenuItemVariationForm({ 
    className,
    handleSubmit,
    menuItemVariations,
}: SelectMenuItemVariationFormProps) {
  const [variationId, setVariationId] = useState<string>('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setVariationId("");
  }, [open])

  const handleInternalSubmit = () => {
    const selectedVariation = menuItemVariations.find(variation => variation.id === parseInt(variationId));

    if (selectedVariation)
        handleSubmit(selectedVariation);
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
                <DialogTitle>Select variation</DialogTitle>
            </DialogHeader>
            <div className={cn('flex flex-col gap-6', className)}>
                <div className="flex flex-col gap-6">
                    <Select
                        value={variationId || "none"}
                        onValueChange={(value) => {
                            if (value === "none") {
                                setVariationId("");
                            } else {
                                setVariationId(value);
                            }
                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a variation" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="none">Select a variation</SelectItem>
                        {Array.isArray(menuItemVariations) && menuItemVariations.length > 0 ? (
                        menuItemVariations.map((variation) => (
                            <SelectItem key={variation.id}
                                        value={String(variation.id)}
                                        className="flex items-center justify-between bg-muted/50 p-2 rounded-md"
                            >
                                <span className="font-medium">{variation.title}</span>
                                &nbsp;&nbsp;&nbsp;
                                <Badge variant={variation.priceChange >= 0 ? "default" : "destructive"}>
                                    {variation.priceChange >= 0 ? "+" : ""}
                                    {variation.priceChange.toFixed(2)}
                                </Badge>
                            </SelectItem>
                            ))
                        ) : (
                            <SelectItem value="disabled" disabled>
                                No variations available
                            </SelectItem>
                        )}
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        className="w-full"
                        onClick={handleInternalSubmit}
                        >
                        Select Variation
                    </Button>
                </DialogFooter>
            </div>
        </DialogContent>
    </Dialog>
  );
}