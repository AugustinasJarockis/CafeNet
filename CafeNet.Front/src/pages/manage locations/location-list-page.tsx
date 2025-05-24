import { AppSidebar } from '@/components/admin-sidebar';
import LocationTable from '@/components/manage locations/location-table';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useDeleteLocation } from '@/hooks/useDeleteLocation';
import { useLocations } from '@/hooks/useLocations';
import { Location } from '@/services/locationService';
import { useState } from 'react';
import { useUpdateLocation } from '@/hooks/useUpdateLocation';

export default function LocationsPage() {
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const { data, isLoading, error } = useLocations(page, pageSize);
  const deleteMutation = useDeleteLocation();
  const updateLocationMutation = useUpdateLocation();

  const handleDelete = async (locationId: number) => {
    deleteMutation.mutate(locationId);
  };

  const handleEdit = (updatedLocation: Location) => {
    updateLocationMutation.mutate({
      data: updatedLocation,
    });
  };

  const totalPages = data ? Math.ceil(data.totalCount / pageSize) : 1;

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === page}
            onClick={() => setPage(i)}
            className="cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

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
                  <BreadcrumbPage>Locations</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/locations/create">
                    Create
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="p-6">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error loading locations</p>}

          {data && (
            <>
              <LocationTable
                locations={data.items}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem className="cursor-pointer">
                      <PaginationPrevious
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        className={
                          page === 1 ? 'pointer-events-none opacity-50' : ''
                        }
                      />
                    </PaginationItem>

                    {renderPageNumbers()}

                    <PaginationItem className="cursor-pointer">
                      <PaginationNext
                        onClick={() =>
                          setPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        className={
                          page === totalPages
                            ? 'pointer-events-none opacity-50'
                            : ''
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
