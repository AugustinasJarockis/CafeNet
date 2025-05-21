import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/welcome';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import AdminMenu from './pages/menu-admin';
import CreateEmployeePage from './pages/manage employees/create-employee';
import CreateLocationPage from './pages/manage locations/create-location';
import EmployeeListPage from './pages/manage employees/employee-list-page';
import AccountPage from './pages/manage account/account';
import EditAccountPage from './pages/manage account/edit-account';
import { AuthProvider, useAuth } from './context/authContext';

function ProtectedRoute({ children, allowedRoles }) {
  const { user, token, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!token) {
    return <Navigate to="/" replace />;
  }
  
  if (!allowedRoles || allowedRoles.includes(user.role)) {
    return children;
  }
  
  if (user.role === 'ADMIN') {
    return <Navigate to="/menu-admin" replace />;
  } else if (user.role === 'BARISTA') {
    return <Navigate to="/welcome" replace />; // add real route later
  } else if (user.role === 'CUSTOMER') {
    return <Navigate to="/welcome" replace />; // add real route later
  } else {
    return <Navigate to="/welcome" replace />;
  }
}

const routeConfig = [
  // Public routes
  { path: "/", element: <LoginPage />, public: true },
  { path: "/register", element: <RegisterPage />, public: true },
  
  // Common protected routes 
  { 
    path: "/welcome", 
    element: <WelcomePage />,
    roles: ['ADMIN', 'BARISTA', 'CUSTOMER']
  },
  { 
    path: "/account", 
    element: <AccountPage />,
    roles: ['ADMIN', 'BARISTA', 'CUSTOMER']
  },
  { 
    path: "/account/edit", 
    element: <EditAccountPage />,
    roles: ['ADMIN', 'BARISTA', 'CUSTOMER']
  },
  
  // Admin-only routes
  { path: "/menu-admin", element: <AdminMenu />, roles: ['ADMIN'] },
  { path: "/locations/create", element: <CreateLocationPage />, roles: ['ADMIN'] },
  { path: "/employees/create", element: <CreateEmployeePage />, roles: ['ADMIN'] },
  { path: "/employees", element: <EmployeeListPage />, roles: ['ADMIN'] }, 
];

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {routeConfig.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={ route.public ? (route.element) : (
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
