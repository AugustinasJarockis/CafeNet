import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation} from '@tanstack/react-query';
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
import { createMenuItem, CreateMenuItemRequest, CreateMenuItemVariationDTO } from '@/services/menuItemService';
import { AddMenuItemVariationForm } from './add-menu-item-variation-form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Trash } from 'lucide-react';
import { useTaxes } from '@/hooks/useTaxes';

export function AddMenuItemForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string | undefined>();
  const [imgPath, setImgPath] = useState<string | undefined>(undefined);
  const [taxId, setTaxId] = useState<string>('');
  const [menuItemVariations, setMenuItemVariations] = useState<CreateMenuItemVariationDTO[] | undefined>();
  const [error, setError] = useState<string | null>(null);
  const {data: taxes, isLoading, isError} = useTaxes();

  const mutation = useMutation({
    mutationFn: (data: CreateMenuItemRequest) => createMenuItem(data),
    onSuccess: () => {
      navigate('/items');
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to create menu item.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to create menu item.');
      }
    },
  });

  const handleVariationSubmit = (payload: CreateMenuItemVariationDTO) => {
    if (!menuItemVariations)
      setMenuItemVariations([payload]);
    else
      setMenuItemVariations([...menuItemVariations, payload]);
  }

  const removeVariation = (variation: CreateMenuItemVariationDTO) => {
    setMenuItemVariations(menuItemVariations?.filter(v => v !== variation));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const payload: CreateMenuItemRequest = {
      title,
      price: price ? Math.round(+price * 100) / 100 : 0,
      imgPath,
      taxId: parseInt(taxId),
      menuItemVariations
    };

    mutation.mutate(payload);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create New Menu Item</CardTitle>
          <CardDescription>
            Provide the information of the new menu item.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Coffee"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="3.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="imgPath">Image</Label>
                <Input
                  id="imgPath"
                  type="text"
                  placeholder='https://example.com/img'
                  value={imgPath}
                  onChange={(e) => setImgPath(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="taxId">Tax</Label>
                {isLoading ? (
                <p>Loading taxes...</p>
                ) : isError ? (
                <p className="text-red-500">Failed to load taxes</p>
                ) : (
                <select
                    id="taxId"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    className="border p-2 rounded-md"
                    required
                >
                    <option value="">Select a tax</option>
                    {Array.isArray(taxes) && taxes.length > 0 ? (
                    taxes.map((tax) => (
                        <option key={tax.id} value={tax.id}>
                        {tax.type}: {tax.percent}%
                        </option>
                    ))
                    ) : (
                    <option disabled>No taxes available</option>
                    )}
                </select>
                )}
                </div>
                
                <h2>Menu Item Variations: </h2>
                <Table>
                  <TableHeader>
                      <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Price Change</TableHead>
                      <TableHead className="text-right">
                          <AddMenuItemVariationForm handleSubmit={handleVariationSubmit}/>
                      </TableHead>
                      </TableRow>
                  </TableHeader>
                {Array.isArray(menuItemVariations) && menuItemVariations.length > 0 ? (
                  <TableBody>
                      {menuItemVariations.map((variation) => (
                      <TableRow key={menuItemVariations.indexOf(variation)}>
                          <TableCell>{variation.title}</TableCell>
                          <TableCell>{variation.priceChange}</TableCell>
                          <TableCell className="text-right space-x-2">
                              <Button onClick={() => removeVariation(variation)} variant="destructive" size="icon">
                                  <Trash className="h-4 w-4" />
                              </Button>        
                          </TableCell>
                      </TableRow>
                      ))}
                  </TableBody>
                ) : (
                    <p>No variations available</p>
                )}
                </Table>
                
              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Creating...' : 'Create New Menu Item'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}