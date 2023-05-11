import { NumberInput, MantineProvider } from '@mantine/core';

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
                  fontWeight: 700,
                },
              }),
            },
          },
        }}
      >
        <NumberInput type="number" ta="left" mb={8} label="Оклад" placeholder="От" />
        <NumberInput type="number" ta="left" mb={20} placeholder="До" />
      </MantineProvider>
    </>
  );
}
