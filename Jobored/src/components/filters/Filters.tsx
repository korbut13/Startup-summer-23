import { Group, Title, Button, NumberInput } from '@mantine/core';
import { CloseIcon } from './_closeIcon';
import FilterBranch from './FilterBranch';
import { useForm } from '@mantine/form';
import { InitialInputValues } from '../../types';
import { BranchParams } from '../../types';

export default function Filters({
  sendFilters, catalogBranches
}: {
  sendFilters: (key: number, inpValues: InitialInputValues) => void;
  catalogBranches: BranchParams[];
}) {
  const form = useForm({
    initialValues: {
      title_rus: '',
      payment_from: '',
      payment_to: '',
    },
  });
  return (
    <>
      <Group style={{ justifyContent: 'space-between' }}>
        <Title order={3} fz="lg">
          Фильтры
        </Title>
        <Button color="gray.5" rightIcon={<CloseIcon />} variant="white">
          Сбросить все
        </Button>
      </Group>
      <form
        onSubmit={form.onSubmit((values) => {
          const selectedBranch = catalogBranches.filter(
            (branch) => branch.value === values.title_rus
          );
          const branchKey = selectedBranch.length !== 0 ? selectedBranch[0].catalogues : 0;
          sendFilters(branchKey, {
            payment_from: values.payment_from,
            payment_to: values.payment_to,
          });
        })}
      >
        <FilterBranch catalogBranches={catalogBranches} {...form.getInputProps('title_rus')} />
        <NumberInput
          type="number"
          label="Оклад"
          mb={8}
          placeholder="от"
          {...form.getInputProps('payment_from')}
        ></NumberInput>
        <NumberInput
          type="number"
          mb={20}
          placeholder="до"
          {...form.getInputProps('payment_to')}
        ></NumberInput>
        <Button type="submit" w="100%" bg="#5E96FC" fw={500} sx={{ fontFamily: 'Inter-Regular' }}>
          Применить
        </Button>
      </form>
    </>
  );
}
