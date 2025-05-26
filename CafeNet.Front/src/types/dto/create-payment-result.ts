export type CreatePaymentResult = {
  isSuccess: boolean;
  errorMessage?: string;
  paymentId?: number;
  orderId?: number;
};
