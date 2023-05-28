import {
  TextInput,
  Paper,
  Group,
  Button,
  Checkbox,
  Anchor,
  Stack,
  createStyles,
} from '@mantine/core';
import { formSubmitted } from '@/pages/auth/model.ts';
import { useState } from 'react';
import { routes } from '@/shared/routing.ts';

const route = routes.auth;

const useStyles = createStyles(() => ({
  but: {
    '&:hover': {
      backgroundColor: '#228be6',
      color: 'white',
    },
  },
  auth: {
    backgroundColor: '#d9dadb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  form: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
    width: '30%',
    border: '0.0625rem solid #b9c1c9',
  },
}));

const Page = () => {
  const { classes } = useStyles();
  const [value, setValue] = useState('');
  return (
    <Paper className={classes.auth} radius="md" p="xl">
      <form
        className={classes.form}
        onSubmit={event => {
          event.preventDefault();
          formSubmitted(value);
        }}
      >
        <Stack>
          <TextInput
            onChange={event => {
              setValue(event.target.value);
            }}
            label="Name"
            required
            placeholder="Your name"
            radius="md"
            size="lg"
            value={value}
          />

          <Checkbox label="I accept terms and conditions" />
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            size="md"
          ></Anchor>
          <Button
            className={classes.but}
            type="submit"
            variant="default"
            radius="lg"
            size="lg"
          >
            Log in
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

export const AuthRoute = {
  view: Page,
  route,
};
