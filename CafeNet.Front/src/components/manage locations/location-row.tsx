import { useState } from 'react';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { TableRow, TableCell } from '@/components/ui/table';
import { useEmployeesByLocation } from '@/hooks/useEmployeesByLocation';
import { Location } from '@/services/locationService';

interface LocationRowProps {
  location: Location;
  onEdit: (location: Location) => void;
  onDelete: (locationId: number) => void;
}

export function LocationRow({ location, onEdit, onDelete }: LocationRowProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: employees = [], isLoading } = useEmployeesByLocation(
    dialogOpen ? location.id : undefined
  );

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
              <AlertDialogTitle>
                {isLoading
                  ? 'Checking related employees...'
                  : employees.length > 0
                  ? 'Cannot delete location'
                  : 'Are you absolutely sure?'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {isLoading ? (
                  'Loading employees...'
                ) : employees.length > 0 ? (
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
