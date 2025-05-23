import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/authContext';
import { routeConfig } from './routes';
import ProtectedRoute from './components/protected-route';

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
