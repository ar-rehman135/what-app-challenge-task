'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import AppLayout from '@/components/layouts/AppLayout';
import ProductsListing from './products-list';
import SelectedPage from './selected-products';
import ProductTabs from './product-tabs';
import { capitalizeFirstLetter } from '@/lib/helpers';

export default function PartialEmployees() {
  // States
  const [activeTab, setActiveTab] = useState<string>('products');
  const [content, setContent] = useState<ReactNode>(<ProductsListing />);
  useEffect(() => {
    switch (activeTab) {
      case 'products':
        setContent(<ProductsListing />);
        break;
      case 'selections':
        setContent(<SelectedPage />);
        break;
      default:
        setContent(<ProductsListing />);
    }
  }, [activeTab]);

  return (
    <AppLayout title={capitalizeFirstLetter(activeTab)}>
      <div className="col-span-6 flex justify-end items-center">
        <ProductTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      {content}
    </AppLayout>
  );
}
