"use client"

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

interface MenuItemTableProps {
  menuItems: MenuItem[];
  onEdit: (menuItem: MenuItem) => void;
  onDelete: (menuItemId: number) => void;
  onToggleAvailability: (menuItemId: number, available: boolean) => void;
}

export default function MenuItemTable({
  menuItems,
  onEdit,
  onDelete,
  onToggleAvailability,
}: MenuItemTableProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isDetailCardOpen, setIsDetailCardOpen] = useState(false)

  const handleRowClick = (menuItem: MenuItem, event: React.MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.closest("button") || target.closest("input[type='checkbox']")) {
    return;
  }
  setSelectedItem(menuItem);
  setIsDetailCardOpen(true);
};


  const handleCloseCard = () => {
    setIsDetailCardOpen(false)
    setSelectedItem(null)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems.map((menuItem) => (
            <TableRow
              key={menuItem.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={(event) => handleRowClick(menuItem, event)}
            >
              <TableCell>
                <img
                  src={menuItem.imgPath || "/placeholder.svg"}
                  alt={menuItem.title}
                  className="w-16 h-16 object-cover rounded"
                />
              </TableCell>
              <TableCell>{menuItem.title}</TableCell>
              <TableCell>{menuItem.price}</TableCell>
              <TableCell>{menuItem.taxId}</TableCell>
              <TableCell className="pointer-events-auto">
                <Checkbox
                  checked={menuItem.available}
                  onCheckedChange={(checked) => onToggleAvailability(menuItem.id, !!checked)}
                  onClick={(e) => e.stopPropagation()}
                />
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(menuItem)
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon" onClick={(e) => e.stopPropagation()}>
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
                      <AlertDialogAction onClick={() => onDelete(menuItem.id)} className="bg-red-600 hover:bg-red-700">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isDetailCardOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <MenuItemDetailCard menuItem={selectedItem} onClose={handleCloseCard} />
        </div>
      )}
    </>
  )
}
