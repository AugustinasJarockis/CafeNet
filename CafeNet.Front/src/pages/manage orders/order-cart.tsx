'use client';

import { useState } from 'react';
import { usePayment } from '@/context/payment-context';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import ClientItemTable from '@/components/manage menu items/client-menu-item-table';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ClientSidebar } from '@/components/client-sidebar';

export default function CartPage() {
  const { state } = usePayment();
  const orderItems = state.orderItems;

  const [page, setPage] = useState(1);
  const pageSize = 8;

  const paginatedItems = orderItems.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(orderItems.length / pageSize));

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
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

        {orderItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ClientItemTable menuItems={paginatedItems} onAddToOrder={() => {}} />

            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>

                  {renderPageNumbers()}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                      className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </div>
    </SidebarProvider>
  );
}
