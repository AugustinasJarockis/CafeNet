import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';

export function CardPaymentForm({
  clientSecret,
  onSuccess,
}: {
  clientSecret: string;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardError, setCardError] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (stripe && elements) {
      setIsReady(true);
    }
  }, [stripe, elements]);

  if (!isReady) {
    return <p>Loading payment form...</p>;
  }

  const handleConfirmPayment = async () => {
    if (!stripe || !elements || !clientSecret) return;

    setIsProcessing(true);
    setCardError('');

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: 'if_required',
    });

    if (result.error) {
      setCardError(result.error.message || 'Payment failed');
      setIsProcessing(false);
    } else if (result.paymentIntent?.status === 'succeeded') {
      setIsProcessing(false);
      onSuccess();
    } else {
      setCardError('Payment failed or incomplete');
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-4">
      <Label>Card Details</Label>
      <div className="border p-2 rounded-md mt-2">
        <PaymentElement />
      </div>
      {cardError && <p className="text-red-500 text-sm mt-2">{cardError}</p>}
      <Button
        className="mt-4"
        onClick={handleConfirmPayment}
        disabled={isProcessing || !stripe || !elements}
      >
        {isProcessing ? 'Processing…' : 'Confirm Payment'}
      </Button>
    </div>
  );
}
