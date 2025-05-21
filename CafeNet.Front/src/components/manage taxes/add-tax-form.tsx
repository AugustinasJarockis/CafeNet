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
import axios from 'axios';
import { createTax, CreateTaxRequest } from '@/services/taxService';

export function AddTaxForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const navigate = useNavigate();

  const [type, setType] = useState('');
  const [percent, setPercent] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (data: CreateTaxRequest) => createTax(data),
    onSuccess: () => {
      navigate('/menu-admin');
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to create tax.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to create tax.');
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const payload: CreateTaxRequest = {
      type,
      percent
    };

    mutation.mutate(payload);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create New Tax</CardTitle>
          <CardDescription>
            Provide the information of the new tax.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="type">Type</Label>
                <Input
                  id="type"
                  type="text"
                  placeholder="VAT"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="percent">Percent</Label>
                <Input
                  id="percent"
                  type="number"
                  min="0"
                  placeholder="10"
                  value={percent}
                  onChange={(e) => setPercent(parseInt(e.target.value))}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Creating...' : 'Create Tax'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}