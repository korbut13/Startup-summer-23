import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Pagination, Loader, Drawer, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { authorizationData } from '../authorisation';
import { token } from '../requests/token';
import { Filters } from '../components/filters/Filters';
import { SearchInput } from '../components/filters/SearchInput';
import { VacancyCard } from '../components/vacancyCard/VacancyCard';
import { LackOfVacancies } from '../components/lack-of-vacancies/LackOfVacancies';
import { InitialInputValues, Vacancy } from '../utils/types';

import { getFavoriteVacancies } from '../utils/getFavoriteVacancies';
import createUrlToVacancies from '../utils/createUrlToVacancies';
import setInitValuesFromUrl from '../utils/getValuesFromUrl';
import getNumOfFiltersSelected from '../utils/getNumOfFiltersSelected';
import { catalogBranchesInit } from '../requests/getCatalogues';
import { UseStyles } from '../utils/styles';

const catalogBranches = catalogBranchesInit;

const initialInputValues = {
  keyword: '',
  payment_from: '',
  payment_to: '',
  catalogues: '',
};

const initialDataFilters = {
  published: '1',
  keyword: '',
  payment_from: '',
  payment_to: '',
  catalogues: '',
};

const initialActivePage = { activePage: 1 };

export default function JobSearchPage() {
  setInitValuesFromUrl(initialInputValues, initialDataFilters, catalogBranches, initialActivePage);
  const navigate = useNavigate();
  const { classes } = UseStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [amountPages, setAmountPages] = React.useState(0);
  const [activePage, setActivePage] = React.useState(initialActivePage.activePage);
  const [loading, setLoading] = React.useState(true);
  const [catalogVacancies, setCatalogVacancies] = React.useState<Vacancy[]>([]);
  const [inputValues, setInputValues] = React.useState<InitialInputValues>(initialInputValues);
  const [dataFilters, setDataFilters] = React.useState(initialDataFilters);
  const [favorite, setFavorite] = React.useState<number[]>(getFavoriteVacancies());

  const sendFilters = () => {
    const selectedBranch = catalogBranches.filter(
      (branch) => branch.value === inputValues.catalogues
    );
    const branchKey = selectedBranch.length !== 0 ? selectedBranch[0].catalogues : 0;
    setDataFilters((prevState) => ({
      ...prevState,
      keyword: inputValues.keyword,
      payment_from: inputValues.payment_from,
      payment_to: inputValues.payment_to,
      catalogues: branchKey.toString(),
    }));
    setActivePage(1);
  };

  const setNewValues = (valueName: string | number, keyName: string) => {
    setInputValues((prevState) => {
      const tempState: InitialInputValues = {
        keyword: '',
        payment_from: '',
        payment_to: '',
        catalogues: '',
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

  const changeSearchInputValue = (event: React.ChangeEvent) => {
    setInputValues((prevState) => ({
      ...prevState,
      keyword: (event.target as HTMLInputElement).value,
    }));
  };

  const changeFavorite = (id: number) => {
    const index = favorite.indexOf(id);
    let nextState: number[] = [];
    if (index === -1) {
      nextState = [...favorite, id];
    } else {
      nextState = favorite.filter((f) => f !== id);
    }
    setFavorite(nextState);
    localStorage.setItem('favoriteVacancies', JSON.stringify(nextState));
  };

  const filtersBox = (
    <Box className={classes.filtersBox}>
      <Filters
        catalogBranches={catalogBranches}
        branchName={inputValues.catalogues}
        onChangeBranch={(value: string) => setNewValues(value, 'catalogues')}
        paymentFromValue={inputValues.payment_from}
        onChangePaymentFrom={(value: number) => setNewValues(value, 'payment_from')}
        paymentToValue={inputValues.payment_to}
        onChangePaymentTo={(value: number) => setNewValues(value, 'payment_to')}
        sendFilters={sendFilters}
        clearFilters={() => {
          window.location.search = '';
        }}
      />
    </Box>
  );

  React.useEffect(() => {
    let searchParams = '?';
    const filterParams = {
      catalogues: dataFilters.catalogues,
      payment_from: dataFilters.payment_from,
      payment_to: dataFilters.payment_to,
      keyword: dataFilters.keyword,
      activePage: activePage,
    };
    for (const key in filterParams) {
      if (
        filterParams[key as keyof typeof filterParams] &&
        filterParams[key as keyof typeof filterParams] != 0
      ) {
        searchParams = searchParams + `${key}=${filterParams[key as keyof typeof filterParams]}&`;
      }
      searchParams;
    }
    navigate(searchParams.slice(0, -1));
  }, [
    dataFilters.catalogues,
    dataFilters.payment_from,
    dataFilters.payment_to,
    dataFilters.keyword,
    activePage,
  ]);

  React.useEffect(() => {
    setLoading(true);
    fetch(createUrlToVacancies(dataFilters, activePage), {
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
      {
        <Container size={1116} className={classes.container}>
          <Drawer opened={opened} onClose={close} position="top">
            {filtersBox}
          </Drawer>

          <Button onClick={open} className={classes.openFilters}>
            Фильтры ({getNumOfFiltersSelected()})
          </Button>

          <Box className={classes.initFilters}>{filtersBox}</Box>

          <Box w="100%">
            <SearchInput
              value={inputValues.keyword}
              onChange={changeSearchInputValue}
              sendFilters={sendFilters}
            />
            {catalogVacancies.length === 0 && !loading ? (
              <LackOfVacancies />
            ) : loading ? (
              <Loader size="xl" w="100%" mt="25%" />
            ) : (
              catalogVacancies.map((vacancy: Vacancy, index: number) => (
                <VacancyCard
                  key={index}
                  vacancy={vacancy}
                  favoriteVacancies={favorite}
                  changeFavorite={changeFavorite}
                />
              ))
            )}
            {amountPages > 1 && !loading && (
              <Pagination
                total={amountPages}
                value={activePage}
                onChange={setActivePage}
                style={{ justifyContent: 'center', marginTop: '38px' }}
              />
            )}
          </Box>
        </Container>
      }
    </>
  );
}
