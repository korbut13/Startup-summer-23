import { Card, Text, Group, Button, Title, Indicator } from '@mantine/core';
import { Star, MapPin } from 'tabler-icons-react';
import { Vacancy } from '../../types';
// з/п {vacancy.payment_from == "0" ? `до ${vacancy.payment_to}` : `от ${vacancy.payment_from} ${vacancy.payment_to == "0" ? `${vacancy.currency}` : `- ${vacancy.payment_to} ${vacancy.currency}`}`}
function createPaymentString(paymentFrom: number, paymentTo: number, currency: string) {
  switch (paymentFrom + paymentTo) {
    case 0:
      return 'з/п не указана';
      break;
    case paymentFrom:
      return `з/п от ${paymentFrom} ${currency}`;
      break;
    case paymentTo:
      return `з/п до ${paymentTo} ${currency}`;
      break;
    case paymentTo + paymentFrom:
      return `з/п от ${paymentFrom} - ${paymentTo} ${currency}`;
      break;
    default:
      return 'з/п не указана';
  }
}

export function VacancyCards({ vacancies }: { vacancies: Vacancy[] }) {
  return (
    <>
      {vacancies.map((vacancy) => (
        <Card
          style={{ border: '1px solid #EAEBED' }}
          radius="lg"
          padding="xl"
          component="a"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          mb={16}
        >
          <Group mb={12} style={{ justifyContent: 'space-between' }}>
            <Title order={5} c="#5E96FC" size="lg" ff="Inter-Regular" mt="md" w="87%">
              {vacancy.profession} ({vacancy.firm_name})
            </Title>
            <Button rightIcon={<Star />} variant="white"></Button>
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
      ))}
    </>
  );
}
