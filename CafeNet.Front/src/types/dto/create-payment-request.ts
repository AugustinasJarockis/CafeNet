import { PaymentMethod } from "../enum/payment-method";
import { CreateOrderItemRequest } from "./create-order-request";

export interface CreatePaymentRequest {
  totalPrice: number;
  usedCredits: number;
  method: PaymentMethod;
  userId: number;
  locationId: number;
  discountId: number;
  orderItems: CreateOrderItemRequest[];
}
