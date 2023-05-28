//import modules
import { createRoutesView, RouterProvider } from 'atomic-router-react';

//import pages
import { HomeRoute } from './home';
import { NotFoundPage } from './not-found';
import { AuthRoute } from '@/pages/auth';
import { router } from '@/shared/routing.ts';
import { HistoryRoute } from '@/pages/history';
import { Modal } from '@/shared/ui/modal';

export const Routing = () => {
  const RoutesView = createRoutesView({
    routes: [AuthRoute, HistoryRoute, HomeRoute],
    otherwise: () => <NotFoundPage.Page />,
  });

  return (
    <RouterProvider router={router}>
      <Modal />
      <RoutesView />
    </RouterProvider>
  );
};
