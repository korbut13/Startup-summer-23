// import { Card, Text, Group, Button, Title, Indicator } from '@mantine/core';
// import { Star, MapPin } from 'tabler-icons-react';
// import { Vacancy } from '../../types';

// function createPaymentString(paymentFrom: number, paymentTo: number, currency: string) {
//   switch (paymentFrom + paymentTo) {
//     case 0:
//       return 'з/п не указана';
//       break;
//     case paymentFrom:
//       return `з/п от ${paymentFrom} ${currency}`;
//       break;
//     case paymentTo:
//       return `з/п до ${paymentTo} ${currency}`;
//       break;
//     case paymentTo + paymentFrom:
//       return `з/п от ${paymentFrom} - ${paymentTo} ${currency}`;
//       break;
//     default:
//       return 'з/п не указана';
//   }
// }

// export function VacancyCards({ vacancies }: { vacancies: Vacancy[] }) {
//   return (
//     <>
//       {vacancies.map((vacancy, index) => (
//         <Card
//           key={index}
//           style={{ border: '1px solid #EAEBED' }}
//           radius="lg"
//           padding="xl"
//           component="a"
//           href="/vacancy"
//           mb={16}
//           onClick={() => localStorage.setItem('idVacancy', `${vacancy.id}`)}
//         >
//           <Group mb={12} style={{ justifyContent: 'space-between' }}>
//             <Title order={5} c="#5E96FC" size="lg" ff="Inter-Regular" mt="md" w="87%">
//               {vacancy.profession} ({vacancy.firm_name})
//             </Title>
//             <Button rightIcon={<Star />} variant="white"></Button>
//           </Group>
//           <Group mb={12}>
//             <Title order={5} size="lg" ff="Inter-Regular">
//               {createPaymentString(vacancy.payment_from, vacancy.payment_to, vacancy.currency)}
//             </Title>
//             <Indicator color="gray" size={7} position="middle-center" children={undefined} />
//             <Text size="sm">{vacancy.type_of_work.title}</Text>
//           </Group>
//           <Group>
//             <MapPin size={20} strokeWidth={1} color={'#ced4da'} />
//             <Text size="md">{vacancy.town.title}</Text>
//           </Group>
//         </Card>
//       ))}
//     </>
//   );
// }

import React from 'react';
import { Card, Text, Group, Title, Indicator } from '@mantine/core';
import { MapPin } from 'tabler-icons-react';
import { Vacancy } from '../../types';
import { Star } from '../star/_star';
import { PaintedStar } from '../star/_paintedStar';

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
function createStar(idVacancy: number) {
  if (localStorage.getItem("favoriteVacancies") === null) {
    return <Star />
  } else if (localStorage.getItem("favoriteVacancies")!.includes(`${idVacancy}`)) {
    return <PaintedStar />
  } else return <Star />
}

export function VacancyCard({ vacancy, changeFavorite }: { vacancy: Vacancy, changeFavorite: (id: number) => void }) {

  return (
    <>
      <Card
        key={vacancy.id}
        style={{ border: '1px solid #EAEBED' }}
        radius="lg"
        padding="xl"
        // component={window.location.pathname.includes('vacancy') ? "div" : "a"}
        // href="/vacancy"
        mb={16}
        onClick={() => localStorage.setItem('idVacancy', `${vacancy.id}`)}
      >
        <Group mb={12} style={{ justifyContent: 'space-between' }}>
          <Title order={5} c="#5E96FC" size="lg" ff="Inter-Regular" mt="md" w="87%">
            {vacancy.profession} ({vacancy.firm_name})
          </Title>

          <div onClick={() => changeFavorite(vacancy.id)}>{createStar(vacancy.id)}</div>

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
