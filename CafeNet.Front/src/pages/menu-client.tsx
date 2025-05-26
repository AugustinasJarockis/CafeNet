import { ClientSidebar } from '@/components/client-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function ClientMenu() {
  return (
    <SidebarProvider>
      <ClientSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col items-center justify-start gap-4 p-4 pt-0">
          <div className="mb-6 w-full max-w-xl text-center">
            <h1 className="text-2xl font-bold">Welcome to CafeNet!</h1>
            <p className="text-muted-foreground mt-2">
              Explore our menu and order your favorite items.
            </p>
            <Separator className="my-4" />
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3 w-full max-w-4xl">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min w-full max-w-4xl" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
