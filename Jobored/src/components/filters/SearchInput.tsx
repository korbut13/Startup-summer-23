import React from 'react';
import { Input, Button, Group } from '@mantine/core';
import { Search } from 'tabler-icons-react';
import { UseStyles } from '../../utils/styles';

export default function SearchInput({
  value,
  onChange,
  sendFilters,
}: {
  value: string;
  onChange: (event: React.ChangeEvent) => void;
  sendFilters: () => void;
}) {
  const { classes } = UseStyles();
  return (
    <>
      <Group>
        <Input.Wrapper
          w="100%"
          style={{ display: 'block', position: 'relative', marginBottom: '16px' }}
        >
          <Input
            data-elem="search-input"
            icon={<Search size="1.19rem" />}
            placeholder="Введите название вакансии"
            value={value}
            onChange={onChange}
            className={classes.searchInput}
          />
          <Button data-elem="search-button" onClick={sendFilters} className={classes.searchButton}>
            Поиск
          </Button>
        </Input.Wrapper>
      </Group>
    </>
  );
}
