import { Input, Button, Group } from '@mantine/core';
import { Search } from 'tabler-icons-react';

export default function SearchInput() {
  return (
    <>
      <Group mb={16}>
        <Input.Wrapper w="80%">
          <Input
            icon={<Search />}
            placeholder="Введите название вакансии"
            radius="md"
            width="100%"
          />
        </Input.Wrapper>
        <Button>Поиск</Button>
      </Group>
    </>
  );
}
