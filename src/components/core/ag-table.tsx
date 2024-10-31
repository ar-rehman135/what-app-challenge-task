'use client';
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';
import { ColDef, ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import '@/styles/ag-styles.css';

import PaginationControls from '../common/Pagination';
import { Separator } from './seperator';

// Register the required modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface AgGridTableProps extends AgGridReactProps {
  columns: ColDef[];
  rowData: any[];
  totalRows?: number;
  pageSize?: string;
  setPageSize?: (size: string) => void;
  currentPage: number;
  setCurrentPage?: (page: number) => void;
  enablePagination?: boolean;
  onPageChange?: (page: number) => void;
  customHeight?: number;
  pageClassName?: string;
  isLoading?: boolean;
}

const AgGridTable: React.FC<AgGridTableProps> = ({
  columns,
  rowData,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  totalRows,
  enablePagination = true,
  onPageChange,
  customHeight,
  pageClassName,
  isLoading = false,
  ...props
}) => {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [gridHeight, setGridHeight] = useState<string>('100%'); // Default height
  const [showPagination, setShowPagination] = useState<boolean>(false);
  const gridRef = useRef<AgGridReact>(null);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: false,
      resizable: false,
      flex: 1,
      unSortIcon: true,
    }),
    []
  );

  useEffect(() => {
    const resizeListener = () => {
      if (gridContainerRef.current && typeof window !== 'undefined') {
        setGridHeight(`${gridContainerRef.current.clientHeight}px`);
      }
    };

    // Check if window is defined before adding event listener
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resizeListener);
      resizeListener(); // Initial call to set height

      return () => {
        window.removeEventListener('resize', resizeListener);
      };
    }
  }, []);

  const handleGridReady = () => {
    // Optionally, perform actions when the grid is ready
    if (enablePagination) setShowPagination(true);
  };

  const handlePage = (page: number) => {
    if (setCurrentPage) {
      setCurrentPage(page);
    }
    if (onPageChange) {
      onPageChange(page);
    }
  };
  return (
    <div className="w-full h-full flex flex-col" ref={gridContainerRef}>
      <div
        className="ag-theme-alpine"
        style={{ height: customHeight ? customHeight : gridHeight }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          pagination={enablePagination}
          paginationPageSize={enablePagination ? Number(pageSize) : undefined}
          suppressPaginationPanel={enablePagination}
          loadingOverlayComponent={true}
          defaultColDef={defaultColDef}
          onGridReady={handleGridReady}
          ref={gridRef}
          {...props}
        />
      </div>
      <Separator />
      <PaginationControls
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={handlePage}
        totalRows={totalRows}
        pageClassName={pageClassName}
      />
    </div>
  );
};

export default AgGridTable;
