import { ChevronRightIcon, ChevronLeftIcon } from '@/assets/icons';
import React, { memo, useCallback } from 'react';

interface ButtonProps {
  content: React.ReactNode;
  onClick: () => void;
  active: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  content,
  onClick,
  active,
  disabled,
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center text-subHeadingColor border border-border ${
        !disabled && 'hover:text-white hover:bg-primary cursor-pointer'
      } rounded-md w-10 h-10 text-sm font-medium
      ${active && 'bg-primary text-white mb-3'}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

interface PaginationNavProps {
  gotoPage: (page: number) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  pageIndex: number;
  pageToken?: string[];
  showNumbers?: boolean;
  length: number;
  currentPage: number;
  pageSize?: number;
}

const PaginationNav: React.FC<PaginationNavProps> = ({
  gotoPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageToken,
  showNumbers = true,
  length,
  currentPage,
  pageSize,
}) => {
  const renderPageLinks = useCallback(() => {
    if (pageCount === 0) return null;
    let outOfRange = false;
    const pageHtml = [];

    for (let i = 1; i <= pageCount; i++) {
      if (i <= 2 || i >= pageCount - 1 || Math.abs(i - pageIndex) <= 2) {
        outOfRange = false;
        pageHtml.push(
          <li key={i} className="hidden w-full sm:flex">
            <Button
              content={i}
              onClick={() => gotoPage(i)}
              active={i === pageIndex}
            />
          </li>
        );
      } else {
        if (!outOfRange) {
          pageHtml.push(
            <span
              key={`ellipsis-${i}`}
              className="items-center w-full border-t-2 border-transparent px-4 text-sm font-medium hidden sm:flex"
            >
              ...
            </span>
          );
        }

        outOfRange = true;
      }
    }

    return pageHtml;
  }, [pageCount, pageIndex, gotoPage]);

  return (
    <ul className="flex gap-2 w-full absolute">
      <li>
        <button
          className={`inline-flex w-full py-2 px-3 rounded-md items-center justify-center  text-sm font-medium text-subHeadingColor border border-border ${
            canPreviousPage
              ? 'hover:bg-primary hover:text-white cursor-pointer'
              : 'text-disabled bg-background'
          } `}
          onClick={() => gotoPage(pageIndex > 0 ? pageIndex - 1 : 1)}
          disabled={!canPreviousPage}
        >
          <ChevronLeftIcon className="mr-1 h-5 w-5 " aria-hidden="true" />
          Previous
        </button>
      </li>
      <div className="flex gap-2 w-auto  ">
        {showNumbers && renderPageLinks()}
      </div>
      <li>
        <button
          className={`inline-flex w-full py-2 px-3 rounded-md items-center justify-center text-sm font-medium text-subHeadingColor border border-border ${
            canNextPage
              ? 'hover:bg-primary hover:text-white cursor-pointer'
              : 'text-disabled bg-background'
          } 
          `}
          onClick={() =>
            gotoPage(pageIndex < pageCount ? pageIndex + 1 : pageIndex)
          }
        >
          Next
          <ChevronRightIcon className={`ml-1 h-5 w-5`} aria-hidden="true" />
        </button>
      </li>
      {pageSize && (
        <li>
          <p className="hidden sm:inline-flex items-center py-2 px-3 text-input">
            Results {(currentPage - 1) * pageSize + 1} -{' '}
            {Math.min(currentPage * pageSize, length)} of {length}
          </p>
        </li>
      )}
    </ul>
  );
};

interface PageNumbersProps {
  gotoPage?: (page: number) => void;
  pageToken?: string[];
  length: number;
  showNumbers?: boolean;
  currentPage: number;
  pageSize?: number;
}

const PageNumbers: React.FC<PageNumbersProps> = ({
  gotoPage,
  pageToken,
  length,
  showNumbers = true,
  currentPage,
  pageSize,
}) => {
  let pageCount = 0;
  if (pageSize && length) {
    pageCount = Math.ceil(length / pageSize);
  }

  const onClickGoTo = (i: number) => {
    if (gotoPage) gotoPage(i);
  };

  return (
    <PaginationNav
      gotoPage={onClickGoTo}
      canPreviousPage={currentPage > 1}
      canNextPage={currentPage < pageCount}
      pageCount={pageCount}
      pageIndex={currentPage}
      pageToken={pageToken}
      showNumbers={showNumbers}
      length={length}
      currentPage={currentPage}
      pageSize={pageSize}
    />
  );
};

export default memo(PageNumbers);
