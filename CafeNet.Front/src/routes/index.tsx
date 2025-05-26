import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';
import { UserRole } from '../types/user/UserRoles';

import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';
import AccountPage from '@/pages/manage account/account';
import EditAccountPage from '@/pages/manage account/edit-account';
import CreateDiscountPage from '@/pages/manage discounts/create-discount';
import CreateEmployeePage from '@/pages/manage employees/create-employee';
import EmployeeListPage from '@/pages/manage employees/employee-list-page';
import CreateLocationPage from '@/pages/manage locations/create-location';
import LocationListPage from '@/pages/manage locations/location-list-page';
import CreateTaxPage from '@/pages/manage taxes/create-tax';
import TaxListPage from '@/pages/manage taxes/tax-list';
import AdminMenu from '@/pages/menu-admin';
import BaristaMenu from '@/pages/menu-barista';
import ClientMenu from '@/pages/menu-client';
import CreateMenuItemPage from '@/pages/manage menu items/create-menu-item';
import MenuItemListPage from '@/pages/manage menu items/menu-item-list-page';
import CreateOrderPage from '@/pages/manage orders/create-order';
import CartPage from '@/pages/manage orders/order-cart';
import ClientLayout from '@/components/client-layout';
import DiscountsPage from '@/pages/manage discounts/discount-list-page';
import ProtectedRoute from '@/components/protected-route';

const COMMON_ROLES: UserRole[] = ['ADMIN', 'BARISTA', 'CLIENT'];
const ADMIN_ONLY: UserRole[] = ['ADMIN'];
const BARISTA_ONLY: UserRole[] = ['BARISTA'];
const CLIENT_ONLY: UserRole[] = ['CLIENT'];
const EMPLOYEES_ONLY: UserRole[] = ['ADMIN', 'BARISTA'];

const withProtection = (element: ReactElement, roles?: UserRole[]) => (
  <ProtectedRoute allowedRoles={roles}>{element}</ProtectedRoute>
);

export const routeConfig = [
  { path: '/', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },

  { path: '/account', element: withProtection(<AccountPage />, COMMON_ROLES) },
  { path: '/account/edit', element: withProtection(<EditAccountPage />, COMMON_ROLES) },

  { path: '/menu-client', element: withProtection(<ClientMenu />, CLIENT_ONLY) },
  { path: '/menu-barista', element: withProtection(<BaristaMenu />, BARISTA_ONLY) },
  { path: '/menu-admin', element: withProtection(<AdminMenu />, ADMIN_ONLY) },

  { path: '/locations/create', element: withProtection(<CreateLocationPage />, ADMIN_ONLY) },
  { path: '/locations', element: withProtection(<LocationListPage />, ADMIN_ONLY) },

  { path: '/employees/create', element: withProtection(<CreateEmployeePage />, ADMIN_ONLY) },
  { path: '/employees', element: withProtection(<EmployeeListPage />, ADMIN_ONLY) },

  { path: '/taxes/create', element: withProtection(<CreateTaxPage />, ADMIN_ONLY) },
  { path: '/taxes', element: withProtection(<TaxListPage />, ADMIN_ONLY) },

  { path: '/discounts/create', element: withProtection(<CreateDiscountPage />, ADMIN_ONLY) },
  { path: '/discounts', element: withProtection(<DiscountsPage />, ADMIN_ONLY) },

  { path: '/items/create', element: withProtection(<CreateMenuItemPage />, ADMIN_ONLY) },
  { path: '/items', element: withProtection(<MenuItemListPage />, EMPLOYEES_ONLY) },

  {
    path: '/orders',
    element: withProtection(<ClientLayout />, CLIENT_ONLY),
    children: [
      { path: 'create', element: <CreateOrderPage /> },
      { path: 'cart', element: <CartPage /> },
      { index: true, element: <Navigate to="create" replace /> },
    ],
  },
];
