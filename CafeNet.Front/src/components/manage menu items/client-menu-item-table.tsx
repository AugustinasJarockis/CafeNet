import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { MenuItem, MenuItemVariation } from "@/services/menuItemService"
import { ClientMenuItemDetailCard } from "./client-menu-item-detail-card";

interface ClientItemTableProps {
  menuItems: MenuItem[];
  onAddToOrder: (menuItem: MenuItem, variations: MenuItemVariation[]) => void;
}

export default function ClientItemTable({
  menuItems, onAddToOrder
}: ClientItemTableProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isDetailCardOpen, setIsDetailCardOpen] = useState(false);

  const handleRowClick = (menuItem: MenuItem, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest("button") || target.closest("input[type='checkbox']")) {
      return;
    }
    setSelectedItem(menuItem);
    setIsDetailCardOpen(true);
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
            <TableHead></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Tax</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems.map((menuItem) => (
            menuItem.available ?
            <TableRow
              key={menuItem.id}
              className={`cursor-pointer ${!menuItem.available ? "opacity-50 text-gray-500" : ""}`}

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
              <TableCell>{menuItem.tax.type} ({menuItem.tax.percent}%)</TableCell>
            </TableRow>
            : <></>
          ))}
        </TableBody>
      </Table>

      {isDetailCardOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <ClientMenuItemDetailCard 
            menuItem={selectedItem} 
            onClose={handleCloseCard} 
            onAddToOrder={(variations) => onAddToOrder(selectedItem, variations)}
            />
        </div>
      )}
    </>
  );
}
