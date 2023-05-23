import { Select } from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';
import { BranchParams } from '../../types';
import { UseStyles } from '../../utils/styles';

export default function FilterBranch({
  catalogBranches,
  value,
  onChangeBranch,
}: {
  catalogBranches: BranchParams[];
  value: string;
  onChangeBranch: (value: string) => void;
}) {
  const { classes } = UseStyles();
  return (
    <Select
      data-elem="industry-select"
      value={value}
      onChange={onChangeBranch}
      ta="left"
      label="Отрасль"
      placeholder="Выберите отрасль"
      rightSection={<ChevronDown size="1.5rem" color="#ACADB9" />}
      className={classes.select}
      styles={{
        rightSection: {
          pointerEvents: 'none',
          width: '2.875rem',
        },
        item: {
          whiteSpace: 'initial',
        },
      }}
      data={catalogBranches}
      dropdownPosition="bottom"
    />
  );
}
