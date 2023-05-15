import { Paper, Card, Text, Group, Title, Indicator } from '@mantine/core';
import { createPaymentString } from '../../utils/createPaymentString';
import { MapPin } from 'tabler-icons-react';
import { Vacancy } from '../../types';
import FavoriteIcon from './FavoriteIcon';

export function VacancyCard({ vacancy, favoriteVacancies, changeFavorite }: { vacancy: Vacancy, favoriteVacancies: number[], changeFavorite: (id: number) => void }) {

  return (
    <>
      <Paper shadow="xs" radius="lg" mb={16} p={24}>
        <Group style={{ flexWrap: "nowrap", justifyContent: 'space-between', alignItems: "start" }}>
          <Card component='a' href='/vacancy' p={0}>
            <Title order={5} c="#5E96FC" size="lg" ff="Inter-Regular" w="87%">
              {vacancy.profession} ({vacancy.firm_name})
            </Title>
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
          <div onClick={() => changeFavorite(vacancy.id)}>
            <FavoriteIcon favoriteVacancies={favoriteVacancies} idVacancy={vacancy.id} />
          </div>
        </Group>
      </Paper>
    </>
  );
}
