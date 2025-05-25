import { Trash, X } from "lucide-react"
import type { MenuItem, MenuItemVariation } from "@/services/menuItemService"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { SelectMenuItemVariationForm } from "./select-menu-item-variation-form"

interface ClientMenuItemDetailCardProps {
  menuItem: MenuItem
  onClose: () => void
  onAddToOrder: (variations: MenuItemVariation[]) => void
}

export function ClientMenuItemDetailCard({ 
    menuItem, onClose, onAddToOrder
}: ClientMenuItemDetailCardProps) {
  const [selectedVariations, setSelectedVariations] = useState<MenuItemVariation[]>([]);

  const handleVariationSubmit = (variation: MenuItemVariation) => {
    setSelectedVariations(selectedVariations => [...selectedVariations, variation]);
  };

  const getTotalVariationPrice = () => {
    return selectedVariations.reduce((sum, variation) => sum + variation.priceChange, 0);
  }

  const removeVariation = (variationId: number) => {
    setSelectedVariations(selectedVariations.filter(variation => variation.id !== variationId));
  }

  return (
    <Card
      className={`w-[450px] max-w-[90vw] max-h-[90vh] overflow-auto`}
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
        <div className="flex justify-center mb-4">
          <img
            src={menuItem.imgPath}
            alt={menuItem.title}
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>
        <CardTitle>{menuItem.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Price</p>
            <p className="text-lg font-semibold">€{menuItem.price}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Tax</p>
            <p className="text-lg font-semibold">{menuItem.tax.type} ({menuItem.tax.percent}%)</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Tax amount</p>
            <p className="text-lg font-semibold">
                €{((menuItem.price + getTotalVariationPrice()) * (menuItem.tax.percent / 100.0)).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total</p>
            <p className="text-lg font-semibold">
                €{((menuItem.price + getTotalVariationPrice()) * (1.0 + (menuItem.tax.percent / 100.0))).toFixed(2)}
            </p>
          </div>
        </div>

          <div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                <p className="text-sm font-medium text-muted-foreground mb-2">Variations</p>
                <SelectMenuItemVariationForm 
                    handleSubmit={handleVariationSubmit}
                    menuItemVariations={
                        menuItem.menuItemVariations.filter(
                            item => !selectedVariations.map(variation => variation.id).includes(item.id)
                        )
                    }
                    />
            </div>
            {selectedVariations && selectedVariations.length > 0 && (
            <div className="grid gap-2">
              {selectedVariations.map((variation, index) => (
                <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                  <span className="font-medium">{variation.title}</span>
                  <div>
                    <Badge variant={variation.priceChange >= 0 ? "default" : "destructive"}>
                        {variation.priceChange >= 0 ? "+" : ""}
                        {variation.priceChange.toFixed(2)}
                    </Badge>
                    &nbsp;
                    <Button onClick={() => removeVariation(variation.id)} variant="destructive" size="icon">
                        <Trash className="h-4 w-4" />
                    </Button>      
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        
      </CardContent>
      <CardFooter className={"flex justify-between"}>
        <Button variant="default" onClick={() => onAddToOrder(selectedVariations)}>
            Add to order
        </Button>
        <Button variant="outline" onClick={onClose}>
            Close
        </Button>
      </CardFooter>
      </Card>
  )
}
