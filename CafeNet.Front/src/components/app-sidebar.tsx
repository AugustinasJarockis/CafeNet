"use client"

import * as React from "react"
import {
  Command,
  Settings2,
  Users,
  MapPin,
  Package,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "user",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "CafeNet Cafe 1",
      logo: Command,
      plan: "Kalvariju g.",
    },
    {
      name: "CafeNet Cafe 2",
      logo: Command,
      plan: "Didlaukio g.",
    },
  ],
  navMain: [
    {
      title: "Manage employees",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Add employee",
          url: "#",
        },
        {
          title: "See the employee list",
          url: "#",
        },
      ],
    },
    {
      title: "Manage locations",
      url: "#",
      icon: MapPin,
      items: [
        {
          title: "Add a new location",
          url: "#",
        },
        {
          title: "See the locations list",
          url: "#",
        },
      ],
    },
    {
      title: "Manage items",
      url: "#",
      icon: Package,
      items: [
        {
          title: "Add a new item",
          url: "#",
        },
        {
          title: "See the item list",
          url: "#",
        },
        {
          title: "Add tax",
          url: "#",
        },
        {
          title: "See the tax list",
          url: "#",
        },
        {
          title: "Add discount",
          url: "#",
        },
        {
          title: "See the discount list",
          url: "#",
        },
      ],
    },
    {
      title: "Manage account",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "See account information",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
