import { Seeker } from './_seeker';
import { Group, Text, Button } from '@mantine/core';

export function LackOfVacancies() {
  return (
    <Group style={{ flexDirection: 'column' }} mt="10.4%">
      <Seeker />
      <Text ff="InterBold" fw={700} fz={24} c="#343A40;" lh="24px" mb="1.2rem" mt="1.2rem">
        Упс, здесь еще ничего нет!
      </Text>
      <Button
        component="a"
        href="/"
        variant="light"
        styles={{
          root: { borderRadius: '8px', background: '#DEECFF', padding: '0px 23px', height: '43px' },
          inner: {
            fontSize: '14px',
            fontFamily: 'OpenSans',
            fontWeight: 600,
            lineHeight: '155%',
            letterSpacing: '0.3px',
          },
        }}
      >
        Поиск Вакансий
      </Button>
    </Group>
  );
}
