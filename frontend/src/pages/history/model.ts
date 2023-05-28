import { createStore, restore, sample } from 'effector';
import { createEffect } from 'effector/compat';

export const getDishesFx = createEffect(
  async (
    userId: string,
  ): Promise<{
    _id: string;
    userId: string;
    dishes: {
      _id: string;
      title: string;
      img: string;
      recipe: string;
      ingredients: { ingredient: string; proportion: string }[];
      rating: number;
      groups: string[];
      products: string[];
    }[];
  }> => {
    const url = 'http://127.0.0.1:3000/history/all';

    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    if (!req.ok) throw req;

    return req.json();
  },
);

export const $userHistory = restore(getDishesFx.doneData, null);

export const $loading = createStore(true);

sample({
  clock: $userHistory,
  filter: state => state?.dishes?.length !== 0,
  fn: () => false,
  target: $loading,
});
