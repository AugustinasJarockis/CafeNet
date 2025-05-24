import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LocationRow } from './location-row';
import type { Location } from '@/services/locationService';

interface LocationTableProps {
  locations: Location[];
  onEdit: (location: Location) => void;
  onDelete: (locationId: number) => void;
}

export default function LocationTable({
  locations,
  onEdit,
  onDelete,
}: LocationTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Location address</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {locations.map((location) => (
          <LocationRow
            key={location.id}
            location={location}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
}
