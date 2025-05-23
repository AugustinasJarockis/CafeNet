import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../context/authContext';
import { UserRole } from '../types/user/UserRoles';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, token, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!token || !user) return <Navigate to="/" replace />;

  if (!allowedRoles || allowedRoles.includes(user.role)) return <>{children}</>;

  switch (user.role) {
    case 'ADMIN':
      return <Navigate to="/menu-admin" replace />;
    case 'BARISTA':
      return <Navigate to="/menu-barista" replace />;
    case 'CLIENT':
      return <Navigate to="/menu-client" replace />;
    default:
      return <Navigate to="/" replace />;
  }
}
