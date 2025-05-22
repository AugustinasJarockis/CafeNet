import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { EditAccountForm } from '@/components/manage account/edit-account-form';
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { UserRole } from "@/types/user/UserRoles";
import { AppSidebar } from "@/components/admin-sidebar";

export default function EditAccountPage() {
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !user) return <div>Could not load user data.</div>;

    return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
        <div className="flex justify-center mt-10">
        <EditAccountForm user={user} role={user.role as UserRole} onSuccess={() => window.location.href = '/account'} />
        </div>
        </SidebarInset>
    </SidebarProvider>
    );
}