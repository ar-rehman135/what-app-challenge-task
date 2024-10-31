import React from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/core/tabs';

interface ProductTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="selections">Selections</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ProductTabs;
