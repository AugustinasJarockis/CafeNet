import { AppSidebar } from '@/components/admin-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import TaxTable from '@/components/manage taxes/tax-table';
import { Separator } from '@radix-ui/react-separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useDeleteTax } from '@/hooks/useDeleteTax';
import { useUpdateTax } from '@/hooks/useUpdateTax';
import { useTaxes } from '@/hooks/useTaxes';

export default function TaxListPage() {
  const deleteMutation = useDeleteTax();
  const updateMutation = useUpdateTax();
  const { data: taxes, isLoading, error } = useTaxes();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>Taxes</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/taxes/create">Create</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {isLoading ? (
            <div className="text-muted-foreground">Loading taxes...</div>
          ) : error ? (
            <div className="text-red-600">
              Failed to load taxes. Please try again later.
            </div>
          ) : (
            <TaxTable
              taxes={taxes ?? []}
              onEdit={(taxId, data) => updateMutation.mutate({ taxId, data })}
              onDelete={(taxId) => deleteMutation.mutate(taxId)}
            />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
