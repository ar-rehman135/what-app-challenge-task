'use client';

import React, { useEffect, useState, useRef } from 'react';
import useWindowSize from '@/hooks/use-window-size';
import { useLazySelectedProductsQuery } from '@/store/features/auth/authApi';
import { IProductsResponse, TableCols } from '@/lib/types';
import SelectionTable from './table';
import { useAppSelector } from '@/store/hooks';
import { getAuthDataSelector } from '@/store/selectors';

export default function PartialSelectedPage() {
  // States
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<string>('20');
  const [products, setProducts] = useState<IProductsResponse>(
    {} as IProductsResponse
  );

  // Lazy query for fetching products
  const [fetchProducts, { data: productsData, isFetching: productsLoading }] =
    useLazySelectedProductsQuery();
  const { isMobile } = useWindowSize();

  // Update localStorage and refetch products on query changes
  useEffect(() => {
    const queryArgs = {
      page,
      page_size: pageSize,
    };

    fetchProducts(queryArgs);
  }, [page, pageSize]);

  // Update products when data changes
  useEffect(() => {
    if (productsData) setProducts(productsData);
  }, [productsData]);

  return (
    <div className="flex flex-col self-stretch w-full gap-y-4 bg-foreground rounded-2xl border border-border">
      <div className="grid grid-cols-12 w-full gap-4">
        <div className="col-span-12 h-[660px] md:h-[600px]">
          <SelectionTable
            enablePagination
            customHeight={isMobile ? 590 : 600}
            products={products?.results || []}
            loading={productsLoading}
            page={page}
            setPage={setPage}
            totalRows={products?.count}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
      </div>
    </div>
  );
}
