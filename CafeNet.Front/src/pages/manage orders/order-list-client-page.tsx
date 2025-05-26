import { useState } from 'react';

import ClientOrderTable from '@/components/manage orders/order-list-client';
import { useOrdersClient } from '@/hooks/useOrdersClient';
import { useCurrentUser } from '@/hooks/useCurrentUser';

import {
  Breadcrumb,
  BreadcrumbItem,
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
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { ClientSidebar } from '@/components/client-sidebar';

export default function ClientOrderListPage() {
  const { data: user, isLoading: userLoading, isError: userError } = useCurrentUser();
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const {
    data,
    isLoading,
    error,
  } = useOrdersClient(user?.id, page, pageSize);

  if (userLoading) return <div>Loading user...</div>;
  if (userError || !user) return <div>Failed to load user.</div>;
  if (user.role !== 'CLIENT') return <div>Unauthorized access</div>;

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
      <ClientSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height]">
          <div className="flex items-center gap-2 px-4">
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>My Orders</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="p-6">
          {isLoading && <p>Loading orders...</p>}
          {error && <p>Error loading orders.</p>}

          {data && (
            <>
              <ClientOrderTable orders={data.items} />

              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem className="cursor-pointer">
                      <PaginationPrevious
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>

                    {renderPageNumbers()}

                    <PaginationItem className="cursor-pointer">
                      <PaginationNext
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        className={
                          page === totalPages ? 'pointer-events-none opacity-50' : ''
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
