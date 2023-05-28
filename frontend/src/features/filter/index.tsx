import { ProductCheckbox } from '@/entities/product-checkbox';

export const Filter = ({ labels }: { labels: string[] }) => {
  const labelsList = labels?.map(label => {
    return <ProductCheckbox key={label} title={label} />;
  });
  return <div className="w-full min-w-full pt-3">{labelsList}</div>;
};
