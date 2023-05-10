import { Card, Image, Text } from '@mantine/core';
import { Vacancy } from '../../types';


export function VacancyCard({ vacancies }: { vacancies: Vacancy[] }) {
  return (
    <>
      {vacancies.map((vacancy) => <Card
        shadow="sm"
        padding="xl"
        component="a"
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        target="_blank"
      >
        <Card.Section>
          <Image
            src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
            height={160}
            alt="No way!"
          />
        </Card.Section>

        <Text weight={500} size="lg" mt="md">
          {vacancy.profession}
        </Text>
        <Text mt="xs" color="dimmed" size="sm">
          {vacancy.firm_name}
        </Text>
        <Text mt="xs" color="dimmed" size="sm">
          {vacancy.town.title}
        </Text>
        <Text mt="xs" color="dimmed" size="sm">
          {vacancy.type_of_work.title}
        </Text>
      </Card>)}
    </>

  );
}
