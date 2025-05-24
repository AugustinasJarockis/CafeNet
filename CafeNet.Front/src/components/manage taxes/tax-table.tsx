import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { useEffect, useState } from 'react';
import { getMenuItemsByTax, MenuItem } from '@/services/menuItemService';

interface TaxTableProps {
  taxes: Tax[];
  onEdit: (taxId: number, data: Tax) => void;
  onDelete: (taxId: number) => void;
}

export default function TaxTable({
  taxes,
  onEdit,
  onDelete,
}: TaxTableProps) {
  if (taxes.length === 0) {
    return <div>No taxes found.</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Percent</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {taxes.map((tax) => (
          <TaxRow
            key={tax.id}
            tax={tax}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
}

function TaxRow({
  tax,
  onEdit,
  onDelete,
}: {
  tax: Tax;
  onEdit: (taxId: number, data: Tax) => void;
  onDelete: (taxId: number) => void;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dialogOpen) {
      setLoading(true);
      getMenuItemsByTax(tax.id)
        .then(setMenuItems)
        .finally(() => setLoading(false));
    } else {
      setMenuItems([]);
      setLoading(false);
    }
  }, [dialogOpen, tax.id]);

  console.table(menuItems);

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
                {loading
                  ? 'Checking related menu items...'
                  : menuItems.length > 0
                  ? 'Cannot delete tax'
                  : 'Are you absolutely sure?'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {loading ? (
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
              <AlertDialogCancel>Close</AlertDialogCancel>
              {!loading && menuItems.length === 0 && (
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