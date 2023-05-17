import { Group, Title, Button, NumberInput } from '@mantine/core';
import { CloseIcon } from './_closeIcon';
import FilterBranch from './FilterBranch';
import { BranchParams } from '../../types';

export default function Filters({
  catalogBranches,
  branchName,
  onChangeBranch,
  paymentFromValue,
  onChangePaymentFrom,
  paymentToValue,
  onChangePaymentTo,
  sendFilters,
  clearFilters,
}: {
  catalogBranches: BranchParams[];
  branchName: string;
  onChangeBranch: (value: string) => void;
  paymentFromValue: string;
  onChangePaymentFrom: (value: number) => void;
  paymentToValue: string;
  onChangePaymentTo: (value: number) => void;
  sendFilters: () => void;
  clearFilters: () => void;
}) {
  return (
    <>
      <Group align='flex-start' mb='1.7rem' style={{ justifyContent: 'space-between' }}>
        <Title order={3} fz="20px" ff='Inter' fw={700} lh="20px">
          Фильтры
        </Title>
        <Button
          onClick={clearFilters}
          color="gray.5"
          rightIcon={<CloseIcon />}
          variant="white"
          styles={{ root: { fontWeight: 500, fontSize: 14, fontFamily: "Inter", lineHeight: "20px", paddingRight: 0, height: "auto" }, rightIcon: { marginLeft: 5 } }}
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
        ta="start"
        type="number"
        label="Оклад"
        placeholder="От"
        value={paymentFromValue.length === 0 ? '' : +paymentFromValue}
        onChange={onChangePaymentFrom}
        styles={{
          label: { fontSize: 16, fontWeight: 700, lineHeight: "19px", fontFamily: "Inter", marginBottom: "8px" },
          input: { borderRadius: "8px", marginBottom: "8px", height: "42px", fontWeight: 400, fontSize: "14px", lineHeight: "20px", fontFamily: "Inter" },
          control: { border: "none", color: "#ACADB9", justifyContent: "flex-start" }
        }}
      ></NumberInput>
      <NumberInput
        type="number"
        placeholder="До"
        value={paymentToValue.length === 0 ? '' : +paymentToValue}
        onChange={onChangePaymentTo}
        styles={{
          input: { borderRadius: "8px", marginBottom: "20px", height: "42px", fontWeight: 400, fontSize: "14px", lineHeight: "20px", fontFamily: "Inter" },
          control: { border: "none", color: "#ACADB9", justifyContent: "flex-start" }
        }}
      ></NumberInput>
      <Button
        type="submit"
        sx={{ fontFamily: 'Inter', fontWeight: 500, fontSize: "14px", height: "40px", borderRadius: "8px", background: "#5E96FC", width: "100%" }}
        onClick={sendFilters}
      >
        Применить
      </Button>
    </>
  );
}
