'use client';

import * as React from 'react';
import { Clock, ShoppingCart } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { usePayment } from '@/context/payment-context';
import { useNavigate } from 'react-router-dom';

export function ClientSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { state } = usePayment();
  const cartCount = state.orderItems.length;
  const navigate = useNavigate();

  // Base nav items
  const navItems = [
    {
      title: 'Manage orders',
      url: '#',
      icon: Clock,
      items: [
        {
          title: 'Add a new order',
          url: '/orders/create',
        },
        {
          title: 'Active orders',
          url: '#',
        },
        {
          title: 'Previous orders',
          url: '#',
        },
      ],
    },
  ];

  const user = {
    name: 'John',
    email: 'john@customer.com',
    avatar: '/avatars/shadcn.jpg',
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <div className="mt-4 px-4">
          <button
            onClick={() => navigate('/orders/cart')}
            className="flex w-full items-center justify-between rounded-md px-3 py-2 hover:bg-muted transition"
          >
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
            </div>
            {cartCount > 0 && (
              <Badge className="bg-red-500 text-white px-2 py-0.5 text-xs rounded-full">
                {cartCount}
              </Badge>
            )}
          </button>
        </div>

        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
