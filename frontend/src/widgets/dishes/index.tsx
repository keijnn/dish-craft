import { Grid, Skeleton, Container, ScrollArea } from '@mantine/core';
import { useUnit } from 'effector-react/compat';
import { $dishes, $loading, getDishesFx } from '@/widgets/dishes/model.ts';
import { Dish } from '@/entities/dish';
import { useEffect } from 'react';

const child = (
  <Skeleton
    width={'20rem'}
    height={'15rem'}
    className="m-5"
    radius="md"
    animate={true}
  />
);

export const Dishes = () => {
  const loading = useUnit($loading);
  const dishes = useUnit($dishes);
  const dishesList = dishes.map(dish => {
    return <Dish key={dish._id} dish={dish} />;
  });
  useEffect(() => {
    getDishesFx({ groups: [], products: [] });
  }, []);
  if (loading) {
    return (
      <Container my="md" className="w-full max-w-[80%] overflow-hidden">
        <Grid className="w-full h-full">
          <div>{child}</div>
          <div>{child}</div>
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
    );
  }

  return (
    <ScrollArea className="w-full max-w-[80%] h-full">
      <Container my="md" className="min-w-full h-full">
        <Grid className="w-full h-full">{dishesList}</Grid>
      </Container>
    </ScrollArea>
  );
};
