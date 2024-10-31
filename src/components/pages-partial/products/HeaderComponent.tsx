import { TableCols } from '@/lib/types';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';

interface IHeaderCell {
  sortBy: string;
  headerTitle: TableCols;
  param: { displayName: string };
  handleSortBy: (sort: string) => void;
}

export const HeaderCell = ({
  sortBy,
  headerTitle,
  param,
  handleSortBy,
}: IHeaderCell) => {
  return (
    <div
      className="flex items-center justify-start gap-2 cursor-pointer"
      onClick={() => handleSortBy(headerTitle)}
    >
      {param?.displayName}
      {sortBy &&
        sortBy.includes(headerTitle) &&
        (sortBy.startsWith('-') ? <ArrowBigUp /> : <ArrowBigDown />)}
    </div>
  );
};
