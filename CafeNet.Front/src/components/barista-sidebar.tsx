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
          url: '#',
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
          url: '#',
        },
      ],
    },
  ],
};

export function BaristaSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
          <BaristaLocation />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

