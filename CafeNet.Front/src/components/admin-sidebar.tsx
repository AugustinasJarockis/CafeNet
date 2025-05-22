'use client';

import * as React from 'react';
import { Command, Settings2, Users, MapPin, Package } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useQuery } from '@tanstack/react-query';
import { getLocations } from '@/services/locationService';

// This is sample data.
const data = {
  user: {
    name: 'user',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Manage employees',
      url: '#',
      icon: Users,
      isActive: true,
      items: [
        {
          title: 'Add employee',
          url: '/employees/create',
        },
        {
          title: 'See the employee list',
          url: '/employees',
        },
      ],
    },
    {
      title: 'Manage locations',
      url: '#',
      icon: MapPin,
      items: [
        {
          title: 'Add a new location',
          url: '/locations/create',
        },
        {
          title: 'See the locations list',
          url: '/locations',
        },
      ],
    },
    {
      title: 'Manage items',
      url: '#',
      icon: Package,
      items: [
        {
          title: 'Add a new item',
          url: '#',
        },
        {
          title: 'See the item list',
          url: '#',
        },
        {
          title: 'Add tax',
          url: '/taxes/create',
        },
        {
          title: 'See the tax list',
          url: '#',
        },
        {
          title: 'Add discount',
          url: '/discounts/create',
        },
        {
          title: 'See the discount list',
          url: '/discounts',
        },
      ],
    },
    {
      title: 'Manage account',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'See account information',
          url: '#',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    data: locations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['locations'],
    queryFn: getLocations,
  });

  const mapped_locations =
    locations?.map((loc) => ({
      name: loc.address,
      logo: Command,
      plan: loc.address,
    })) ?? [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {mapped_locations.length > 0 ? (
          <TeamSwitcher teams={mapped_locations} />
        ) : (
          <div className="px-4 py-2 text-sm text-muted-foreground">
            {isLoading
              ? 'Loading locations...'
              : isError
                ? 'Failed to load locations'
                : 'No locations found'}
          </div>
        )}
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
