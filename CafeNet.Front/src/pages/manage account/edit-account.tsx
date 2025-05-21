import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { EditAccountForm } from '@/components/manage account/edit-account-form';
import { useState, useEffect } from 'react';
import { User } from '@/services/employeeService';

export default function EditAccountPage() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
    setUser({
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        password: '',
        role: 'CUSTOMER',
        locationId: 2,
        locationAddress: '123 Main St',
    });
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
        <div className="flex justify-center mt-10">
        <EditAccountForm user={user} role={user.role as string} onSuccess={() => window.location.href = '/account'} />
        </div>
        </SidebarInset>
    </SidebarProvider>
    );
}