import { X } from "lucide-react"
import type { Order } from "@/services/orderService"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {OrderStatus} from "@/services/orderService"
interface OrderDetailCardProps {
  order: Order;
  onClose: () => void;
  userRole: string;
}

export function OrderDetailCard({ order, onClose, userRole }: OrderDetailCardProps) {
  const itemsTotal = order.orderItems.reduce((orderSum, item) => {
    const basePrice = item.menuItem?.price || 0;
    const variationTotal = item.orderItemVariations.reduce((sum, v) => {
      return sum + (v.menuItemVariation?.priceChange || 0);
    }, 0);
    const itemSubtotal = basePrice + variationTotal;

    const taxRate = item.menuItem?.tax?.percent || 0;
    const taxAmount = (itemSubtotal * taxRate) / 100;

    return orderSum + itemSubtotal + taxAmount;
  }, 0);

  const discountAmount = order.discount
    ? order.discount.amount ?? (itemsTotal * (order.discount.percent ?? 0)) / 100
    : 0;

  const finalTotal = itemsTotal - discountAmount;

  return (
    <Card
      className={`w-[450px] max-w-[90vw] max-h-[90vh] overflow-auto ${
        order.status === OrderStatus.TAKEN ? "text-gray-400" : ""
      }`}
    >
      <CardHeader className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
        <CardTitle>Order #{order.id}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {order.orderItems.map((item, index) => {
          const basePrice = item.menuItem?.price || 0;
          const variationTotal = item.orderItemVariations.reduce((sum, v) => {
            return sum + (v.menuItemVariation?.priceChange || 0);
          }, 0);
          const itemSubtotal = basePrice + variationTotal;

          const taxRate = item.menuItem?.tax?.percent || 0;
          const taxAmount = (itemSubtotal * taxRate) / 100;
          const itemTotal = itemSubtotal + taxAmount;

          return (
            <div key={item.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">
                  {item.menuItem?.title ?? `Item #${index + 1}`}
                </h4>
                {item.refunded && (
                  <Badge variant="destructive" className="text-xs">
                    Refunded
                  </Badge>
                )}
              </div>

              <div className="text-sm text-muted-foreground">
                Base Price: €{basePrice.toFixed(2)}
              </div>

              {item.orderItemVariations.length > 0 ? (
                <div className="mt-2">
                  <p className="text-sm font-medium mb-1">Variations:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {item.orderItemVariations.map((variation) => {
                      const v = variation.menuItemVariation;
                      return (
                        <li key={variation.id} className="text-sm flex justify-between">
                          {v ? (
                            <>
                              <span>{v.title}</span>
                              <span
                                className={
                                  v.priceChange > 0 ? "text-green-600" : "text-red-600"
                                }
                              >
                                ({v.priceChange >= 0 ? "+" : "-"}€
                                {Math.abs(v.priceChange).toFixed(2)})
                              </span>
                            </>
                          ) : (
                            `Variation ID: ${variation.menuItemVariationId}`
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                <div className="text-sm italic text-muted-foreground">No variations</div>
              )}

              <div className="text-sm text-muted-foreground">
                Tax: {taxRate.toFixed(2)}% → €{taxAmount.toFixed(2)}
              </div>

              <Separator />

              <div className="mt-2 flex justify-between text-sm">
                <span>Total Price (with tax):</span>
                <span className="font-semibold">€{itemTotal.toFixed(2)}</span>
              </div>
            </div>
          );
        })}

        <Separator className="my-4" />

        <div className="text-sm flex justify-between">
          <span>Subtotal (incl. tax):</span>
          <span>€{itemsTotal.toFixed(2)}</span>
        </div>

        {order.discount && (
          <div className="text-sm flex justify-between text-green-700 font-medium">
            <span>
              Discount{" "}
              {order.discount.code ? `(${order.discount.code})` : ""}
              :
            </span>
            <span>-€{discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="text-md flex justify-between font-bold pt-2 border-t">
          <span>Total:</span>
          <span>€{finalTotal.toFixed(2)}</span>
        </div>
      </CardContent>

      <CardFooter
        className={
          userRole === "BARISTA" ? "flex justify-end" : "flex justify-between"
        }
      >
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </CardFooter>
    </Card>
  );
}
