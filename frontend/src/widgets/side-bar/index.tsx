import { Filter } from '@/features/filter';
import {
  $filterProducts,
  $loading,
  getProductsFx,
} from '@/widgets/side-bar/model.ts';
import { useUnit } from 'effector-react/compat';
import { Loader, ScrollArea } from '@mantine/core';
import { useEffect } from 'react';

export const SideBar = () => {
  const filterProducts = useUnit($filterProducts);
  const loading = useUnit($loading);

  useEffect(() => {
    getProductsFx();
  }, []);

  if (loading) {
    return (
      <div className="flex w-1/6 h-full justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <ScrollArea className="w-1/6 min-w-1/6 h-full">
      <div className="w-full min-w-full max-h-full">
        <div className="flex items-center flex-col">
          <h1 className="font-bold">Категорії</h1>
          <Filter labels={filterProducts.groups} />
        </div>
        <div className="flex pt-10 items-center flex-col">
          <h1 className="font-bold">Продукти</h1>
          <Filter labels={filterProducts.products} />
        </div>
      </div>
    </ScrollArea>
  );
};
