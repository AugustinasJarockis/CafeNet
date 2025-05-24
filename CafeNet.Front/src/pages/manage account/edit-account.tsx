import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { EditAccountForm } from '@/components/manage account/edit-account-form';
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { UserRole } from "@/types/user/UserRoles";

import { AdminSidebar } from "@/components/admin-sidebar";
import { ClientSidebar } from "@/components/client-sidebar";
import { BaristaSidebar } from "@/components/barista-sidebar";
export default function EditAccountPage() {
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
      return <div>Unauthorized</div>;
  }

  return (
    <SidebarProvider>
      <SidebarComponent />
      <SidebarInset>
        <div className="flex justify-center mt-10">
          <EditAccountForm
            user={user}
            role={user.role as UserRole}
            onSuccess={() => window.location.href = '/account'}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
