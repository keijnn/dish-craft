import { createStore, restore, sample } from 'effector';
import { createEffect } from 'effector/compat';

export const getDishesFx = createEffect(
  async ({
    products,
    groups,
  }: {
    products: string[];
    groups: string[];
  }): Promise<
    {
      _id: string;
      title: string;
      img: string;
      recipe: string;
      ingredients: { ingredient: string; proportion: string }[];
      rating: number;
      groups: string[];
      products: string[];
    }[]
  > => {
    const url = 'http://127.0.0.1:3000/dishes/all';

    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ groups, products }),
    });
    if (!req.ok) throw req;

    return req.json();
  },
);

export const $dishes = restore(getDishesFx.doneData, []);

export const $loading = createStore(true);

sample({
  clock: $dishes,
  filter: state => state.length !== 0,
  fn: () => false,
  target: $loading,
});
