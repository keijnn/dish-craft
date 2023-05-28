import { createStyles, Card, Image, Text, Badge, rem } from '@mantine/core';
import { modalOpened } from '@/shared/ui/modal/model.ts';
import { Icon } from '@iconify/react';

const useStyles = createStyles(theme => ({
  title: {
    fontFamily: `Grey-cliff CF, ${theme.fontFamily}`,
  },

  rating: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    fontFamily: `Grey-cliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

interface DishProps {
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
}

export const Dish = ({ dish }: DishProps) => {
  const { classes } = useStyles();

  return (
    <Card
      withBorder
      padding="lg"
      radius="md"
      className="h-fit mx-5 cursor-pointer"
      onClick={() => modalOpened(dish)}
    >
      <Card.Section mb="sm">
        <Image src={dish.img} alt={dish.title} height={180} />
      </Card.Section>

      {dish.groups.map(group => {
        return <Badge key={group}>{group}</Badge>;
      })}

      <Text fw={700} className={classes.title} mt="xs">
        {dish.title}
      </Text>
      <Text fw={700} className={classes.rating} mt="xs">
        <p className="font-semibold mr-5">Оцiнка:</p>{' '}
        <Icon
          width="20"
          height="20"
          icon="ic:round-star"
          color="#228be6"
          className="mr-1"
        />{' '}
        {dish.rating}
      </Text>
    </Card>
  );
};
