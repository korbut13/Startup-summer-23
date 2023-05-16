import React from 'react';
import { Input, Button, Group } from '@mantine/core';
import { Search } from 'tabler-icons-react';

export default function SearchInput({
  value,
  onChange,
  sendFilters,
}: {
  value: string;
  onChange: (event: React.ChangeEvent) => void;
  sendFilters: () => void;
}) {
  return (
    <>
      <Group mb={16}>
        <Input.Wrapper w="80%">
          <Input
            icon={<Search />}
            placeholder="Введите название вакансии"
            radius="md"
            width="100%"
            value={value}
            onChange={onChange}
          />
        </Input.Wrapper>
        <Button onClick={sendFilters}>Поиск</Button>
      </Group>
    </>
  );
}
