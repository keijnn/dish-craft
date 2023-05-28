import { sample } from 'effector';
import { routes } from '@/shared/routing.ts';
import { MainLayout } from '@/layouts/MainLayout.tsx';
import { Grid, Skeleton, Container, ScrollArea } from '@mantine/core';
import { useUnit } from 'effector-react/compat';
import { Dish } from '@/entities/dish';
import { $userHistory, $loading, getDishesFx } from '@/pages/history/model.ts';
import { useEffect } from 'react';

const route = routes.history;

const child = (
  <Skeleton
    width={'20rem'}
    height={'15rem'}
    className="m-5"
    radius="md"
    animate={true}
  />
);

export const Page = () => {
  const loading = useUnit($loading);
  const userHistory = useUnit($userHistory);
  const dishesList = userHistory?.dishes?.map(dish => {
    return <Dish key={dish._id} dish={dish} />;
  });

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user !== null) {
      getDishesFx(user);
    }
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <Container my="md" className="min-w-full">
          <Grid className="w-full h-full ">
            <div>{child}</div>
            <div>{child}</div>
            <div>{child}</div>
            <div>{child}</div>
            <div>{child}</div>
            <div>{child}</div>
            <div>{child}</div>
            <div>{child}</div>
            <div>{child}</div>
          </Grid>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ScrollArea className="w-full max-w-full">
        <Container my="md" className="min-w-full h-full">
          <Grid className="w-full h-full">{dishesList}</Grid>
        </Container>
      </ScrollArea>
    </MainLayout>
  );
};

sample({
  clock: route.opened,
  filter: () => !localStorage.getItem('user'),
  target: routes.auth.open,
});

export const HistoryRoute = {
  view: Page,
  route,
};
