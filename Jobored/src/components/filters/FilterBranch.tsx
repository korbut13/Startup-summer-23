import { Select } from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';
import { BranchParams } from '../../types';

export default function FilterBranch({ catalogBranches, value, onChange }: { catalogBranches: BranchParams[], value: string; onChange: () => void }) {
  return (
    <Select
      value={value}
      onChange={onChange}
      mb={20}
      ta="left"
      label="Отрасль"
      placeholder="Выберите отрасль"
      radius="md"
      rightSection={<ChevronDown size="1.5rem" color="gray" />}
      rightSectionWidth={30}
      styles={{
        rightSection: { pointerEvents: 'none' },
        label: { fontSize: 16, fontWeight: 700 },
      }}
      data={catalogBranches}
    />
  );
}
