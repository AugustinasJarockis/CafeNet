import { X } from "lucide-react"
import type { Order } from "@/services/orderService"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
  return (
    <Card
      className={`w-[450px] max-w-[90vw] max-h-[90vh] overflow-auto ${order.status === OrderStatus.TAKEN ? "opacity-50 text-gray-500" : ""}`}
    >
      <CardHeader className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
        >
          <X className="h-4 w-4" />
        </Button>
        <CardTitle>Order {order.id}</CardTitle>
        <CardDescription>Do i need the text here?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {order.orderItems.map((item, index) => (
          <div key={item.id} className="border rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Item #{index + 1}</h4>
              {item.refunded && (
                <Badge variant="destructive" className="text-xs">
                  Refunded
                </Badge>
              )}
            </div>

            <div className="text-sm text-muted-foreground">
              Menu Item ID: {item.menuItemId}
            </div>

            <div className="mt-2">
              <p className="text-sm font-medium mb-1">Variations:</p>
              <ul className="list-disc list-inside space-y-1">
                {item.orderItemVariations.map((variation) => (
                  <li key={variation.id} className="text-sm">
                    Variation ID: {variation.menuItemVariationId}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-2 flex justify-between text-sm">
              <span>Price:</span>
              <span className="font-semibold">€--.--</span> {/* Placeholder */}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className={userRole === "BARISTA" ? "flex justify-end" : "flex justify-between"}>
      <Button variant="outline" onClick={onClose}>
        Close
      </Button>
      
    </CardFooter>
      </Card>
  )
}
