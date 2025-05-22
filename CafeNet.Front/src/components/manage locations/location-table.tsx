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
import { User } from '@/services/employeeService';
import { Location } from '@/services/locationService';
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
} from '../ui/alert-dialog';
import { useEffect, useState } from 'react';
import { getEmployeesByLocation } from '@/services/employeeService';

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

function LocationRow({
  location,
  onEdit,
  onDelete,
}: {
  location: Location;
  onEdit: (location: Location) => void;
  onDelete: (locationId: number) => void;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [employees, setEmployees] = useState<User[]>([]);

  useEffect(() => {
    if (dialogOpen) {
      getEmployeesByLocation(location.id).then(setEmployees);
    } else {
      setEmployees([]);
    }
  }, [dialogOpen, location.id]);

  return (
    <TableRow>
      <TableCell>{location.address}</TableCell>
      <TableCell className="text-right space-x-2">
        <Button variant="outline" size="icon" onClick={() => onEdit(location)}>
          <Pencil className="h-4 w-4" />
        </Button>

        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <Trash className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                {employees.length > 0 ? (
                  <>
                    <p>This location has the following employees:</p>
                    <ul className="mt-2 list-disc list-inside text-sm text-red-600">
                      {employees.map((emp) => (
                        <li key={emp.id}>{emp.name}</li>
                      ))}
                    </ul>
                    <p className="mt-2">
                      Deleting this location will affect these employees.
                    </p>
                  </>
                ) : (
                  'This action cannot be undone. This will permanently delete the location.'
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(location.id)}
                className="bg-red-600 hover:bg-red-700"
                disabled={employees.length > 0}>
                {employees.length > 0 ? 'Cannot Delete' : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
