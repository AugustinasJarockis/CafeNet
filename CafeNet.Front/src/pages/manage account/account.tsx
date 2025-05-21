import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useState, useEffect } from 'react';
import { User } from '@/services/employeeService';
import AccountView from '@/components/manage account/account-view';

export default function AccountPage() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

    setUser({
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        password: '',
        role: 'ADMIN',
        locationId: 2,
        locationAddress: '123 Main St',
    });
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
        <AccountView user={user} />
        </SidebarInset>
    </SidebarProvider>
    );
}