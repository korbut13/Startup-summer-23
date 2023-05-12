import React from 'react';
import { Box, Container, Pagination } from '@mantine/core';
import Filters from '../components/filters/Filters';
import SearchInput from '../components/filters/SearchInput';
import { VacancyCards } from '../components/vacanciesCard/VacancyCards';
import { url } from '../url';
import { authorizationData } from '../authorisation';
import { token } from '../requests/token';
import { Vacancy } from '../types';
import { InitialInputValues } from '../types';
import { Branch } from '../types';
import { BranchParams } from '../types';


function createUrlString(
  branchKey: number,
  filterInputsValues: InitialInputValues,
  searchInputValue: string,
  activePage: number,
) {
  let pathUrl = `${url}/2.0/vacancies/?page=${activePage}&count=4&`;
  const vacansyParametrs = {
    catalogues: `${branchKey}`,
    payment_from: `${filterInputsValues.payment_from}`,
    payment_to: `${filterInputsValues.payment_to}`,
    keyword: searchInputValue,
  };
  for (const key in vacansyParametrs) {
    if (
      vacansyParametrs[key as keyof typeof vacansyParametrs] &&
      vacansyParametrs[key as keyof typeof vacansyParametrs] != '0'
    ) {
      pathUrl = pathUrl + `${key}=${vacansyParametrs[key as keyof typeof vacansyParametrs]}&`;
    } else pathUrl;
  }
  return pathUrl.slice(0, -1);
}

export default function JobSearchPage() {
  const initialInputsValues = {
    payment_from: '',
    payment_to: '',
  };
  const [activePage, setactivePage] = React.useState(1);
  const [amountPages, setAmountPages] = React.useState(0);
  const [catalogBranches, setCatalogBranches] = React.useState<BranchParams[]>([]);
  const [branchKey, setBranchKey] = React.useState(0);
  const [filterInputsValues, setInputsValues] = React.useState(initialInputsValues);
  const [catalogVacancies, setCatalogVacancies] = React.useState<Vacancy[]>([]);
  const [searchInputValue, setSearchInputValue] = React.useState('');

  React.useEffect(() => {
    fetch(`${url}/2.0/catalogues/`, {
      method: 'GET',
      headers: {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
      },
    })
      .then((response) => response.json())
      .then((response: Branch[]) => {
        const changedCatalogBranches = response.map((branch) => {
          return {
            label: branch.title_rus,
            value: branch.title_rus,
            catalogues: branch.key,
          };
        });
        setCatalogBranches(changedCatalogBranches)
      })
  }, []);

  React.useEffect(() => {
    fetch(createUrlString(branchKey, filterInputsValues, searchInputValue, activePage), {
      method: 'GET',
      headers: {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        'X-Api-App-Id': `${authorizationData.client_secret}`,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response: { objects: Vacancy[], total: number }) => { setAmountPages(response.total); setCatalogVacancies(response.objects) });

  }, [branchKey, filterInputsValues, searchInputValue, activePage]);

  return (
    <>
      {
        <Container
          size={1116}
          mx="auto"
          py="xl"
          style={{ display: 'flex', justifyContent: 'space-between', gap: 28 }}
        >
          <Box
            sx={(theme) => ({
              backgroundColor: 'white',
              textAlign: 'center',
              padding: theme.spacing.xl,
              borderRadius: theme.radius.md,
              border: '1px solid #EAEBED',
              width: "25%",
              maxHeight: 400,
            })}
          >
            <Filters
              sendFilters={(key: number, inpValues: InitialInputValues) => {
                setBranchKey(key);
                setInputsValues(inpValues);
              }}
              catalogBranches={catalogBranches}
            />
          </Box>
          <Box w="75%">
            <SearchInput
              changedSearchInpValue={(changedSearchInpValue: string) =>
                setSearchInputValue(changedSearchInpValue)
              }
            />
            <VacancyCards vacancies={catalogVacancies} />
            <Pagination total={amountPages} value={activePage} onChange={setactivePage} />
          </Box>
        </Container>
      }
    </>
  );
}
