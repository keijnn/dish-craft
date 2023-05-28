import { createEvent, createStore, sample } from 'effector';
import { $filterProducts } from '@/widgets/side-bar/model.ts';
import { getDishesFx } from '@/widgets/dishes/model.ts';
import { routes } from '@/shared/routing.ts';

export const checkboxAdded = createEvent<string>();

export const $checkedCheckbox = createStore<{
  groups: string[];
  products: string[];
}>({
  groups: [],
  products: [],
});

sample({
  clock: checkboxAdded,
  source: {
    filterProducts: $filterProducts,
    checkedCheckbox: $checkedCheckbox,
  },
  fn: ({ filterProducts, checkedCheckbox }, title) => {
    if (filterProducts.groups.includes(title)) {
      if (checkedCheckbox.groups.includes(title)) {
        const newGroups = checkedCheckbox.groups.filter(el => el !== title);
        return { ...checkedCheckbox, groups: newGroups };
      }
      return { ...checkedCheckbox, groups: [...checkedCheckbox.groups, title] };
    } else if (checkedCheckbox.products.includes(title)) {
      const newProducts = checkedCheckbox.products.filter(el => el !== title);
      return { ...checkedCheckbox, products: newProducts };
    }
    return {
      ...checkedCheckbox,
      products: [...checkedCheckbox.products, title],
    };
  },
  target: $checkedCheckbox,
});

sample({
  clock: $checkedCheckbox,
  target: getDishesFx,
});

sample({
  clock: routes.home.closed,
  fn: () => {
    return { groups: [], products: [] };
  },
  target: $checkedCheckbox,
});
