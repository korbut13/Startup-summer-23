import { Paper, Card, Text, Group, Title, Indicator } from '@mantine/core';
import { createPaymentString } from '../../utils/createPaymentString';
import { MapPin } from 'tabler-icons-react';
import { Vacancy } from '../../types';
import FavoriteIcon from './FavoriteIcon';

export function VacancyCard({
  vacancy,
  favoriteVacancies,
  changeFavorite,
}: {
  vacancy: Vacancy;
  favoriteVacancies: number[];
  changeFavorite: (id: number) => void;
}) {
  return (
    <>
      <Paper shadow="xs" radius="12px" mb={16} p="21px 24px 19px 24px">
        <Group style={{ flexWrap: 'nowrap', justifyContent: 'space-between', alignItems: 'start' }}>
          <Card
            component={window.location.href.includes('vacancy') ? "div" : "a"}
            href="/vacancy" p={0} onClick={() => localStorage.setItem("idVacancy", `${vacancy.id}`)}
            style={{ width: "90%" }}
          >
            <Text c="#5E96FC" fw={600} fz="20px" ff="Inter" mb="7px">
              {vacancy.profession} ({vacancy.firm_name})
            </Text>
            <Group mb={6}>
              <Text ff="Inter" fw={600} fz="16px" lh="20px">
                {createPaymentString(vacancy.payment_from, vacancy.payment_to, vacancy.currency)}
              </Text>
              <Indicator color="gray" size={5} position="middle-center" children={undefined} />
              <Text ff="Inter" fz="16px" fw={400}>{vacancy.type_of_work.title}</Text>
            </Group>
            <Group style={{ gap: "8px" }}>
              <MapPin size={20} strokeWidth={1} color={'#ced4da'} />
              <Text ff="Inter" fz="16px" fw={400}>{vacancy.town.title}</Text>
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
