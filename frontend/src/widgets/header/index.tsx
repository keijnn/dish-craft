import { createStyles, Container, Group, rem, Button } from '@mantine/core';
import { Link } from 'atomic-router-react';
import { Icon } from '@iconify/react';
import { routes } from '@/shared/routing.ts';
import { createEvent, sample } from 'effector';
import { HomeRoute } from '@/pages/home';
import { HistoryRoute } from '@/pages/history';
import { $userHistory } from '@/pages/history/model.ts';

const useStyles = createStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '4rem',
    maxWidth: '100%',
    margin: '0',
  },

  log: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },

  but: {
    '&:hover': {
      backgroundColor: '#228be6',
      color: 'white',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}));

const logOut = createEvent();

sample({
  clock: logOut,
  fn: () => null,
  target: $userHistory,
});

sample({
  clock: logOut,
  target: routes.auth.open,
});

export const Header = () => {
  const links = [
    {
      label: 'Dishes',
      route: HomeRoute.route,
      url: 'http://localhost:5173/',
    },
    {
      label: 'History',
      route: HistoryRoute.route,
      url: 'http://localhost:5173/history',
    },
  ];

  const { classes, cx } = useStyles();
  const currentUrl = window.location.href;

  const items = links.map(link => (
    <Link
      key={link.label}
      className={cx(classes.link, {
        [classes.linkActive]: currentUrl === link.url,
      })}
      to={link.route}
    >
      {link.label}
    </Link>
  ));

  return (
    <Container className={classes.header}>
      <Icon icon="ion:fast-food" color="#228be6" width="28" height="28" />
      <Group spacing={5} className={classes.links}>
        {items}
      </Group>
      <Group className={classes.log}>
        <Button
          className={classes.but}
          variant="default"
          onClick={() => {
            localStorage.clear();
            logOut();
          }}
        >
          Log out
        </Button>
      </Group>
    </Container>
  );
};
