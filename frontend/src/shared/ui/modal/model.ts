import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from 'effector';

export const modalOpened = createEvent<{
  _id: string;
  title: string;
  img: string;
  recipe: string;
  ingredients: { ingredient: string; proportion: string }[];
  rating: number;
  groups: string[];
  products: string[];
}>();

const updateDishRatingFx = createEffect(
  async ({
    dish,
  }: {
    dish: {
      _id: string;
      title: string;
      img: string;
      recipe: string;
      ingredients: { ingredient: string; proportion: string }[];
      rating: number;
      groups: string[];
      products: string[];
    };
  }): Promise<{
    _id: string;
    title: string;
    img: string;
    recipe: string;
    ingredients: { ingredient: string; proportion: string }[];
    rating: number;
    groups: string[];
    products: string[];
  }> => {
    const url = 'http://127.0.0.1:3000/dishes/create';
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dish),
    });
    if (!req.ok) throw req;

    return req.json();
  },
);

const addDishToHistoryFx = createEffect(
  async ({
    userId,
    dish,
  }: {
    userId: string;
    dish: {
      _id: string;
      title: string;
      img: string;
      recipe: string;
      ingredients: { ingredient: string; proportion: string }[];
      rating: number;
      groups: string[];
      products: string[];
    };
  }): Promise<{
    userId: string;
    dish: {
      _id: string;
      title: string;
      img: string;
      recipe: string;
      ingredients: { ingredient: string; proportion: string }[];
      rating: number;
      groups: string[];
      products: string[];
    };
  }> => {
    const url = 'http://127.0.0.1:3000/history';
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, dish }),
    });
    if (!req.ok) throw req;

    return req.json();
  },
);

export const modalClosed = createEvent();
export const modalConfirmed = createEvent();

export const ratingChosen = createEvent<number>();

export const $modalIsOpened = createStore(false)
  .on(modalOpened, () => true)
  .on(modalClosed, () => false);

export const $rating = restore<number>(ratingChosen, 5);

export const $modalContent = restore<{
  _id: string;
  title: string;
  img: string;
  recipe: string;
  ingredients: { ingredient: string; proportion: string }[];
  rating: number;
  groups: string[];
  products: string[];
}>(modalOpened, {
  _id: '123',
  title: '123',
  img: '123',
  recipe: '123',
  ingredients: [{ ingredient: '123', proportion: '123' }],
  rating: 1,
  groups: [],
  products: [],
});

sample({
  clock: modalConfirmed,
  fn: () => false,
  target: $modalIsOpened,
});

sample({
  clock: modalConfirmed,
  filter: () => localStorage.getItem('user') !== null,
  source: { rating: $rating, dish: $modalContent },
  fn: ({ rating, dish }) => {
    return { userId: localStorage.getItem('user'), dish: { ...dish, rating } };
  },
  target: [updateDishRatingFx, addDishToHistoryFx],
});
