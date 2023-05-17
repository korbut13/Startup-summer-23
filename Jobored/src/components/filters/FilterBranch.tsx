import { Select } from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';
import { BranchParams } from '../../types';

export default function FilterBranch({
  catalogBranches,
  value,
  onChangeBranch,
}: {
  catalogBranches: BranchParams[];
  value: string;
  onChangeBranch: (value: string) => void;
}) {
  return (
    <Select
      value={value}
      onChange={onChangeBranch}
      ta="left"
      label="Отрасль"
      placeholder="Выберите отрасль"
      rightSection={<ChevronDown size="1.2rem" color="#ACADB9" />}
      styles={{
        rightSection: { pointerEvents: 'none', width: "2.875rem", },
        label: { fontSize: 16, fontWeight: 700, lineHeight: "18px", fontFamily: "Inter", marginBottom: "10px" },
        input: { borderRadius: "8px", height: "42px", marginBottom: "17px", fontWeight: 400, fontSize: "14px", lineHeight: "20px", fontFamily: "Inter", },
      }}
      data={catalogBranches}
    />
  );
}
