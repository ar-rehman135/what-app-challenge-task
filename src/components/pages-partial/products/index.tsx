'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import AppLayout from '@/components/layouts/AppLayout';
import ProductsTable from './table';
import { FilterOptions } from './FilterOptions';
import useWindowSize from '@/hooks/use-window-size';
import { useLazyGetProductsQuery } from '@/store/features/auth/authApi';
import { useDebounce } from '@/hooks/use-debounce';
import { IProductsResponse, TableCols } from '@/lib/types';

export default function PartialEmployees() {
  // States
  const [searchedText, setSearchedText] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<string>('20');
  const [sortBy, setSortBy] = useState<string>();
  const [products, setProducts] = useState<IProductsResponse>(
    {} as IProductsResponse
  );

  // Debounced search text
  const debouncedSearchText = useDebounce(searchedText, 500);

  // Initial query args
  const defaultQueryArgs = {
    page: page,
    page_size: pageSize,
    search: debouncedSearchText,
    sort: sortBy,
  };

  // Lazy query for fetching products
  const [fetchProducts, { data: productsData, isFetching: productsLoading }] =
    useLazyGetProductsQuery();
  const { isMobile } = useWindowSize();

  // Ref to track if the effect has run
  const hasLoadedRef = useRef(false);

  // Load initial query args from localStorage or use default
  useEffect(() => {
    if (!hasLoadedRef.current) {
      const storedQuery = localStorage.getItem('query');
      const initialQueryArgs = storedQuery
        ? JSON.parse(storedQuery)
        : defaultQueryArgs;

      // Set initial states from localStorage if available
      setPage(initialQueryArgs.page || 1);
      setPageSize(initialQueryArgs.page_size || '20');
      setSortBy(initialQueryArgs.sort || TableCols.ID);
      setSearchedText(initialQueryArgs.search || '');

      // Fetch products based on loaded or default args
      if (initialQueryArgs.search) {
        fetchProducts(initialQueryArgs);
      } else {
        setProducts({} as IProductsResponse);
      }

      // Mark the effect as run
      hasLoadedRef.current = true;
    }
  }, []);

  // Update localStorage and refetch products on query changes
  useEffect(() => {
    const queryArgs = {
      page,
      page_size: pageSize,
      search: debouncedSearchText,
      sort: sortBy,
    };

    localStorage.setItem('query', JSON.stringify(queryArgs));
    if (queryArgs.search) {
      fetchProducts(queryArgs);
    } else {
      setProducts({} as IProductsResponse);
    }
  }, [page, pageSize, sortBy, debouncedSearchText]);

  // Update products when data changes
  useEffect(() => {
    if (productsData) setProducts(productsData);
  }, [productsData]);

  // Handlers
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(e.target.value);
  };

  const handleSortBy = (sort: string) => {
    setSortBy(sort === sortBy ? '-' + sortBy : sort);
  };

  return (
    <AppLayout title="Products">
      <div className="flex flex-col self-stretch w-full gap-y-4 bg-foreground rounded-2xl border border-border">
        <FilterOptions
          onSearchChange={onSearchChange}
          searchText={searchedText}
        />
        <div className="grid grid-cols-12 w-full gap-4">
          <div className="col-span-12 h-[660px] md:h-[600px]">
            <ProductsTable
              enablePagination
              customHeight={isMobile ? 590 : 600}
              products={products?.results || []}
              loading={productsLoading}
              page={page}
              setPage={setPage}
              totalRows={products?.count}
              pageSize={pageSize}
              setPageSize={setPageSize}
              sortBy={sortBy || ''}
              handleSortBy={handleSortBy}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
