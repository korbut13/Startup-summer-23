import React from 'react';
import { Input, Button, Group } from '@mantine/core';
import { Search } from 'tabler-icons-react';

export default function SearchInput({
  value,
  onChange,
  sendFilters,
}: {
  value: string;
  onChange: (event: React.ChangeEvent) => void;
  sendFilters: () => void;
}) {
  return (
    <>
      <Group >
        <Input.Wrapper w="100%" style={{ display: "block", position: "relative" }}>
          <Input
            icon={<Search size="1.19rem" />}
            placeholder="Введите название вакансии"
            value={value}
            onChange={onChange}
            styles={{
              input: { borderRadius: "8px", borderColor: "#EAEBED", height: "48px", width: "100%", marginBottom: "19px", fontWeight: 400, fontSize: "14px", lineHeight: "21px", fontFamily: "Inter" },
            }}
          />
          <Button onClick={sendFilters}
            styles={{
              root: { position: "absolute", top: "8px", right: "12px", background: "#5E96FC", borderRadius: "8px", border: "none", padding: "0px 20px", height: "31px" },
              inner: { fontSize: "14px", fontFamily: "Inter", fontWeight: 500 }
            }}>Поиск</Button>
        </Input.Wrapper>

      </Group >
    </>
  );
}
