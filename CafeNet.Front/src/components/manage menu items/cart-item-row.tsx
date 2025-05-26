import { TableRow, TableCell } from '@/components/ui/table';
import { useMenuItem } from '@/hooks/useMenuItem';
import { CreateOrderItemRequest } from '@/types/dto/create-order-request';
import { Button } from '@/components/ui/button';

interface CartItemRowProps {
  orderItem: CreateOrderItemRequest;
  index: number;
  onRemove: () => void;
  onQuantityChange: (newQty: number) => void;
}

export function CartItemRow({
  orderItem,
  onRemove,
  onQuantityChange,
}: CartItemRowProps) {
  const {
    data: menuItem,
    isLoading,
    error,
  } = useMenuItem(orderItem.menuItemId);

  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={6}>Loading item...</TableCell>
      </TableRow>
    );
  }

  if (error || !menuItem) {
    return (
      <TableRow>
        <TableCell colSpan={6}>Failed to load item</TableCell>
      </TableRow>
    );
  }

  const { price: basePrice, title, tax, menuItemVariations } = menuItem;
  const selectedVariations = menuItemVariations.filter((v) =>
    orderItem.variationIds.includes(v.id)
  );
  const variationPrice = selectedVariations.reduce(
    (sum, v) => sum + v.priceChange,
    0
  );

  const unitPrice = basePrice + variationPrice;
  const subtotal = unitPrice * orderItem.quantity;
  const taxAmount = subtotal * (tax.percent / 100);
  const total = subtotal + taxAmount;

  return (
    <TableRow>
      <TableCell className="flex items-center space-x-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => onQuantityChange(orderItem.quantity - 1)}
          disabled={orderItem.quantity <= 1}
        >
          -
        </Button>
        <div className="w-12 text-center border rounded px-2 py-1">
          {orderItem.quantity}
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={() => onQuantityChange(orderItem.quantity + 1)}
        >
          +
        </Button>
      </TableCell>

      <TableCell>{title}</TableCell>
      <TableCell>€{subtotal.toFixed(2)}</TableCell>
      <TableCell>
        {tax.type} ({tax.percent}%)
      </TableCell>
      <TableCell>€{total.toFixed(2)}</TableCell>
      <TableCell>
        <Button variant="destructive" size="sm" onClick={onRemove}>
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
}
