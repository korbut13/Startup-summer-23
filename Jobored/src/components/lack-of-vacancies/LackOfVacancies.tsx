import { Seeker } from './_seeker';
import { Group, Title, Button } from '@mantine/core';

export function LackOfVacancies() {
  return (
    <Group style={{ flexDirection: 'column' }} mt={120}>
      <Seeker />
      <Title order={1} sx={{ fontFamily: 'Inter-Regular' }} mb={42} mt={32}>
        Упс, здесь еще ничего нет!
      </Title>
      <Button component="a" href="/" variant="light">
        Поиск вакансий
      </Button>
    </Group>
  );
}
