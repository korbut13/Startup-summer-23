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
      <Paper style={{ borderRadius: "12px", border: "1px solid #EAEBED", marginBottom: "16px", padding: "23px 22px 21px 23px" }}>
        <Group style={{ flexWrap: 'nowrap', justifyContent: 'space-between', alignItems: 'start' }}>
          <Card
            component={window.location.href.includes('vacancy') ? "div" : "a"}
            href="/vacancy" p={0} onClick={() => localStorage.setItem("idVacancy", `${vacancy.id}`)}
            style={{ width: "90%" }}
          >
            <Text
              style={window.location.href.includes('vacancy')
                ? { fontWeight: "700", fontSize: "28px", lineHeight: "34px", fontFamily: "InterBold", color: "black", marginBottom: "16px" }
                : { fontWeight: "600", fontSize: "20px", fontFamily: "Inter", lineHeight: "24px", color: "#5E96FC", marginBottom: "12px" }}
            >
              {vacancy.profession} ({vacancy.firm_name})
            </Text>
            <Group>
              <Text
                style={window.location.href.includes('vacancy')
                  ? { fontWeight: "700", fontSize: "20px", lineHeight: "20px", fontFamily: "InterBold" }
                  : { fontWeight: "600", fontSize: "16px", fontFamily: "Inter", lineHeight: "20px" }}
              >
                {createPaymentString(vacancy.payment_from, vacancy.payment_to, vacancy.currency)}
              </Text>
              <Indicator color="gray" size={5} position="middle-center" children={undefined} />
              <Text
                style={window.location.href.includes('vacancy')
                  ? { fontWeight: "400", fontSize: "20px", lineHeight: "20px", fontFamily: "Inter" }
                  : { fontWeight: "400", fontSize: "16px", fontFamily: "Inter", lineHeight: "20px" }}
              >{vacancy.type_of_work.title}</Text>
            </Group>
            <Group
              style={window.location.href.includes('vacancy')
                ? { marginTop: "16.7px", gap: "8px" }
                : { marginTop: "13px", gap: "8px" }}>
              <MapPin size={20} strokeWidth={1} color={'#ced4da'} />
              <Text
                style={window.location.href.includes('vacancy')
                  ? { fontWeight: "400", fontSize: "16px", lineHeight: "140%", fontFamily: "Inter" }
                  : { fontWeight: "400", fontSize: "16px", fontFamily: "Inter", lineHeight: "20px" }}
              >{vacancy.town.title}</Text>
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
