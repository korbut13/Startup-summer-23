
import { Select, NumberInput, MantineProvider, Input } from '@mantine/core';
import { ChevronDown } from "tabler-icons-react";

export default function FilterSalary() {
  return (
    <>
      <MantineProvider
        inherit
        theme={{
          components: {
            InputWrapper: {
              styles: () => ({
                label: {
                  fontSize: 16,
                  fontWeight: 700
                },
              }),
            },
          },
        }}
      >
        <NumberInput
          type='number'
          ta="left"
          mb={8}
          label="Оклад"
          placeholder="От"
        />
        <NumberInput
          type='number'
          ta="left"
          mb={20}
          placeholder="До"
        />
      </MantineProvider>
    </>

  );
}
