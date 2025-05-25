import { AdminSidebar } from '@/components/admin-sidebar';
import { BaristaSidebar } from '@/components/barista-sidebar';

import OrderTable from '@/components/manage orders/order-table';
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
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useOrders } from '@/hooks/useOrders';
import { useState } from 'react';

export default function MenuItemListPage() {
  const { data: user, isLoading: userLoading, isError: userError } = useCurrentUser();
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const { data, isLoading, error } = useOrders(page, pageSize, user?.locationId);

  if (userLoading) return <div>Loading user...</div>;
  if (userError || !user) return <div>Failed to load user.</div>;

  const handleDelete = async (menuItemId: number) => {
    
  };



  const handleToggleAvailability = (id: number, available: boolean, version?: string) => {
  if (!version) {
    console.error("Missing version for concurrency control");
    return;
  }

};

  const totalPages = data && data.totalCount !== 0 ? Math.ceil(data.totalCount / pageSize) : 1;
  
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
      {user.role === 'BARISTA' ? (
        <BaristaSidebar />
      ) : user.role === 'ADMIN' ? (
        <AdminSidebar />
      ) : (
        <div>Unsupported role</div>
      )}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>Orders</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="p-6">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error loading menu items</p>}

          {data && (
            <>
              <OrderTable
              orders={data.items}
              onDelete={handleDelete}
              onToggleAvailability={handleToggleAvailability}
              userRole={user.role}
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
