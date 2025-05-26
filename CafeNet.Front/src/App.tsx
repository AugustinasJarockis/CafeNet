import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { routeConfig } from './routes';
import { AuthProvider } from './context/authContext';
import { PaymentProvider } from './context/payment-context';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51RT2a2RJRCnGyl96iv3vwnWI1OswtG0BQlu9zwzx9IGKvv4JXPd2V8VN40N28GZANDTEHjKiVBsKVMCM5I8wl9Sn00a5rFPLX3'
);

function AppRoutes() {
  const routes = useRoutes(routeConfig);
  return routes;
}

function App() {
  return (
    <Router>
      <PaymentProvider>
        <AuthProvider>
          <Elements stripe={stripePromise}>
            <AppRoutes />
          </Elements>
        </AuthProvider>
      </PaymentProvider>
    </Router>
  );
}

export default App;
