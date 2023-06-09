import React from 'react';
import { Container, Pagination, Loader } from '@mantine/core';

import { VacancyCard } from '../components/vacancyCard/VacancyCard';
import { LackOfVacancies } from '../components/lack-of-vacancies/LackOfVacancies';

import createUrlToFavotite from '../utils/createUrlToFavorite';
import { authorizationData } from '../authorisation';
import { token } from '../requests/token';
import { Vacancy } from '../utils/types';
import { UseStyles } from '../utils/styles';
import { getFavoriteVacancies } from '../utils/getFavoriteVacancies';

const ITEMS_PER_PAGE = 4;

export default function FavoritesVacanciesPage() {
  const { classes } = UseStyles();
  const [activePage, setActivePage] = React.useState(1);
  const [amountPages, setAmountPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [favorite, setFavorite] = React.useState<number[]>(getFavoriteVacancies());
  const [catalogVacancies, setCatalogVacancies] = React.useState<Vacancy[]>([]);
  const [amountVacOnPage, setAmountVacOnPage] = React.useState(0);

  React.useEffect(() => {
    try {
      setLoading(true);
      favorite.length !== 0 &&
        fetch(createUrlToFavotite(favorite, activePage), {
          method: 'GET',
          headers: {
            'x-secret-key': import.meta.env.VITE_X_SECRET_KEY,
            'X-Api-App-Id': `${authorizationData.client_secret}`,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((response: { objects: Vacancy[]; total: number }) => {
            setAmountPages(Math.ceil(response.total / ITEMS_PER_PAGE));
            setCatalogVacancies(response.objects);
            setAmountVacOnPage(response.objects.length);
            setLoading(false);
          });
    } catch (error: unknown) {
      console.error(error);
    }
  }, [favorite, activePage]);

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
    if (activePage !== 1 && amountVacOnPage === 1) {
      setActivePage(activePage - 1);
    }
  };

  return (
    <>
      <Container size={773} className={classes.containerPages}>
        {favorite.length === 0 ? (
          <LackOfVacancies />
        ) : loading ? (
          <Loader size="xl" w="100%" />
        ) : (
          catalogVacancies.map((vacancy: Vacancy) => (
            <VacancyCard
              key={vacancy.id}
              vacancy={vacancy}
              favoriteVacancies={favorite}
              changeFavorite={changeFavorite}
            />
          ))
        )}
        {amountPages > 1 && (
          <Pagination
            total={amountPages}
            value={activePage}
            onChange={setActivePage}
            style={{ justifyContent: 'center', marginTop: '85px' }}
          />
        )}
      </Container>
    </>
  );
}
