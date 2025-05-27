import type { Order } from "@/services/orderService";

export function calculateOrderTotal(order: Order): {
  itemsTotal: number;
  discountAmount: number;
  finalTotal: number;
} {
  const itemsTotal = order.orderItems.reduce((orderSum, item) => {
    const basePrice = item.menuItem?.price || 0;
    const variationTotal = item.orderItemVariations.reduce((sum, v) => {
      return sum + (v.menuItemVariation?.priceChange || 0);
    }, 0);
    const itemSubtotal = basePrice + variationTotal;

    const taxRate = item.menuItem?.tax?.percent || 0;
    const taxAmount = Math.round((itemSubtotal * taxRate) / 100 * 100) / 100;

    const itemTotal = Math.round((itemSubtotal + taxAmount) * 100) / 100;

    return orderSum + itemTotal;
  }, 0);

  const discountAmount = order.discount
    ? order.discount.amount ?? (itemsTotal * (order.discount.percent ?? 0)) / 100
    : 0;

  const finalTotal = itemsTotal - discountAmount;

  return {
    itemsTotal,
    discountAmount,
    finalTotal,
  };
}
