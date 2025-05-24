import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import axios from 'axios';
import { createDiscount, CreateDiscountRequest } from '@/services/discountService';

export function AddDiscountForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const navigate = useNavigate();
  const [isPercentage, setIsPercentage] = useState(true);

  const [code, setCode] = useState('');
  const [percent, setPercent] = useState<number | undefined>(undefined);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (data: CreateDiscountRequest) => createDiscount(data),
    onSuccess: () => {
      navigate('/discounts');
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to create discount.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to create discount.');
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const payload: CreateDiscountRequest = {
      code,
      percent,
      amount
    };

    mutation.mutate(payload);
  };

  const changeDiscountType = (value: string) => {
    const boolValue = value === 'true';
    setIsPercentage(boolValue);
    setPercent(undefined);
    setAmount(undefined);
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create New Discount</CardTitle>
          <CardDescription>
            Provide the information of the new discount.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="type">Code</Label>
                <Input
                  id="type"
                  type="text"
                  placeholder="DEFAULT"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>

              <RadioGroup onValueChange={changeDiscountType} defaultValue="true">
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
                  value={percent}
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
                  value={amount}
                  onChange={(e) => setAmount(Math.round(+e.target.value * 100) / 100)}
                  required
                />
              </div>
            )}
              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Creating...' : 'Create Discount'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}