// StripeDialog.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export const StripeDialog = ({ paymentId, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCardPayment = async () => {
    if (!stripe || !elements || !paymentId) return;
    setProcessing(true);
    setErrorMessage("");

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setProcessing(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(paymentId, {
      payment_method: { card: cardElement },
    });

    setProcessing(false);

    if (error) {
      setErrorMessage(error.message || "An unknown error occurred.");
    } else if (paymentIntent?.status === "succeeded") {
      onPaymentSuccess?.(paymentIntent);
    }
  };

  return (
    <div className="space-y-4">
      <label>Card Details</label>
      <CardElement />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <Button onClick={handleCardPayment} disabled={processing || !stripe || !elements}>
        {processing ? "Processing..." : "Confirm Payment"}
      </Button>
    </div>
  );
};
