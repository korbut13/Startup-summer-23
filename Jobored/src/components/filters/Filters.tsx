import { Group, Text, Button, NumberInput } from '@mantine/core';
import { CloseIcon } from './_closeIcon';
import FilterBranch from './FilterBranch';
import { BranchParams } from '../../types';
import { useStyles } from '../../utils/styles';

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
  const { classes } = useStyles();
  return (
    <>
      <Group align='flex-start' mb='1.7rem' style={{ justifyContent: 'space-between' }}>
        <Text fz="20px" ff='InterBold' fw={700} lh="20px" >
          Фильтры
        </Text>
        <Button
          onClick={clearFilters}
          rightIcon={<CloseIcon />}
          variant="white"
          className={classes.resetFilters}
          styles={{
            rightIcon: { marginLeft: "3px" }
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
        className={classes.numberInputFrom}
        styles={{
          control: { border: "none", color: "#ACADB9", justifyContent: "flex-start" },
          controlUp: { alignItems: "flex-end" },
          controlDown: { alignItems: "flex-start" }
        }}
      ></NumberInput>
      <NumberInput
        data-elem="salary-to-input"
        type="number"
        min={+paymentFromValue}
        placeholder="До"
        value={paymentToValue.length === 0 ? '' : +paymentToValue}
        onChange={onChangePaymentTo}
        styles={{
          input: { borderRadius: "8px", marginBottom: "20px", height: "42px", fontWeight: 400, fontSize: "14px", lineHeight: "20px", fontFamily: "Inter" },
          control: { border: "none", color: "#ACADB9", justifyContent: "flex-start" },
          controlUp: { alignItems: "flex-end" },
          controlDown: { alignItems: "flex-start" }
        }}
      ></NumberInput>
      <Button
        data-elem="search-button"
        type="submit"
        sx={{ fontFamily: 'Inter', fontWeight: 500, fontSize: "14px", height: "40px", borderRadius: "8px", background: "#5E96FC", width: "100%" }}
        onClick={sendFilters}
      >
        Применить
      </Button>
    </>
  );
}
