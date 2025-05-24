import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { LocationRow } from './location-row';
import type { Location } from '@/services/locationService';
import { useUpdateLocation } from '@/hooks/useUpdateLocation';

interface LocationTableProps {
  locations: Location[];
  onDelete: (locationId: number) => void;
}

export default function LocationTable({
  locations,
  onDelete,
}: LocationTableProps) {
  const updateLocationMutation = useUpdateLocation();

  const handleEdit = (locationId: number, updatedLocation: Location) => {
    updateLocationMutation.mutate({
      locationId,
      data: updatedLocation,
    });
  };

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
            onEdit={handleEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
}
