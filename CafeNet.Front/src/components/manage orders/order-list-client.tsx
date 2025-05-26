import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Order } from "@/services/orderService";
import { OrderStatus } from "@/services/orderService";
import { calculateOrderTotal } from "@/lib/orderUtils";
import { OrderDetailCard } from "./order-detail-card";

interface ClientOrderTableProps {
  orders: Order[];
}

export default function ClientOrderTable({ orders }: ClientOrderTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setSelectedOrder(null);
    setIsDetailOpen(false);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              className="cursor-pointer hover:bg-muted"
              onClick={() => handleRowClick(order)}
            >
              <TableCell>{order.location.address ?? "Unknown"}</TableCell>
              <TableCell>
                €{calculateOrderTotal(order).finalTotal.toFixed(2)}
              </TableCell>
              <TableCell>{OrderStatus[order.status]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isDetailOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <OrderDetailCard
            order={selectedOrder}
            onClose={handleCloseDetail}
            userRole="CLIENT"
          />
        </div>
      )}
    </>
  );
}
