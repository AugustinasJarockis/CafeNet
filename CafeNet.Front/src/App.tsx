import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/authContext';
import { routeConfig } from './routes';
import ProtectedRoute from './components/protected-route';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51RT2a2RJRCnGyl96iv3vwnWI1OswtG0BQlu9zwzx9IGKvv4JXPd2V8VN40N28GZANDTEHjKiVBsKVMCM5I8wl9Sn00a5rFPLX3");

function App() {
  return (
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <Router>
          <Routes>
            {routeConfig.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.public ? (
                    route.element
                  ) : (
                    <ProtectedRoute allowedRoles={route.roles}>
                      {route.element}
                    </ProtectedRoute>
                  )
                }
              />
            ))}
          </Routes>
        </Router>
      </Elements>
    </AuthProvider>
  );
}


export default App;
