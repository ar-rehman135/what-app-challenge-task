import React, { memo } from 'react';

import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/core/select';
import PageNumbers from './PageNumbers';
import { cn } from '@/lib/cn';

interface PaginationControlsProps {
  pageSize?: string;
  setPageSize?: (size: string) => void;
  currentPage: number;
  setCurrentPage?: (page: number) => void;
  totalRows?: number;
  pageClassName?: string;
}

const pageOptions = [
  { name: '10' },
  { name: '20' },
  { name: '50' },
  { name: '100' },
];

const PaginationControls: React.FC<PaginationControlsProps> = ({
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  totalRows,
  pageClassName = 'mx-4',
}) => {
  const handlePageSizeChange = (value: string) => {
    if (setPageSize) setPageSize(value);
  };

  return (
    <div className={cn('grid grid-cols-12 mt-3', pageClassName)}>
      <div className="col-span-10 relative flex-wrap  w-full pb-2 sm:pb-12 pt-1 ">
        <PageNumbers
          length={totalRows || 0}
          currentPage={currentPage}
          gotoPage={setCurrentPage}
          pageSize={Number(pageSize)}
        />
      </div>
      <div className="col-span-2 flex justify-end pt-1 ">
        <p className="mr-2 mt-2 text-headingColor font-normal text-sm hidden sm:flex">
          Result Per Page:
        </p>
        <div className="w-15 hidden sm:flex">
          <Select onValueChange={handlePageSizeChange} value={pageSize}>
            <SelectTrigger
              iconColor="fill-border stroke-border ml-3"
              className="border !border-brand h-10 px-2 shadow-none focus:ring-0 focus:ring-ring focus:ring-offset-0 text-sm "
            >
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent>
              {pageOptions.map((option) => (
                <SelectItem key={option.name} value={option.name}>
                  <span>{option.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default memo(PaginationControls);
