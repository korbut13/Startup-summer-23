import { Card, Text, Group, Title, Indicator } from '@mantine/core';
import { createPaymentString } from '../../utils/createPaymentString';
import { MapPin } from 'tabler-icons-react';
import { Vacancy } from '../../types';
import FavoriteIcon from './FavoriteIcon';

export function VacancyCard({ vacancy, favoriteVacancies, changeFavorite }: { vacancy: Vacancy, favoriteVacancies: number[], changeFavorite: (id: number) => void }) {

  return (
    <>
      <Card
        key={vacancy.id}
        style={{ border: '1px solid #EAEBED' }}
        radius="lg"
        padding="xl"
        component={window.location.pathname.includes('vacancy') ? "div" : "a"}
        href="/vacancy"
        mb={16}
        onClick={() => localStorage.setItem('idVacancy', `${vacancy.id}`)}
      >
        <Group mb={12} style={{ justifyContent: 'space-between' }}>
          <Title order={5} c="#5E96FC" size="lg" ff="Inter-Regular" mt="md" w="87%">
            {vacancy.profession} ({vacancy.firm_name})
          </Title>

          <div onClick={() => changeFavorite(vacancy.id)}>
            <FavoriteIcon favoriteVacancies={favoriteVacancies} idVacancy={vacancy.id} />
          </div>

        </Group>
        <Group mb={12}>
          <Title order={5} size="lg" ff="Inter-Regular">
            {createPaymentString(vacancy.payment_from, vacancy.payment_to, vacancy.currency)}
          </Title>
          <Indicator color="gray" size={7} position="middle-center" children={undefined} />
          <Text size="sm">{vacancy.type_of_work.title}</Text>
        </Group>
        <Group>
          <MapPin size={20} strokeWidth={1} color={'#ced4da'} />
          <Text size="md">{vacancy.town.title}</Text>
        </Group>
      </Card>
    </>
  );
}
