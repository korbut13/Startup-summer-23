import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Pagination, Loader, Drawer, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Filters from '../components/filters/Filters';
import SearchInput from '../components/filters/SearchInput';
import { VacancyCard } from '../components/vacancyCard/VacancyCard';
import { authorizationData } from '../authorisation';
import { token } from '../requests/token';
import createUrlString from '../utils/createUrlString';
import { InitialInputValues } from '../types';
import { Vacancy } from '../types';
import { LackOfVacancies } from '../components/lack-of-vacancies/LackOfVacancies';
import { useStyles } from '../utils/styles';
import { catalogBranchesInit } from '../requests/getCatalogues';
import setInitValuesFromUrl from '../utils/getValuesFromUrl';


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

export default function JobSearchPage() {
  setInitValuesFromUrl(initialInputValues, initialDataFilters, catalogBranches);

  const navigate = useNavigate();
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [activePage, setActivePage] = React.useState(1);
  const [amountPages, setAmountPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true)
  const [catalogVacancies, setCatalogVacancies] = React.useState<Vacancy[]>([]);
  const [inputValues, setInputValues] = React.useState<InitialInputValues>(initialInputValues);
  const [dataFilters, setDataFilters] = React.useState(initialDataFilters);
  const [favorite, setFavorite] = React.useState<number[]>(
    JSON.parse(localStorage.getItem('favoriteVacancies') || '[]')
  );

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

  const filtersBox = <Box
    sx={(theme) => ({
      backgroundColor: 'white',
      textAlign: 'center',
      padding: "19px 20px",
      borderRadius: theme.radius.md,
      border: '1px solid #EAEBED',
      width: '275px',
      maxHeight: 320,
    })}
  >
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
        setInputValues(initialInputValues);
        setDataFilters(initialDataFilters);
      }}
    />
  </Box>

  React.useEffect(() => {
    let searchParams = '?';
    const filterParams = {
      catalogues: dataFilters.catalogues,
      payment_from: dataFilters.payment_from,
      payment_to: dataFilters.payment_to,
      keyword: dataFilters.keyword,
      activePage: activePage
    };
    for (const key in filterParams) {
      if (filterParams[key as keyof typeof filterParams] && filterParams[key as keyof typeof filterParams] != 0) {
        searchParams = searchParams + `${key}=${filterParams[key as keyof typeof filterParams]}&`
      } searchParams;
    }
    navigate(searchParams.slice(0, -1));

  }, [dataFilters.catalogues, dataFilters.payment_from, dataFilters.payment_to, dataFilters.keyword, activePage])

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
            value={inputValues.keyword}
            onChange={(event: React.ChangeEvent) => {
              setInputValues((prevState) => ({
                ...prevState,
                keyword: (event.target as HTMLInputElement).value,
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
              onChange={setActivePage}
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
