export interface CreateOrderItemRequest {
  menuItemId: number;
  variationIds: number[];
  quantity: number;
}
