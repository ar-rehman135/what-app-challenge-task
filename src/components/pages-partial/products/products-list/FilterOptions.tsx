import * as React from 'react';

import { IconInput } from '@/components/core/icon-input';

import { Search } from '@/assets/icons';

interface FilterOptionsProps {
  onSearchChange: (val: React.ChangeEvent<HTMLInputElement>) => void;
  searchText: string;
}

export const FilterOptions: React.FC<FilterOptionsProps> = ({
  onSearchChange,
  searchText,
}) => {
  return (
    <div className="w-[98%] mx-auto mt-3">
      <IconInput
        type={'text'}
        icon={Search}
        showIcon
        aria-label={'Search'}
        placeholder="Search"
        label={''}
        onChange={onSearchChange}
        iconClassName="w-6 h-6 mr-0 fill-transparent "
        value={searchText}
      />
    </div>
  );
};
