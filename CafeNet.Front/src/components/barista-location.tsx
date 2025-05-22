
import { Command } from 'lucide-react'
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import { useQuery } from '@tanstack/react-query'
import { getCurrentUserLocation } from '@/services/employeeService'
import type { Location } from '@/services/locationService'

export function BaristaLocation() {
  const { data: location, isLoading, isError } = useQuery<Location>({
    queryKey: ['currentUserLocation'],
    queryFn: getCurrentUserLocation,
  })

  const renderLocationText = () => {
    if (isLoading) return 'Loading location...'
    if (isError) return 'Error loading location'
    return location?.address || 'No location'
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" disabled={isLoading || isError || !location?.address}>
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Command className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{renderLocationText()}</span>
            <span className="truncate text-xs">Current Location</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
