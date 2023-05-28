import {
  UnstyledButton,
  Checkbox,
  Text,
  createStyles,
  rem,
} from '@mantine/core';
import { checkboxAdded } from '@/features/filter/model.ts';

const useStyles = createStyles(theme => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.lg,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[0],
    },
  },
}));

interface CheckboxCardProps {
  title: string;
  className?: string;
}

export const ProductCheckbox = ({ title, className }: CheckboxCardProps) => {
  const { classes, cx } = useStyles();

  return (
    <UnstyledButton className={cx(classes.button, className)}>
      <Checkbox
        onChange={() => checkboxAdded(title)}
        tabIndex={-1}
        size="md"
        mr="xl"
        styles={{ input: { cursor: 'pointer' } }}
      />
      <div>
        <Text fw={500} mb={7} sx={{ lineHeight: 1 }}>
          {title}
        </Text>
      </div>
    </UnstyledButton>
  );
};
