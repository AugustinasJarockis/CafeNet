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
import { useMenuItems } from '@/hooks/useMenuItems';
import { useState } from 'react';
import { ClientSidebar } from '@/components/client-sidebar';
import ClientItemTable from '@/components/manage menu items/client-menu-item-table';
import { MenuItem, MenuItemVariation } from '@/services/menuItemService';
import { CreateOrderItemRequest } from '@/types/dto/create-order-request';
import { usePayment } from '@/context/payment-context';

export default function CreateOrderPage() {
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const { data, isLoading, error } = useMenuItems(page, pageSize);
  const { dispatch } = usePayment();

  const totalPages = data && data.totalCount !== 0 ? Math.ceil(data.totalCount / pageSize) : 1;

  const handleAddToOrder = (menuItem: MenuItem, variations: MenuItemVariation[]) => {
    const orderItem: CreateOrderItemRequest = {
      itemId: menuItem.id,
      quantity: 1,
      variationIds: variations.map(v => v.id),
    };

    dispatch({ type: 'ADD_ORDER_ITEM', item: orderItem });
  };

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
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>Orders</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/orders/create">Create</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="p-6">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error loading menu items</p>}

          {data && (
            <>
              <ClientItemTable menuItems={data.items} onAddToOrder={handleAddToOrder} />

              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem className="cursor-pointer">
                      <PaginationPrevious
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    {renderPageNumbers()}
                    <PaginationItem className="cursor-pointer">
                      <PaginationNext
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                        className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
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
