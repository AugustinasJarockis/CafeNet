import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ClientSidebar } from '@/components/client-sidebar';
import { Outlet } from 'react-router-dom';

export default function ClientLayout() {
  return (
    <SidebarProvider>
      <ClientSidebar />
      <SidebarInset>
        <main className="p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
