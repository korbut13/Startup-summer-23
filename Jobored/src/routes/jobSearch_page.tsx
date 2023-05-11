import { Box, Container } from '@mantine/core';
import Filters from '../components/filters/Filters';
import SearchInput from '../components/header/SearchInput';
import { VacancyCards } from '../components/vacanciesCard/VacancyCards';
import { vacancies } from '../requests/vacancies';
export default function JobSearchPage() {
  return (
    <>
      {
        <Container
          size={1116}
          mx="auto"
          py="xl"
          style={{ display: 'flex', justifyContent: 'space-between', gap: 28 }}
        >
          <Box
            sx={(theme) => ({
              backgroundColor: 'white',
              textAlign: 'center',
              padding: theme.spacing.xl,
              borderRadius: theme.radius.md,
              border: '1px solid #EAEBED',
              width: 315,
            })}
          >
            <Filters />
          </Box>
          <Box
            sx={(theme) => ({
              backgroundColor: 'white',
              padding: theme.spacing.xl,
              borderRadius: theme.radius.md,
              border: '1px solid #EAEBED',
              width: 773,
            })}
          >
            <SearchInput />
            <VacancyCards vacancies={vacancies} />
          </Box>
        </Container>
      }
    </>
  );
}
