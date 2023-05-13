import { Select } from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';
import { BranchParams } from '../../types';

export default function FilterBranch({ catalogBranches, value, onChangeBranch }: {
  catalogBranches: BranchParams[],
  value: string,
  onChangeBranch: (value: string) => void,
}) {
  return (
    <Select
      value={value}
      onChange={onChangeBranch}
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
