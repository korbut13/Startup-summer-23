import React from 'react';
import { Group, Text, Button, NumberInput } from '@mantine/core';

import { CloseIcon } from './_closeIcon';
import { FilterBranch } from './FilterBranch';
import { UseStyles } from '../../utils/styles';
import { FilterProps } from '../../utils/interfaces';

export const Filters: React.FC<FilterProps> = ({
  catalogBranches,
  branchName,
  onChangeBranch,
  paymentFromValue,
  onChangePaymentFrom,
  paymentToValue,
  onChangePaymentTo,
  sendFilters,
  clearFilters,
}) => {
  const { classes } = UseStyles();
  return (
    <>
      <Group align="flex-start" mb="1.7rem" style={{ justifyContent: 'space-between' }}>
        <Text fz="20px" ff="InterBold" fw={700} lh="20px">
          Фильтры
        </Text>

        <Button
          onClick={clearFilters}
          rightIcon={<CloseIcon />}
          variant="white"
          className={classes.resetFilters}
          styles={{
            rightIcon: { marginLeft: '3px' },
          }}
        >
          Сбросить все
        </Button>
      </Group>
      <FilterBranch
        catalogBranches={catalogBranches}
        value={branchName}
        onChangeBranch={onChangeBranch}
      />
      <NumberInput
        data-elem="salary-from-input"
        ta="start"
        type="number"
        min={0}
        label="Оклад"
        placeholder="От"
        value={paymentFromValue.length === 0 ? '' : +paymentFromValue}
        onChange={onChangePaymentFrom}
        className={classes.numberInput}
        styles={{
          controlUp: { alignItems: 'flex-end' },
          controlDown: { alignItems: 'flex-start' },
        }}
      ></NumberInput>
      <NumberInput
        data-elem="salary-to-input"
        type="number"
        min={+paymentFromValue}
        placeholder="До"
        value={paymentToValue.length === 0 ? '' : +paymentToValue}
        onChange={onChangePaymentTo}
        className={classes.numberInput}
        styles={{
          controlUp: { alignItems: 'flex-end' },
          controlDown: { alignItems: 'flex-start' },
        }}
      ></NumberInput>
      <Button
        data-elem="search-button"
        type="submit"
        className={classes.buttonApply}
        onClick={sendFilters}
      >
        Применить
      </Button>
    </>
  );
};
