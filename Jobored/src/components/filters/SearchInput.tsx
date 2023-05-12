import { Input, Button, Group } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { Search } from 'tabler-icons-react';

export default function SearchInput({
  changedSearchInpValue,
}: {
  changedSearchInpValue: (changedSearchInpValue: string) => void;
}) {
  const [searchInputValue, setSearchInputValue] = useInputState('');
  return (
    <>
      <Group mb={16}>
        <Input.Wrapper w="80%">
          <Input
            icon={<Search />}
            placeholder="Введите название вакансии"
            radius="md"
            width="100%"
            value={searchInputValue}
            onChange={setSearchInputValue}
          />
        </Input.Wrapper>
        <Button onClick={() => changedSearchInpValue(searchInputValue)}>Поиск</Button>
      </Group>
    </>
  );
}
