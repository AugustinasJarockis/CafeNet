export interface CreateOrderItemRequest {
  menuItemId: number;
  menuItemVariationIds: number[];
  quantity: number;
}
