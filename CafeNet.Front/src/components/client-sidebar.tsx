'use client';

import * as React from 'react';
import { Clock } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
  user: {
    name: 'John',
    email: 'john@customer.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Manage orders',
      url: '#',
      icon: Clock,
      items: [
        {
          title: 'Add a new order',
          url: '#',
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
  ],
};

export function ClientSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
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
