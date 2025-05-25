import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";

import { useTaxes } from "@/hooks/useTaxes";
import { AddMenuItemVariationForm } from "./add-menu-item-variation-form";
import type { MenuItem, CreateMenuItemRequestPopup, MenuItemVariationDTO, CreateMenuItemVariationDTO } from "@/services/menuItemService";


interface EditMenuItemPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menuItem: MenuItem | null;
  onSubmit: (menuItem: CreateMenuItemRequestPopup) => void;
}

export default function EditMenuItemPopup({
  open,
  onOpenChange,
  menuItem,
  onSubmit,
}: EditMenuItemPopupProps) {
  const { data: taxes, isLoading, isError } = useTaxes();

  const [edited, setEdited] = useState<MenuItem | null>(menuItem);
  const [existingVariations, setExistingVariations] = useState<MenuItem["menuItemVariations"]>([]);
  const [newVariations, setNewVariations] = useState<MenuItemVariationDTO[]>([]);

  useEffect(() => {
    if (menuItem) {
      setEdited(menuItem);
      setExistingVariations(menuItem.menuItemVariations || []);
      setNewVariations([]);
    }
  }, [menuItem]);

  const handleVariationSubmit = (variation: CreateMenuItemVariationDTO) => {
  const fullVariation: MenuItemVariationDTO = {
    ...variation,
    id: 0, // temporary ID for new item
    menuItemId: edited?.id ?? 0, // fallback to 0 if edited is null
  };
  setNewVariations((prev) => [...prev, fullVariation]);
};

  const removeVariation = (variation: MenuItemVariationDTO | MenuItem["menuItemVariations"][0]) => {
    if ("id" in variation) {
      setExistingVariations((prev) => prev.filter((v) => v.id !== variation.id));
    } else {
      setNewVariations((prev) => prev.filter((v) => v !== variation));
    }
  };

  const handleSave = () => {
  if (!edited) return;

  const finalMenuItem: CreateMenuItemRequestPopup = {
    ...edited,
    version: edited.version,
    menuItemVariations: [
      ...existingVariations,
      ...newVariations.map((v) => ({
        ...v,
        id: 0, // For new items
        menuItemId: edited.id,
      })),
    ],
    tax: edited.tax ?? {
      id: edited.taxId,
      code: '',
      type: '',
      percent: 0,
    },
  };

  onSubmit(finalMenuItem);
  onOpenChange(false);
};

  if (!edited) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Menu Item</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={edited.title}
              onChange={(e) => setEdited({ ...edited, title: e.target.value })}
              placeholder="Title"
              required
            />
          </div>

          <div>
            <Label>Price</Label>
            <Input
              type="number"
              value={edited.price}
              onChange={(e) => setEdited({ ...edited, price: parseFloat(e.target.value) })}
              placeholder="Price"
              required
            />
          </div>

          <div>
            <Label>Image Path</Label>
            <Input
              value={edited.imgPath || ""}
              onChange={(e) => setEdited({ ...edited, imgPath: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <Label>Tax</Label>
            {isLoading ? (
              <p>Loading taxes...</p>
            ) : isError ? (
              <p className="text-red-500">Failed to load taxes</p>
            ) : (
              <select
                value={edited.taxId.toString()}
                onChange={(e) => setEdited({ ...edited, taxId: parseInt(e.target.value) })}
                className="border p-2 rounded-md w-full"
              >
                <option value="">Select a tax</option>
                {Array.isArray(taxes) &&
                  taxes.map((tax) => (
                    <option key={tax.id} value={tax.id}>
                      {tax.type}: {tax.percent}%
                    </option>
                  ))}
              </select>
            )}
          </div>

          <div className="pt-4">
            <h2 className="text-lg font-semibold mb-2">Variations</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Price Change</TableHead>
                  <TableHead className="text-right">
                    <AddMenuItemVariationForm handleSubmit={handleVariationSubmit} />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...existingVariations, ...newVariations].length > 0 ? (
                  [...existingVariations, ...newVariations].map((variation, i) => (
                    <TableRow key={i}>
                      <TableCell>{variation.title}</TableCell>
                      <TableCell>{variation.priceChange}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeVariation(variation)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No variations added.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
