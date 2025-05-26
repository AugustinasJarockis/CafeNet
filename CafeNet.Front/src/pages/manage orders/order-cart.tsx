import { CartItemTable } from '@/components/manage menu items/cart-item-table';
import { CartSummaryCard } from '@/components/manage menu items/cart-summary-card';

export default function CartPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1">
          <CartItemTable />
        </div>

        <CartSummaryCard />
      </div>
    </div>
  );
}
