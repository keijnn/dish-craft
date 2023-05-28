import { createEffect, createStore, restore, sample } from 'effector';

export const getProductsFx = createEffect(
  async (): Promise<{ _id: string; title: string; group: string }[]> => {
    const url = 'http://127.0.0.1:3000/products';

    const req = await fetch(url, {
      method: 'GET',
    });
    if (!req.ok) throw req;

    return req.json();
  },
);

export const $products = restore(getProductsFx.doneData, []);

export const $filterProducts = createStore<{
  groups: string[];
  products: string[];
}>({
  groups: [],
  products: [],
});

export const $loading = createStore(true);

sample({
  clock: $products,
  fn: products => {
    const productsArray: string[] = [];
    const groupsArray: string[] = [];
    products.forEach(product => {
      groupsArray.push(product.group);
      productsArray.push(product.title);
    });
    return {
      products: [...new Set(productsArray)],
      groups: [...new Set(groupsArray)],
    };
  },
  target: $filterProducts,
});

sample({
  clock: $filterProducts,
  filter: state => Boolean(state),
  fn: () => false,
  target: $loading,
});
