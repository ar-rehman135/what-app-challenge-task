'use client';
import React, { memo } from 'react';
import { ColDef } from '@ag-grid-community/core';
import AgGridTable from '@/components/core/ag-table';
import { IProducts } from '@/lib/types';
import { SpinnerIcon } from '@/assets/icons';
import { useSelectProductsMutation } from '@/store/features/auth/authApi';

interface IProductsTable {
  enablePagination?: boolean;
  customHeight?: number;
  products: IProducts[];
  loading: boolean;
  page: number;
  setPage: React.Dispatch<number>;
  pageSize: string;
  setPageSize: React.Dispatch<string>;
  totalRows?: number;
}

const SelectionTable: React.FC<IProductsTable> = ({
  enablePagination = false,
  customHeight,
  products,
  loading,
  page,
  setPage,
  totalRows,
  pageSize,
  setPageSize,
}) => {
  const columns: ColDef[] = [
    {
      headerName: 'Id',
      field: 'id',
      maxWidth: 100,
      width: 100,
      sortable: false,
    },
    {
      headerName: 'Name',
      field: 'name',
      minWidth: 150,
      sortable: false,
    },
    {
      headerName: 'Description',
      field: 'description',
      minWidth: 300,
      sortable: false,
    },
    {
      headerName: 'Price',
      field: 'price',
      minWidth: 150,
      sortable: false,
    },
    {
      headerName: 'Stock',
      field: 'stock',
      minWidth: 150,
      sortable: false,
    },
  ];
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
      onRowClicked={(param) => null}
      loadingCellRenderer={<SpinnerIcon />}
      suppressLoadingOverlay={true}
      getRowId={(params) => params.data.id}
      isLoading={loading}
    />
  );
};

export default memo(SelectionTable);
