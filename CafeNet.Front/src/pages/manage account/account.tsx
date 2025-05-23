import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import AccountView from '@/components/manage account/account-view';
import { AppSidebar } from '@/components/admin-sidebar';

export default function AccountPage() {
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !user) return <div>Could not load user data.</div>;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AccountView user={user} />
      </SidebarInset>
    </SidebarProvider>
  );
}
