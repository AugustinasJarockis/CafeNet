'use client';

import * as React from 'react';
import { Users, Package } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { BaristaLocation } from '@/components/barista-location'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useCurrentUser } from '@/hooks/useCurrentUser';

// This is sample data.
const data = {
  user: {
    name: 'user',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Manage orders',
      url: '#',
      icon: Users,
      isActive: true,
      items: [
        {
          title: 'See the orders list',
          url: '/orders-barista',
        },
      ],
    },
    {
      title: 'Manage items',
      url: '#',
      icon: Package,
      items: [
        {
          title: 'See the item list',
          url: '/items',
        },
      ],
    },
  ],
};

export function BaristaSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user, isLoading, isError } = useCurrentUser();

  const navUser = user
    ? {
        name: user.name,
        email: user.username,
        avatar: '/avatars/shadcn.jpg',
      }
    : {
        name: '',
        email: '',
        avatar: '/avatars/shadcn.jpg',
      };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
          <BaristaLocation />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {isLoading ? (
          <div className="px-4 py-2 text-muted-foreground">Loading...</div>
        ) : isError ? (
          <div className="px-4 py-2 text-red-500">Failed to load user</div>
        ) : (
          <NavUser user={navUser} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

