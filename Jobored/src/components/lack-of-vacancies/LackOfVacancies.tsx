import { LetterSpacing } from 'tabler-icons-react';
import { Seeker } from './_seeker';
import { Group, Text, Button } from '@mantine/core';

export function LackOfVacancies() {
  return (
    <Group style={{ flexDirection: 'column' }} mt="3.45rem">
      <Seeker />
      <Text ff="Inter" fw={700} fz={24} c="#343A40;" mb="0.8rem" mt="0.7rem">
        Упс, здесь еще ничего нет!
      </Text>
      <Button component="a" href="/" variant="light"
        styles={{
          root: { borderRadius: "8px", background: "#DEECFF", padding: "0px 23px", height: "43px" },
          inner: { fontSize: "14px", fontFamily: "OpenSans", fontWeight: 600, lineHeight: "155%", letterSpacing: "0.3px" }
        }}>
        Поиск Вакансий
      </Button>
    </Group>
  );
}
