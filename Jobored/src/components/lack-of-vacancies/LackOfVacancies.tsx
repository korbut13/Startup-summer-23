import { Seeker } from './_seeker';
import { Group, Text, Button } from '@mantine/core';
import { UseStyles } from '../../utils/styles';

export function LackOfVacancies() {
  const { classes } = UseStyles();
  return (
    <Group style={{ flexDirection: 'column' }} mt="10.4%">
      <Seeker />
      <Text className={classes.lackOfVacancies}>Упс, здесь еще ничего нет!</Text>
      <Button component="a" href="/" variant="light" className={classes.buttonToJobSearch}>
        Поиск Вакансий
      </Button>
    </Group>
  );
}
