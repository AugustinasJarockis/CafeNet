import { useState } from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { EditTaxPopup } from './edit-tax-popup';
import { Tax } from '@/services/taxService';
import { useMenuItemsByTax } from '@/hooks/useMenuItemsByTax';

interface TaxRowProps {
  tax: Tax;
  onEdit: (taxId: number, data: Tax) => void;
  onDelete: (taxId: number) => void;
}

export function TaxRow({ tax, onEdit, onDelete }: TaxRowProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: menuItems = [], isLoading } = useMenuItemsByTax(tax.id, dialogOpen);

  return (
    <TableRow>
      <TableCell>{tax.type}</TableCell>
      <TableCell>{tax.percent}%</TableCell>
      <TableCell className="text-right space-x-2">
        <EditTaxPopup tax={tax} onSubmit={onEdit} />
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <Trash className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {isLoading
                  ? 'Checking related menu items...'
                  : menuItems.length > 0
                  ? 'Cannot delete tax'
                  : 'Are you absolutely sure?'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {isLoading ? (
                  <span>Loading related menu items...</span>
                ) : menuItems.length > 0 ? (
                  <>
                    <p>This tax is used by the following menu items and cannot be deleted:</p>
                    <ul className="mt-2 list-disc list-inside text-sm text-red-600">
                      {menuItems.map((menuItem) => (
                        <li key={menuItem.id}>{menuItem.title}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  'This action cannot be undone. This will permanently delete the tax.'
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                { menuItems.length > 0 ?
                    'Close' :
                    'Cancel'
                }
              </AlertDialogCancel>
              {!isLoading && menuItems.length === 0 && (
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => onDelete(tax.id)}
                >
                  Delete
                </AlertDialogAction>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
