import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Pencil } from 'lucide-react';
import { useUpdateDiscount } from '@/hooks/useUpdateDiscount';
import { Discount } from '@/services/discountService';

interface EditDiscountPopupProps {
    className?: string | undefined,
    discount: Discount
}

export function EditDiscountPopup({
    discount
}: EditDiscountPopupProps) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending, error } = useUpdateDiscount();
  const [code, setCode] = useState<string>('');
  const [percent, setPercent] = useState<number | undefined>();
  const [amount, setAmount] = useState<number | undefined>();
  const [isPercentage, setIsPercentage] = useState(false);

  useEffect(() => {
    if (discount) {
        setIsPercentage(discount.percent !== null);
        setCode(discount.code);
        setPercent(discount.percent);
        setAmount(discount.amount);
    }
  }, [open, discount]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (discount) {
        const payload: Discount = {
            id: discount.id,
            code,
            percent,
            amount,
            version: discount.version
        };
        mutate(payload);
    }

    setOpen(false);
  };

  const changeDiscountType = (value: string) => {
    const boolValue = value === 'true';
    setIsPercentage(boolValue);
    setPercent(undefined);
    setAmount(undefined);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button size="icon">
                <Pencil className="h-4 w-4" />
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create new menu item variation</DialogTitle>
                <DialogDescription>
                    Specify the item variation details.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-red-500 mb-4">{error.message}</p>}
                <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="type">Code</Label>
                    <Input
                    id="type"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    />
                </div>

                <RadioGroup onValueChange={changeDiscountType} value={String(isPercentage)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="option-one"/>
                        <Label htmlFor="option-one">Percentage</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="option-two" />
                        <Label htmlFor="option-two">Amount</Label>
                    </div>
                </RadioGroup>

                { isPercentage ? (
                <div className="grid gap-3">
                    <Label htmlFor="percent">Percent</Label>
                    <Input
                    id="percent"
                    type="number"
                    min="0"
                    max="100"
                    value={isPercentage ? percent ?? '' : ''}
                    onChange={(e) => setPercent(parseInt(e.target.value))}
                    required
                    />
                </div>
                ):(
                <div className="grid gap-3">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                    id="amount"
                    type="number"
                    min="0"
                    value={!isPercentage ? amount ?? '' : ''}
                    onChange={(e) => setAmount(Math.round(+e.target.value * 100) / 100)}
                    required
                    />
                </div>
                )}
                <DialogFooter>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        {isPending ? 'Updating...' : 'Update Discount'}
                    </Button>
                </DialogFooter>
                </div>
            </form>
        </DialogContent>
    </Dialog>
  );
}