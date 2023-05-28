import { createEffect, createEvent, sample } from 'effector';
import { restore } from 'effector/compat';
import { routes } from '@/shared/routing.ts';
export const getUserFx = createEffect(
  async (name: string): Promise<{ _id: string; name: string }> => {
    const url = 'http://127.0.0.1:3000/auth';

    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    if (!req.ok) throw req;

    return req.json();
  },
);

export const formSubmitted = createEvent<string>();

sample({
  clock: formSubmitted,
  target: getUserFx,
});

sample({
  clock: getUserFx.doneData,
  fn: user => {
    localStorage.setItem('user', user !== null ? user._id : '');
    return user;
  },
  target: routes.home.open,
});
