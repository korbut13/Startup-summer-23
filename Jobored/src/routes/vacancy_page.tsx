import React from 'react';
import { Container, Loader } from '@mantine/core';
import { url } from '../url';
import { authorizationData } from '../authorisation';
import { token } from '../requests/token';
import { Vacancy } from '../types';
import { VacancyCard } from '../components/vacancyCard/VacancyCard';
import { useStyles } from '../utils/styles';

const initialVacancy = {
  id: 0,
  profession: '',
  firm_name: '',
  town: { id: 0, title: '' },
  type_of_work: { id: 0, title: '' },
  payment_to: 0,
  payment_from: 0,
  currency: '',
  vacancyRichText: '',
};

export default function VacancyPage() {
  const { classes } = useStyles();
  const [loading, setLoading] = React.useState(true)
  const [vacancy, setVacancy] = React.useState<Vacancy>(initialVacancy);
  const [favorite, setFavorite] = React.useState<number[]>(
    JSON.parse(localStorage.getItem('favoriteVacancies') || '[]')
  );
  React.useEffect(() => {
    setLoading(true);
    try {
      fetch(`${url}/2.0/vacancies/${localStorage.getItem('idVacancy')}/`, {
        method: 'GET',
        headers: {
          'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
          'X-Api-App-Id': `${authorizationData.client_secret}`,
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response: Vacancy) => {
          setVacancy(response);
          setLoading(false);
        });
    } catch (error: unknown) {
      console.error(error)
    }
  }, []);
  return (
    <Container
      size={773}
      className={classes.containerPages}
    >
      {loading ? <Loader size="xl" w="100%" /> :
        (<>
          <VacancyCard
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
          <div className={classes.vacancyDescription} dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }}></div>
        </>)
      }
    </Container>
  );
}
