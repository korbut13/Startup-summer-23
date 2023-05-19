import React from 'react';
import { Container, Pagination, Loader } from '@mantine/core';
import { Vacancy } from '../types';
import { VacancyCard } from '../components/vacancyCard/VacancyCard';
import { url } from '../url';
import { authorizationData } from '../authorisation';
import { token } from '../requests/token';
import { LackOfVacancies } from '../components/lack-of-vacancies/LackOfVacancies';
import { useStyles } from '../utils/styles';

function createUrl(idsVacancies: number[], activePage: number) {
  let path = `${url}/2.0/vacancies/?page=${activePage - 1}&count=4&`;

  for (const id of idsVacancies) {
    path = path + `ids[]=${id}&`;
  }
  return path.slice(0, -1);
}

export default function FavoritesVacanciesPage() {
  const { classes } = useStyles();
  const [activePage, setActivePage] = React.useState(1);
  const [amountPages, setAmountPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true)
  const [favorite, setFavorite] = React.useState<number[]>(
    JSON.parse(localStorage.getItem('favoriteVacancies') || '[]')
  );
  const [catalogVacancies, setCatalogVacancies] = React.useState<Vacancy[]>([]);
  const [amountVacOnPage, setAmountVacOnPage] = React.useState(0)

  React.useEffect(() => {
    try {
      setLoading(true)
      favorite.length === 0
        ? ''
        : fetch(createUrl(favorite, activePage), {
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
            setAmountPages(Math.ceil(response.total / 4));
            setCatalogVacancies(response.objects);
            setAmountVacOnPage(response.objects.length);
            // console.log("vacancies",)
            // console.log("",)
            setLoading(false)
          });
    } catch (error: unknown) {
      console.error(error)
    }
  }, [favorite, activePage]);
  return (
    <>
      <Container
        size={773}
        className={classes.containerPages}
      >
        {favorite.length === 0 ? (
          <LackOfVacancies />
        ) : loading ? <Loader size="xl" w="100%" /> : (
          catalogVacancies.map((vacancy: Vacancy) => (
            <VacancyCard
              key={vacancy.id}
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
                if (activePage !== 1 && amountVacOnPage === 1) {
                  setActivePage(activePage - 1)
                }
              }}
            />
          ))
        )}

        {amountPages > 1 ? (
          <Pagination
            total={amountPages}
            value={activePage}
            onChange={setActivePage}
            style={{ justifyContent: 'center', marginTop: "87px" }}
          />
        ) : (
          ''
        )}
      </Container>
    </>
  );
}
