import { AdminSidebar } from '@/components/admin-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function AdminMenu() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome, Admin!</h1>
          <p className="text-muted-foreground text-lg">
            Manage your cafe’s menu, orders, staff, and more from this dashboard.
          </p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
