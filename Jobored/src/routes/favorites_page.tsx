import React from 'react';
import { Container, Pagination } from '@mantine/core';
import { Vacancy } from '../types';
import { VacancyCard } from '../components/vacancyCard/VacancyCard';
import { url } from '../url';
import { authorizationData } from '../authorisation';
import { token } from '../requests/token';

function createUrl(idsVacancies: number[], activePage: number) {
  let path = `${url}/2.0/vacancies/?page=${activePage - 1}&count=4&`;

  for (const id of idsVacancies) {
    path = path + `ids[]=${id}&`;
  }
  return path.slice(0, -1);
}

export default function FavoritesVacanciesPage() {
  const [activePage, setactivePage] = React.useState(1);
  const [amountPages, setAmountPages] = React.useState(0);
  const [favorite, setFavorite] = React.useState<number[]>(
    JSON.parse(localStorage.getItem('favoriteVacancies')!)
  );
  const [catalogVacancies, setCatalogVacancies] = React.useState<Vacancy[]>([]);
  React.useEffect(() => {
    fetch(createUrl(favorite, activePage), {
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
      });
  }, [favorite, activePage]);
  return (
    <>
      <Container
        size={1116}
        mx="auto"
        py="xl"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        {catalogVacancies.map((vacancy: Vacancy) => (
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
            }}
          />
        ))}
        <Pagination
          total={amountPages}
          value={activePage}
          onChange={setactivePage}
          style={{ justifyContent: 'center' }}
        />
        {/* {amountPages > 1 ? <Pagination total={amountPages} value={activePage} onChange={setactivePage} style={{ justifyContent: "center" }} /> : ''} */}
      </Container>
    </>
  );
}
