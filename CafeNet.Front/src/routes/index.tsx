import { ReactElement } from 'react';

import { UserRole } from '../types/user/UserRoles';
import LoginPage from '@/pages/login';
import AccountPage from '@/pages/manage account/account';
import EditAccountPage from '@/pages/manage account/edit-account';
import CreateDiscountPage from '@/pages/manage discounts/create-discount';
import CreateEmployeePage from '@/pages/manage employees/create-employee';
import EmployeeListPage from '@/pages/manage employees/employee-list-page';
import CreateLocationPage from '@/pages/manage locations/create-location';
import LocationListPage from '@/pages/manage locations/location-list-page';
import CreateTaxPage from '@/pages/manage taxes/create-tax';
import AdminMenu from '@/pages/menu-admin';
import ClientMenu from '@/pages/menu-client';
import RegisterPage from '@/pages/register';

import BaristaMenu from '@/pages/menu-barista';
import TaxListPage from '@/pages/manage taxes/tax-list';
import DiscountsPage from '@/pages/manage discounts/discount-list-page';
import CreateMenuItemPage from '@/pages/manage menu items/create-menu-item';
import MenuItemListPage from '@/pages/manage menu items/menu-item-list-page';
import CreateOrderPage from '@/pages/manage orders/create-order';

export interface AppRoute {
  path: string;
  element: ReactElement;
  public?: boolean;
  roles?: UserRole[];
}

const COMMON_ROLES: UserRole[] = ['ADMIN', 'BARISTA', 'CLIENT'];
const EMPLOYEES_ONLY: UserRole[] = ['ADMIN', 'BARISTA'];
const ADMIN_ONLY: UserRole[] = ['ADMIN'];
const BARISTA_ONLY: UserRole[] = ['BARISTA'];
const CLIENT_ONLY: UserRole[] = ['CLIENT'];

export const routeConfig: AppRoute[] = [
  { path: '/', element: <LoginPage />, public: true },
  { path: '/register', element: <RegisterPage />, public: true },
  { path: '/account', element: <AccountPage />, roles: COMMON_ROLES },
  { path: '/account/edit', element: <EditAccountPage />, roles: COMMON_ROLES },
  {
    path: '/menu-client',
    element: <ClientMenu />,
    roles: CLIENT_ONLY,
  },
  {
    path: '/menu-barista',
    element: <BaristaMenu />,
    roles: BARISTA_ONLY,
  },
  { path: '/menu-admin', element: <AdminMenu />, roles: ADMIN_ONLY },
  {
    path: '/locations/create',
    element: <CreateLocationPage />,
    roles: ADMIN_ONLY,
  },
  { path: '/locations', element: <LocationListPage />, roles: ADMIN_ONLY },
  {
    path: '/employees/create',
    element: <CreateEmployeePage />,
    roles: ADMIN_ONLY,
  },
  { path: '/employees', element: <EmployeeListPage />, roles: ADMIN_ONLY },
  { path: '/taxes/create', element: <CreateTaxPage />, roles: ADMIN_ONLY },
  { path: '/taxes', element: <TaxListPage />, roles: ADMIN_ONLY },
  {
    path: '/discounts/create',
    element: <CreateDiscountPage />,
    roles: ADMIN_ONLY,
  },
  { path: '/discounts', element: <DiscountsPage />, roles: ADMIN_ONLY },
  {
    path: '/items/create',
    element: <CreateMenuItemPage />,
    roles: ADMIN_ONLY,
  },
  { 
    path: '/items',
    element: <MenuItemListPage />, 
    roles: EMPLOYEES_ONLY 
  },
  { 
    path: '/orders/create',
    element: <CreateOrderPage />, 
    roles: CLIENT_ONLY 
  },
];
