import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { routeConfig } from './routes';
import { AuthProvider } from './context/authContext';
import { PaymentProvider } from './context/payment-context';

function AppRoutes() {
  const routes = useRoutes(routeConfig);
  return routes;
}


function App() {
  return (
    <Router>
      <PaymentProvider>
        <AuthProvider>
          {/* REMOVE <Elements> here */}
          <AppRoutes />
        </AuthProvider>
      </PaymentProvider>
    </Router>
  );
}


export default App;
