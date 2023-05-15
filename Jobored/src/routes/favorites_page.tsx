import React from 'react';
import { Container } from '@mantine/core';
import { Vacancy } from '../types';
import { VacancyCard } from '../components/vacancyCard/VacancyCard';
import { url } from '../url';
import { authorizationData } from '../authorisation';
import { token } from '../requests/token';

export default function FavoritesVacanciesPage() {

  const [favorite, setFavorite] = React.useState<number[]>(JSON.parse(localStorage.getItem("favoriteVacancies")!));
  const [catalogVacancies, setCatalogVacancies] = React.useState<Vacancy[]>([])

  function createUrl(idsVacancies: number[]) {
    let path = `${url}/2.0/vacancies/?`
    for (let id of idsVacancies) {
      path = path + `ids[]=${id}&`
    }
    return path.slice(0, -1);
  }

  React.useEffect(() => {
    fetch(createUrl(favorite), {
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
        setCatalogVacancies(response.objects);
      });

  }, [favorite]);
  return (
    <Container
      size={1116}
      mx="auto"
      py="xl"
      style={{ display: 'flex', justifyContent: 'space-between', flexDirection: "column", gap: 28 }}
    >
      {catalogVacancies.map((vacancy: Vacancy) => <VacancyCard vacancy={vacancy} favoriteVacancies={favorite} changeFavorite={(id: number) => {
        const index = favorite.indexOf(id);
        let nextState: number[] = [];
        if (index === -1) {
          nextState = [...favorite, id];
        } else {
          nextState = favorite.filter((f) => f !== id);
        }
        setFavorite(nextState);
        localStorage.setItem("favoriteVacancies", JSON.stringify(nextState));
      }
      }
      />)}
    </Container>
  );
}
