import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tax } from '@/services/taxService';
import { TaxRow } from './tax-row';

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