import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import AccountView from '@/components/manage account/account-view';

import { AdminSidebar } from '@/components/admin-sidebar';
import { ClientSidebar } from '@/components/client-sidebar';
import { BaristaSidebar } from '@/components/barista-sidebar';

export default function AccountPage() {
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !user) return <div>Could not load user data.</div>;

  let SidebarComponent;
  switch (user.role) {
    case 'ADMIN':
      SidebarComponent = AdminSidebar;
      break;
    case 'BARISTA':
      SidebarComponent = BaristaSidebar;
      break;
    case 'CLIENT':
      SidebarComponent = ClientSidebar;
      break;
    default:
      SidebarComponent = () => <div>Unauthorized</div>;
  }

  return (
    <SidebarProvider>
      <SidebarComponent />
      <SidebarInset>
        <AccountView user={user} />
      </SidebarInset>
    </SidebarProvider>
  );
}
