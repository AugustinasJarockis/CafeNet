import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayment } from '@/context/payment-context';
import { useMenuItemsFromOrder } from '@/hooks/useMenuItemsFromOrder';
import { useDiscountByCode } from '@/hooks/useDiscountByCode';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useCreatePayment } from '@/hooks/useCreatePayment';
import type { CreatePaymentRequest } from '@/types/dto/create-payment-request';
import { PaymentMethod } from '@/types/enum/payment-method';

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function CartSummaryCard() {
  const navigate = useNavigate();
  const { state, dispatch } = usePayment();

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useCurrentUser();

  const createPaymentMutation = useCreatePayment();

  const [coupon, setCoupon] = useState('');
  const [appliedCode, setAppliedCode] = useState<string | null>(null);

  const itemIds = state.orderItems.map((o) => o.menuItemId);
  const { dataMap: menuItems, isLoading: itemsLoading } =
    useMenuItemsFromOrder(itemIds);

  const {
    data: discount,
    isLoading: discountLoading,
    isError: discountError,
    error: discountErrorObj,
  } = useDiscountByCode(appliedCode || '', { enabled: !!appliedCode });

  const subtotal = useMemo(() => {
    if (itemsLoading) return 0;
    return state.orderItems.reduce((sum, o) => {
      const mi = menuItems[o.menuItemId];
      if (!mi) return sum;
      const varPrice = mi.menuItemVariations
        .filter((v) => o.menuItemVariationIds.includes(v.id))
        .reduce((s, v) => s + v.priceChange, 0);
      const line = (mi.price + varPrice) * o.quantity;
      const taxAmt = Math.round((line * mi.tax.percent / 100) * 100) / 100;
      const itemTotal = Math.round((line + taxAmt) * 100) / 100;
      return sum + itemTotal;
    }, 0);
  }, [state.orderItems, menuItems, itemsLoading]);

  const finalTotal = useMemo(() => {
    if (!discount) return subtotal;
    if (discount.percent != null) {
      return subtotal * (1 - discount.percent / 100);
    } else if (discount.amount != null) {
      return Math.max(subtotal - discount.amount, 0);
    }
    return subtotal;
  }, [subtotal, discount]);

  if (discount && state.discountId !== discount.id) {
    dispatch({ type: 'SET_DISCOUNT_ID', discountId: discount.id });
  }

  const handleApplyCoupon = () => {
    if (!coupon.trim()) return;
    setAppliedCode(coupon.trim());
    dispatch({ type: 'SET_DISCOUNT_ID', discountId: 0 }); // reset until valid returns
  };

  const handleCancel = () => {
    dispatch({ type: 'RESET' });
    navigate('/orders/create');
  };

  const handleProceed = () => {
    if (userLoading || userError || !user) {
      console.error('User not ready');
      return;
    }

    const baseRequest = {
      totalPrice: finalTotal,
      usedCredits: state.usedCredits,
      method: state.method,
      userId: user.id,
      orderItems: state.orderItems,
      locationId: user.locationId,
    };

    const request: CreatePaymentRequest = {
      ...baseRequest,
      ...(state.discountId > 0 && { discountId: state.discountId }),
    } as CreatePaymentRequest; // cast back to full type

    createPaymentMutation.mutate(request, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          dispatch({ type: 'RESET' });
          navigate('/orders/create');
        } else {
          console.error('Payment failed:', res.errorMessage);
        }
      },
    });
  };

  const loading = itemsLoading || discountLoading || userLoading;

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">
          Order Total
        </CardTitle>
        <div className="text-3xl font-bold">
          {loading ? 'Calculating…' : `€${finalTotal.toFixed(2)}`}
        </div>

        {discount && (
          <p className="text-green-600 text-sm mt-1">
            Coupon <strong>{discount.code}</strong> applied:{' '}
            {discount.percent != null
              ? `${discount.percent}% off`
              : `-€${discount.amount?.toFixed(2)}`}
          </p>
        )}
        {appliedCode && discountError && (
          <p className="text-red-500 text-sm mt-1">
            {discountErrorObj?.message || 'Coupon not found'}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label>Have a coupon?</Label>
          <div className="flex mt-1 space-x-2">
            <Input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="ENTER CODE"
            />
            <Button size="sm" onClick={handleApplyCoupon}>
              Apply
            </Button>
          </div>
        </div>

        <div>
          <Label>Payment Method</Label>
          <RadioGroup
            value={state.method}
            onValueChange={(value) =>
              dispatch({
                type: 'SET_METHOD',
                method:
                  value === PaymentMethod.Cash
                    ? PaymentMethod.Cash
                    : PaymentMethod.Card,
              })
            }
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={PaymentMethod.Cash} id="cash" />
              <Label htmlFor="cash">Cash</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={PaymentMethod.Card} id="card" />
              <Label htmlFor="card">Card</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleProceed}>{'Proceed'}</Button>
      </CardFooter>
    </Card>
  );
}
