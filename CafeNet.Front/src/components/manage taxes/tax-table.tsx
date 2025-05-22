import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { getTaxes } from '@/services/taxService';
import { useQuery } from '@tanstack/react-query';

export default function TaxTable() {
  const { data: taxes, isLoading, error } = useQuery({
    queryKey: ['taxes'],
    queryFn: getTaxes,
  });

  const handleEdit = () => {
    // TODO: implement edit logic
    console.log('Edit tax');
  };

  const handleDelete = () => {
    // TODO: implement delete logic
    console.log('Delete tax');
  };

  if (isLoading) return <div>Loading taxes...</div>;
  if (error) return <div className="text-red-500">Failed to load taxes.</div>;
  if (!taxes || taxes.length === 0) return <div>No taxes found.</div>;

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
          <TableRow key={tax.type + tax.percent}>
            <TableCell>{tax.type}</TableCell>
            <TableCell>{tax.percent}%</TableCell>
            <TableCell className="text-right space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleEdit()}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete()}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}