import React from 'react';
import { Select } from '@mantine/core';

import { FilterBranchProps } from '../../utils/interfaces';
import { ChevronDown } from 'tabler-icons-react';
import { UseStyles } from '../../utils/styles';

export const FilterBranch: React.FC<FilterBranchProps> = ({
  catalogBranches,
  value,
  onChangeBranch,
}) => {
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
};
