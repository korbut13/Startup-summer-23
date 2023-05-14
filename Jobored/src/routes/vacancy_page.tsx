import React from 'react';
import { Container, Group, Box } from '@mantine/core';
import { url } from '../url';
import { authorizationData } from '../authorisation';
import { token } from '../requests/token';
import { Vacancy } from '../types';
import { VacancyCard } from '../components/vacanciesCards/VacancyCard';

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
  const [vacancyData, setVacancyData] = React.useState('');
  const [vacancy, setVacancy] = React.useState<Vacancy>(initialVacancy)
  React.useEffect(() => {
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
        // setVacancyData(response.vacancyRichText)
      })
  }, []);
  return (
    <Container
      size={1116}
      mx="auto"
      py="xl"
    >
      <Box w="75%" mx="auto" style={{ flexDirection: "column" }}>
        <VacancyCard vacancy={vacancy} />
        <div dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }}></div>
      </Box>
    </Container>
  );
}
