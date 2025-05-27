'use client';

import * as React from 'react';
import { Command, Users, MapPin, Package } from 'lucide-react';

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
import { useCurrentUser } from '@/hooks/useCurrentUser';

const data = {
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
          url: '/items/create',
        },
        {
          title: 'See the item list',
          url: '/items',
        },
        {
          title: 'Add tax',
          url: '/taxes/create',
        },
        {
          title: 'See the tax list',
          url: '/taxes',
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
  ],
};

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    data: locations,
    isLoading: isLocationLoading,
    isError,
  } = useQuery({
    queryKey: ['locations'],
    queryFn: getLocations,
  });
  const { data: user, isLoading, isError: isUserError } = useCurrentUser();

  const mapped_locations =
    locations?.map((loc) => ({
      name: loc.address,
      logo: Command,
      plan: loc.address,
    })) ?? [];

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
        {mapped_locations.length > 0 ? (
          <TeamSwitcher teams={mapped_locations} />
        ) : (
          <div className="px-4 py-2 text-sm text-muted-foreground">
            {isLocationLoading
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
        {isLoading ? (
          <div className="px-4 py-2 text-muted-foreground">Loading...</div>
        ) : isUserError ? (
          <div className="px-4 py-2 text-red-500">Failed to load user</div>
        ) : (
          <NavUser user={navUser} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
