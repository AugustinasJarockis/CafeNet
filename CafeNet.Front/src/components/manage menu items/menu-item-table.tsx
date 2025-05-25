import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil, Trash } from "lucide-react"
import type { MenuItem } from "@/services/menuItemService"
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
} from "../ui/alert-dialog"
import { MenuItemDetailCard } from "./menu-item-detail-card"
import EditMenuItemPopup from "./edit-item-popup"
import type { CreateMenuItemRequestPopup } from "@/services/menuItemService";

interface MenuItemTableProps {
  menuItems: MenuItem[];
  onEdit: (menuItem: CreateMenuItemRequestPopup) => void;
  onDelete: (menuItemId: number) => void;
  onToggleAvailability: (id: number, available: boolean, version?: string) => void;
  userRole: string;
}

export default function MenuItemTable({
  menuItems,
  onEdit,
  onDelete,
  onToggleAvailability,
  userRole,
}: MenuItemTableProps) {
  const isBarista = userRole === "BARISTA";
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isDetailCardOpen, setIsDetailCardOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

  const handleRowClick = (menuItem: MenuItem, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest("button") || target.closest("input[type='checkbox']")) {
      return;
    }
    setSelectedItem(menuItem);
    setIsDetailCardOpen(true);
  };

  const handleEditClick = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setEditOpen(true);
  };

  const handleCloseCard = () => {
    setIsDetailCardOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Tax</TableHead>
            {!isBarista && <TableHead>Availability</TableHead>}
            {!isBarista && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          
          {menuItems.map((menuItem) => (
            <TableRow
            
              key={menuItem.id}
              className={`cursor-pointer ${isBarista && !menuItem.available ? "opacity-50 text-gray-500" : ""}`}

              onClick={(event) => handleRowClick(menuItem, event)}
            >
              <TableCell>
                <img
                  src={menuItem.imgPath} 
                  alt={menuItem.title}
                  className="w-16 h-16 object-cover rounded"
                />
              </TableCell>
              <TableCell>{menuItem.title}</TableCell>
              <TableCell>{menuItem.price}</TableCell>
              <TableCell>{menuItem.tax.type}</TableCell>

              {!isBarista && (
                <TableCell className="pointer-events-auto">
                  <Checkbox
                    checked={menuItem.available}
                    onCheckedChange={(checked) =>
                      onToggleAvailability(menuItem.id, !!checked, menuItem.version)
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
              )}

              {!isBarista && (
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(menuItem);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the item.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(menuItem.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            )}

            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isDetailCardOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <MenuItemDetailCard
            menuItem={selectedItem}
            onClose={handleCloseCard}
            onEdit={handleEditClick}
            userRole={userRole}
          />
        </div>
      )}

      <EditMenuItemPopup
        open={editOpen}
        onOpenChange={setEditOpen}
        menuItem={selectedMenuItem}
        onSubmit={onEdit}
      />
    </>
  );
}
