import { BaristaSidebar } from "@/components/barista-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function BaristaMenu() {

  return (
    <SidebarProvider>
      <BaristaSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome, Barista!</h1>
          <p className="text-muted-foreground text-lg">
            Manage orders, view your tasks, and keep the coffee flowing smoothly from this dashboard.
          </p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
