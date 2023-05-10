import { Select } from '@mantine/core';
import { ChevronDown } from "tabler-icons-react";

export default function FilterBranch() {
  return (
    <Select
      mb={20}
      ta="left"
      label="Отрасль"
      placeholder="Выберите отрасль"
      radius="md"
      rightSection={<ChevronDown size="1.5rem" color='gray' />}
      rightSectionWidth={30}
      styles={{ rightSection: { pointerEvents: 'none' }, label: { fontSize: 16, fontWeight: 700 } }}
      data={['React', 'Angular', 'Svelte', 'Vue']}
    />
  );
}
