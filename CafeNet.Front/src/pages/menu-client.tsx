import { ClientSidebar } from '@/components/client-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function ClientMenu() {
  return (
    <SidebarProvider>
      <ClientSidebar />
      <SidebarInset>
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to CafeNet!</h1>
          <p className="text-muted-foreground text-lg">
            Explore our menu, place your order, and enjoy your coffee just like we enjoy making it.
          </p>
          <button
            className="mt-6 px-6 py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 transition-colors"
            onClick={() => window.location.href = '/orders/create'}
          >
            Click here to to order!
          </button>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
