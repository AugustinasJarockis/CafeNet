"use client"

import { X } from "lucide-react"
import type { MenuItem } from "@/services/menuItemService"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface MenuItemDetailCardProps {
  menuItem: MenuItem
  onClose: () => void
}

export function MenuItemDetailCard({ menuItem, onClose }: MenuItemDetailCardProps) {
  return (
    <Card className="w-[450px] max-w-[90vw] max-h-[90vh] overflow-auto">
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
            src={menuItem.imgPath || "/placeholder.svg?height=128&width=128"}
            alt={menuItem.title}
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>
        <CardTitle>{menuItem.title}</CardTitle>
        <CardDescription>Item ID: {menuItem.id}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Price</p>
            <p className="text-lg font-semibold">€{menuItem.price}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Tax</p>
            <p className="text-lg font-semibold">{menuItem.tax.type}</p>
          </div>
        </div>

        {menuItem.menuItemVariations && menuItem.menuItemVariations.length > 0 && (
          <div>
            <Separator className="my-2" />
            <p className="text-sm font-medium text-muted-foreground mb-2">Variations</p>
            <div className="grid gap-2">
              {menuItem.menuItemVariations.map((variation, index) => (
                <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                  <span className="font-medium">{variation.title}</span>
                  <Badge variant={variation.priceChange >= 0 ? "default" : "destructive"}>
                    {variation.priceChange >= 0 ? "+" : ""}
                    {variation.priceChange.toFixed(2)}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={() => window.alert("Feature not implemented")}>Edit</Button>
      </CardFooter>
    </Card>
  )
}
