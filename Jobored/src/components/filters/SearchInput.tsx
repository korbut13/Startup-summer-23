import React from 'react';
import { Input, Button, Group } from '@mantine/core';
import { Search } from 'tabler-icons-react';
import { useStyles } from '../../utils/styles';

export default function SearchInput({
  value,
  onChange,
  sendFilters,
}: {
  value: string;
  onChange: (event: React.ChangeEvent) => void;
  sendFilters: () => void;
}) {
  const { classes } = useStyles();
  return (
    <>
      <Group >
        <Input.Wrapper w="100%" style={{ display: "block", position: "relative" }}>
          <Input
            data-elem="search-input"
            icon={<Search size="1.19rem" />}
            placeholder="Введите название вакансии"
            value={value}
            onChange={onChange}
            styles={{
              input: { borderRadius: "8px", borderColor: "#EAEBED", height: "48px", width: "100%", marginBottom: "17px", fontWeight: 400, fontSize: "14px", lineHeight: "21px", fontFamily: "Inter", },
            }}
          />
          <Button data-elem="search-button" onClick={sendFilters}
            className={classes.searchInput}
          >Поиск</Button>
        </Input.Wrapper>

      </Group >
    </>
  );
}
