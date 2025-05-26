import { usePayment } from '@/context/payment-context';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CartItemRow } from './cart-item-row';

export function CartItemTable() {
  const { state, dispatch } = usePayment();

  const handleRemove = (index: number) =>
    dispatch({ type: 'REMOVE_ORDER_ITEM', index });

  const handleQuantityChange = (index: number, quantity: number) =>
    dispatch({ type: 'UPDATE_ORDER_ITEM_QUANTITY', index, quantity });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Qty</TableHead>
          <TableHead>Item</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Tax</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {state.orderItems.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Your cart is empty.
            </TableCell>
          </TableRow>
        ) : (
          state.orderItems.map((item, idx) => (
            <CartItemRow
              key={idx}
              index={idx}
              orderItem={item}
              onRemove={() => handleRemove(idx)}
              onQuantityChange={(q) => handleQuantityChange(idx, q)}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
}
