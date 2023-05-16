import React from 'react';
import { Box, Container, Pagination } from '@mantine/core';
import Filters from '../components/filters/Filters';
import SearchInput from '../components/filters/SearchInput';
import { VacancyCard } from '../components/vacancyCard/VacancyCard';
import { url } from '../url';
import { authorizationData } from '../authorisation';
import { token } from '../requests/token';
import createUrlString from '../utils/createUrlString';
import { InitialInputValues } from '../types';
import { Branch } from '../types';
import { BranchParams } from '../types';
import { Vacancy } from '../types';

export default function JobSearchPage() {
  const initialInputValues = {
    searchInputValue: '',
    payment_from: '',
    payment_to: '',
    branchName: '',
  };
  const initialDataFilters = {
    published: '1',
    keyword: '',
    payment_from: '',
    payment_to: '',
    catalogues: '',
  }
  const [activePage, setactivePage] = React.useState(1);
  const [amountPages, setAmountPages] = React.useState(0);
  const [catalogBranches, setCatalogBranches] = React.useState<BranchParams[]>([]);
  const [catalogVacancies, setCatalogVacancies] = React.useState<Vacancy[]>([]);
  const [inputValues, setInputValues] = React.useState<InitialInputValues>(initialInputValues);
  const [dataFilters, setDataFilters] = React.useState(initialDataFilters);
  const [favorite, setFavorite] = React.useState<number[]>(JSON.parse(localStorage.getItem("favoriteVacancies") || '[]'));

  const sendFilters = () => {
    const selectedBranch = catalogBranches.filter(
      (branch) => branch.value === inputValues.branchName
    );
    const branchKey = selectedBranch.length !== 0 ? selectedBranch[0].catalogues : 0;
    setDataFilters((prevState) => ({
      ...prevState,
      keyword: inputValues.searchInputValue,
      payment_from: inputValues.payment_from,
      payment_to: inputValues.payment_to,
      catalogues: branchKey.toString(),
    }))
    setactivePage(1)
  }

  const setNewValues = (valueName: string | number, keyName: string) => {
    setInputValues((prevState) => {
      let tempState: InitialInputValues = {
        searchInputValue: '',
        payment_from: '',
        payment_to: '',
        branchName: ''
      }
      for (const [key, value] of Object.entries(prevState)) {
        if (key !== keyName) {
          tempState[key as keyof typeof tempState] = value
        }
        tempState[keyName as keyof typeof tempState] = valueName.toString()
      }
      return tempState
    })
  }
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
            label: branch.title_trimmed,
            value: branch.title_trimmed,
            catalogues: branch.key,
          };
        });
        setCatalogBranches(changedCatalogBranches)
      })
  }, []);

  React.useEffect(() => {
    fetch(createUrlString(dataFilters, activePage), {
      method: 'GET',
      headers: {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        'X-Api-App-Id': `${authorizationData.client_secret}`,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response: { objects: Vacancy[], total: number }) => {
        setAmountPages(response.total > 500 ? 125 : Math.ceil(response.total / 4));
        setCatalogVacancies(response.objects);
      });

  }, [dataFilters, activePage]);

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
              catalogBranches={catalogBranches}
              branchName={inputValues.branchName}

              onChangeBranch={(value: string) => setNewValues(value, "branchName")}

              paymentFromValue={inputValues.payment_from}

              onChangePaymentFrom={(value: number) => setNewValues(value, "payment_from")}
              paymentToValue={inputValues.payment_to}

              onChangePaymentTo={(value: number) => setNewValues(value, "payment_to")}
              sendFilters={sendFilters}
              clearFilters={() => {
                setInputValues(initialInputValues)
                setDataFilters(initialDataFilters)
              }
              }
            />
          </Box>
          <Box w="75%" >
            <SearchInput
              value={inputValues.searchInputValue}
              onChange={(event: React.ChangeEvent) => {
                setInputValues((prevState) => ({
                  ...prevState,
                  searchInputValue: (event.target as HTMLInputElement).value
                }))
              }}
              sendFilters={sendFilters}
            />
            {catalogVacancies.map((vacancy: Vacancy, index: number) => <VacancyCard key={index} vacancy={vacancy} favoriteVacancies={favorite} changeFavorite={(id: number) => {
              const index = favorite.indexOf(id);
              let nextState: number[] = [];
              if (index === -1) {
                nextState = [...favorite, id];
              } else {
                nextState = favorite.filter((f) => f !== id);
              }
              setFavorite(nextState);
              localStorage.setItem("favoriteVacancies", JSON.stringify(nextState));

            }} />)}
            <Pagination total={amountPages} value={activePage} onChange={setactivePage} style={{ justifyContent: "center" }} />
          </Box>
        </Container>
      }
    </>
  );
}
