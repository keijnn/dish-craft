import {
  createHistoryRouter,
  createRoute,
  createRouterControls,
} from 'atomic-router';
import { sample } from 'effector';
import { createBrowserHistory } from 'history';

import { appStarted } from './init';

export const routes = {
  home: createRoute(),
  auth: createRoute(),
  history: createRoute(),
};

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: [
    {
      path: '/',
      route: routes.home,
    },
    {
      path: '/history',
      route: routes.history,
    },
    {
      path: '/auth',
      route: routes.auth,
    },
  ],
  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
