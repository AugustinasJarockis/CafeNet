import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil, Trash } from "lucide-react"
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
import type { Order } from "@/services/orderService"
import { OrderStatus, updateOrderStatus, confirmPayment, PaymentStatus} from "@/services/orderService"
import { OrderDetailCard } from "./order-detail-card"

interface OrderTableProps {
  orders: Order[];
  onDelete: (menuItemId: number) => void;
  onToggleAvailability: (id: number, available: boolean, version?: string) => void;
  userRole: string;
  onRefresh: () => void;
}

export default function OrderTable({
  orders,
  onDelete,
  onToggleAvailability,
  userRole,
  onRefresh
}: OrderTableProps) {
  const isBarista = userRole === "BARISTA";
  const [selectedItem, setSelectedItem] = useState<Order | null>(null);
  const [isDetailCardOpen, setIsDetailCardOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleRowClick = (order: Order, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest("button") || target.closest("input[type='checkbox']")) {
      return;
    }
    setSelectedItem(order);
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
            <TableHead>Order</TableHead>
            <TableHead>Item count</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Payment</TableHead> 
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
         <TableBody>
          
          {orders.map((order) => (
            <TableRow
            
              key={order.id}
              className={`cursor-pointer ${isBarista && order.status === OrderStatus.TAKEN ? "opacity-50 text-gray-500" : ""}`}


              onClick={(event) => handleRowClick(order, event)}
            >

              <TableCell>{order.id}</TableCell>
              <TableCell>{order.orderItems.length}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.paymentStatus}</TableCell> 
              <TableCell>{OrderStatus[order.status]}</TableCell>

              <TableCell className="text-right space-x-2">
              {order.paymentStatus === PaymentStatus.PENDING && order.status !== OrderStatus.TAKEN && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="secondary" size="sm" onClick={(e) => e.stopPropagation()}>
                      Confirm payment
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Pay for this order?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will mark Order #{order.id} as paid. Continue?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          try {
                            await confirmPayment(order.id);
                            console.log("Order paid:", order.id);
                            onRefresh();
                          } catch (error) {
                            console.error("Failed to mark payment as paid:", error);
                          }
                        }}
                      >
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              {order.status === OrderStatus.OPEN && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="default" size="sm" onClick={(e) => e.stopPropagation()}>
                      Start order
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Start this order?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to start Order #{order.id}?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          try {
                            await updateOrderStatus(order.id, OrderStatus.IN_PROGRESS, order.version);
                            onRefresh();
                          } catch (err) {
                            console.error("Failed to start order:", err);
                          }
                        }}
                      >
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              {order.status === OrderStatus.IN_PROGRESS && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="default" size="sm" onClick={(e) => e.stopPropagation()}>
                      Mark as done
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Mark this order as done?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to mark Order #{order.id} done?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          try {
                            await updateOrderStatus(order.id, OrderStatus.DONE, order.version);
                            onRefresh();
                          } catch (err) {
                            console.error("Failed to mark order as done:", err);
                          }
                        }}
                      >
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              {order.status === OrderStatus.DONE && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="default" size="sm" onClick={(e) => e.stopPropagation()}>
                      Mark as delivered
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Mark this order as delivered?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to mark Order #{order.id} as delivered?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          try {
                            await updateOrderStatus(order.id, OrderStatus.TAKEN, order.version);
                            onRefresh();
                          } catch (err) {
                            console.error("Failed to mark as delivered:", err);
                          }
                        }}
                      >
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isDetailCardOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <OrderDetailCard
            order={selectedItem}
            onClose={handleCloseCard}
            userRole={userRole}
          />
        </div>
      )}

    </>
  );
}
