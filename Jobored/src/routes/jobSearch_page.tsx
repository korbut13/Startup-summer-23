import React from 'react';
import { Box, Container, Pagination, Loader, Drawer, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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
import { LackOfVacancies } from '../components/lack-of-vacancies/LackOfVacancies';
import { useStyles } from '../utils/styles';

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
};

export default function JobSearchPage() {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  const [activePage, setactivePage] = React.useState(1);
  const [amountPages, setAmountPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true)
  const [catalogBranches, setCatalogBranches] = React.useState<BranchParams[]>([]);
  const [catalogVacancies, setCatalogVacancies] = React.useState<Vacancy[]>([]);
  const [inputValues, setInputValues] = React.useState<InitialInputValues>(initialInputValues);
  const [dataFilters, setDataFilters] = React.useState(initialDataFilters);
  const [favorite, setFavorite] = React.useState<number[]>(
    JSON.parse(localStorage.getItem('favoriteVacancies') || '[]')
  );

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
    }));
    setactivePage(1);
  };

  const setNewValues = (valueName: string | number, keyName: string) => {
    setInputValues((prevState) => {
      const tempState: InitialInputValues = {
        searchInputValue: '',
        payment_from: '',
        payment_to: '',
        branchName: '',
      };
      for (const [key, value] of Object.entries(prevState)) {
        if (key !== keyName) {
          tempState[key as keyof typeof tempState] = value;
        }
        tempState[keyName as keyof typeof tempState] = valueName.toString();
      }
      return tempState;
    });
  };

  const filtersBox = <Box
    sx={(theme) => ({
      backgroundColor: 'white',
      textAlign: 'center',
      padding: "18px 20px",
      borderRadius: theme.radius.md,
      border: '1px solid #EAEBED',
      width: '275px',
      maxHeight: 320,
    })}
  >
    <Filters
      catalogBranches={catalogBranches}
      branchName={inputValues.branchName}
      onChangeBranch={(value: string) => setNewValues(value, 'branchName')}
      paymentFromValue={inputValues.payment_from}
      onChangePaymentFrom={(value: number) => setNewValues(value, 'payment_from')}
      paymentToValue={inputValues.payment_to}
      onChangePaymentTo={(value: number) => setNewValues(value, 'payment_to')}
      sendFilters={sendFilters}
      clearFilters={() => {
        setInputValues(initialInputValues);
        setDataFilters(initialDataFilters);
      }}
    />
  </Box>

  React.useEffect(() => {
    try {
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
          setCatalogBranches(changedCatalogBranches);
        });
    } catch (error: unknown) {
      console.error(error)
    }
  }, []);

  React.useEffect(() => {
    setLoading(true)
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
      .then((response: { objects: Vacancy[]; total: number }) => {
        setAmountPages(response.total > 500 ? 125 : Math.ceil(response.total / 4));
        setCatalogVacancies(response.objects);
        setLoading(false);
      });
  }, [dataFilters, activePage]);

  return (
    <>
      {<Container
        size={1116}
        className={classes.container}
      >
        <Drawer opened={opened} onClose={close} position='top'>
          {filtersBox}
        </Drawer>
        <Button onClick={open} className={classes.openFilters}>Фильтры</Button>

        <Box className={classes.initFilters}>
          {filtersBox}
        </Box >
        <Box w="100%">
          <SearchInput
            value={inputValues.searchInputValue}
            onChange={(event: React.ChangeEvent) => {
              setInputValues((prevState) => ({
                ...prevState,
                searchInputValue: (event.target as HTMLInputElement).value,
              }));
            }}
            sendFilters={sendFilters}
          />
          {catalogVacancies.length === 0 && !loading ? (
            <LackOfVacancies />
          ) : loading ? <Loader size="xl" w="100%" mt="25%" /> : (
            catalogVacancies.map((vacancy: Vacancy, index: number) => (
              <VacancyCard
                key={index}
                vacancy={vacancy}
                favoriteVacancies={favorite}
                changeFavorite={(id: number) => {
                  const index = favorite.indexOf(id);
                  let nextState: number[] = [];
                  if (index === -1) {
                    nextState = [...favorite, id];
                  } else {
                    nextState = favorite.filter((f) => f !== id);
                  }
                  setFavorite(nextState);
                  localStorage.setItem('favoriteVacancies', JSON.stringify(nextState));
                }}
              />
            ))
          )}
          {amountPages > 1 && !loading ? (
            <Pagination
              total={amountPages}
              value={activePage}
              onChange={setactivePage}
              style={{ justifyContent: 'center', marginTop: "38px" }}
            />
          ) : (
            ''
          )}
        </Box>
      </Container>
      }
    </>
  );
}
