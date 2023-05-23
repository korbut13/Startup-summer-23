import { Paper, Card, Text, Group, Indicator, Button } from '@mantine/core';
import { createPaymentString } from '../../utils/createPaymentString';
import { MapPin } from 'tabler-icons-react';
import { Vacancy } from '../../types';
import FavoriteIcon from './FavoriteIcon';
import { UseStyles } from '../../utils/styles';
import getStyleName from '../../utils/getStyleName';
import { Link } from 'react-router-dom';

export function VacancyCard({
  vacancy,
  favoriteVacancies,
  changeFavorite,
}: {
  vacancy: Vacancy;
  favoriteVacancies: number[];
  changeFavorite: (id: number) => void;
}) {
  const { classes } = UseStyles();
  return (
    <>
      <Paper className={getStyleName('paper')}>
        <Group className={classes.group}>
          <Card
            data-elem={`vacancy-${vacancy.id}`}
            component={Link}
            to="/vacancy"
            p={0}
            onClick={() => localStorage.setItem('idVacancy', `${vacancy.id}`)}
            style={{ width: '90%' }}
          >
            <Text className={getStyleName('profession')}>
              {vacancy.profession} ({vacancy.firm_name})
            </Text>
            <Group spacing="1.05rem">
              <Text className={getStyleName('payment')}>
                {createPaymentString(vacancy.payment_from, vacancy.payment_to, vacancy.currency)}
              </Text>
              <Indicator color="gray" size={5} position="middle-center" children={undefined} />
              <Text className={getStyleName('typeOfWork')}>{vacancy.type_of_work.title}</Text>
            </Group>
            <Group className={getStyleName('iconAndTown')}>
              <MapPin size={20} strokeWidth={1} color={'#ced4da'} />
              <Text className={getStyleName('town')}>{vacancy.town.title}</Text>
            </Group>
          </Card>
          <Button
            data-elem={`vacancy-${vacancy.id}-shortlist-button`}
            variant="subtle"
            className={classes.favoriteButton}
            onClick={() => changeFavorite(vacancy.id)}
          >
            <FavoriteIcon favoriteVacancies={favoriteVacancies} idVacancy={vacancy.id} />
          </Button>
        </Group>
      </Paper>
    </>
  );
}
