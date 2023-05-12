import React from 'react';
import { Box, Container } from '@mantine/core';
import Filters from '../components/filters/Filters';
import SearchInput from '../components/filters/SearchInput';
import { VacancyCards } from '../components/vacanciesCard/VacancyCards';
import { url } from '../url';
import { authorizationData } from '../authorisation';
import { token } from '../requests/token';
import { Vacancy } from '../types';
import { InitialInputValues } from '../types';

function createUrlString(
  branchKey: number,
  filterInputsValues: InitialInputValues,
  searchInputValue: string
) {
  let pathUrl = `${url}/2.0/vacancies/?`;
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
  const [branchKey, setBranchKey] = React.useState(0);
  const [filterInputsValues, setInputsValues] = React.useState(initialInputsValues);
  const [catalogVacancies, setCatalogVacancies] = React.useState<Vacancy[]>([]);
  const [searchInputValue, setSearchInputValue] = React.useState('');

  React.useEffect(() => {
    fetch(createUrlString(branchKey, filterInputsValues, searchInputValue), {
      method: 'GET',
      headers: {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        'X-Api-App-Id': `${authorizationData.client_secret}`,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response: { objects: Vacancy[] }) => setCatalogVacancies(response.objects));
  }, [branchKey, filterInputsValues, searchInputValue]);
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
              width: 315,
              maxHeight: 400,
            })}
          >
            <Filters
              sendFilters={(key: number, inpValues: InitialInputValues) => {
                setBranchKey(key);
                setInputsValues(inpValues);
              }}
            />
          </Box>
          <Box
            sx={(theme) => ({
              backgroundColor: 'white',
              padding: theme.spacing.xl,
              borderRadius: theme.radius.md,
              border: '1px solid #EAEBED',
              width: 773,
            })}
          >
            <SearchInput
              changedSearchInpValue={(changedSearchInpValue: string) =>
                setSearchInputValue(changedSearchInpValue)
              }
            />
            <VacancyCards vacancies={catalogVacancies} />
          </Box>
        </Container>
      }
    </>
  );
}

//setSearchInputValue((event.target as HTMLInputElement).value)
