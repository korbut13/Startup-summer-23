import { Group, Title, Button, NumberInput } from '@mantine/core';
import { CloseIcon } from './_closeIcon';
import FilterBranch from './FilterBranch';
import { BranchParams } from '../../types';

export default function Filters({
  catalogBranches, branchName, onChangeBranch, paymentFromValue, onChangePaymentFrom, paymentToValue, onChangePaymentTo, sendFilters, clearFilters }: {
    catalogBranches: BranchParams[],
    branchName: string,
    onChangeBranch: (value: string) => void,
    paymentFromValue: string,
    onChangePaymentFrom: (value: number) => void,
    paymentToValue: string,
    onChangePaymentTo: (value: number) => void,
    sendFilters: () => void,
    clearFilters: () => void,
  }) {

  return (
    <>
      <Group style={{ justifyContent: 'space-between' }}>
        <Title order={3} fz="lg">
          Фильтры
        </Title>
        <Button onClick={clearFilters} color="gray.5" rightIcon={<CloseIcon />} variant="white">
          Сбросить все
        </Button>
      </Group>
      <FilterBranch
        catalogBranches={catalogBranches}
        value={branchName}
        onChangeBranch={onChangeBranch}
      />
      <NumberInput
        ta="start"
        type="number"
        label="Оклад"
        mb={8}
        placeholder="от"
        value={paymentFromValue.length === 0 ? '' : +paymentFromValue}
        onChange={onChangePaymentFrom}
        styles={{
          label: { fontSize: 16, fontWeight: 700 },
        }}
      ></NumberInput>
      <NumberInput
        type="number"
        mb={20}
        placeholder="до"
        value={paymentToValue.length === 0 ? '' : +paymentToValue}
        onChange={onChangePaymentTo}
      ></NumberInput>
      <Button type="submit" w="100%" bg="#5E96FC" fw={500} sx={{ fontFamily: 'Inter-Regular' }} onClick={sendFilters}>
        Применить
      </Button>
    </>
  );
}
