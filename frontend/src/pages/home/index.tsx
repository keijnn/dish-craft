import { SideBar } from '@/widgets/side-bar';
import { Dishes } from '@/widgets/dishes';
import { routes } from '@/shared/routing.ts';
import { MainLayout } from '@/layouts/MainLayout.tsx';
import { sample } from 'effector';

const route = routes.home;

sample({
  clock: route.opened,
  filter: () => !localStorage.getItem('user'),
  target: routes.auth.open,
});

const Page = () => {
  return (
    <MainLayout>
      <div className="flex pl-2" style={{ height: 'calc(100% - 4rem)' }}>
        <SideBar />
        <div className="w-full h-full flex justify-center">
          <Dishes />
        </div>
      </div>
    </MainLayout>
  );
};

export const HomeRoute = {
  view: Page,
  route,
};
