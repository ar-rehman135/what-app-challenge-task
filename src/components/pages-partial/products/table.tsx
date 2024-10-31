'use client';
import React, { memo } from 'react';
import { ColDef } from '@ag-grid-community/core';
import AgGridTable from '@/components/core/ag-table';
import { IProducts, TableCols } from '@/lib/types';
import { SpinnerIcon } from '@/assets/icons';
import { HeaderCell } from './HeaderComponent';
import { useSelectProductsMutation } from '@/store/features/auth/authApi';

interface IProductsTable {
  enablePagination?: boolean;
  customHeight?: number;
  products: IProducts[];
  loading: boolean;
  page: number;
  setPage: React.Dispatch<number>;
  pageSize: string;
  sortBy: string;
  setPageSize: React.Dispatch<string>;
  totalRows?: number;
  handleSortBy: (sort: string) => void;
}

const ProductsTable: React.FC<IProductsTable> = ({
  enablePagination = false,
  customHeight,
  products,
  loading,
  page,
  setPage,
  totalRows,
  pageSize,
  sortBy,
  setPageSize,
  handleSortBy,
}) => {
  const [selectProduct] = useSelectProductsMutation();
  const columns: ColDef[] = [
    {
      headerName: 'Id',
      field: 'id',
      maxWidth: 100,
      width: 100,
      sortable: false,
      headerComponent: (param: { displayName: string }) => {
        return (
          <HeaderCell
            param={param}
            sortBy={sortBy}
            headerTitle={TableCols.ID}
            handleSortBy={handleSortBy}
          />
        );
      },
    },
    {
      headerName: 'Name',
      field: 'name',
      minWidth: 150,
      sortable: false,
      headerComponent: (param: { displayName: string }) => {
        return (
          <HeaderCell
            param={param}
            sortBy={sortBy}
            headerTitle={TableCols.NAME}
            handleSortBy={handleSortBy}
          />
        );
      },
    },
    {
      headerName: 'Description',
      field: 'description',
      minWidth: 300,
      sortable: false,
      headerComponent: (param: { displayName: string }) => {
        return (
          <HeaderCell
            param={param}
            sortBy={sortBy}
            headerTitle={TableCols.DESCRIPTION}
            handleSortBy={handleSortBy}
          />
        );
      },
    },
    {
      headerName: 'Price',
      field: 'price',
      minWidth: 150,
      sortable: false,
      headerComponent: (param: { displayName: string }) => {
        return (
          <HeaderCell
            param={param}
            sortBy={sortBy}
            headerTitle={TableCols.PRICE}
            handleSortBy={handleSortBy}
          />
        );
      },
    },
    {
      headerName: 'Stock',
      field: 'stock',
      minWidth: 150,
      sortable: false,
      headerComponent: (param: { displayName: string }) => {
        return (
          <HeaderCell
            param={param}
            sortBy={sortBy}
            headerTitle={TableCols.STOCK}
            handleSortBy={handleSortBy}
          />
        );
      },
    },
  ];

  const onRowClicked = async (id: string) => {
    try {
      await selectProduct({
        product_ids: [id],
      });
    } catch (error) {}
  };

  return (
    <AgGridTable
      columns={columns}
      rowData={products}
      pageSize={pageSize}
      setPageSize={setPageSize}
      currentPage={page}
      setCurrentPage={setPage}
      totalRows={totalRows}
      enablePagination={enablePagination}
      onPageChange={setPage}
      customHeight={customHeight}
      onRowClicked={(param) => onRowClicked(param.data.id)}
      loadingCellRenderer={<SpinnerIcon />}
      suppressLoadingOverlay={true}
      getRowId={(params) => params.data.id}
      isLoading={loading}
    />
  );
};

export default memo(ProductsTable);
