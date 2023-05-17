import { useState } from 'react';
import { Container, Header, Group, Title, NavLink } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Logo } from './_logo';

const dataLinks = [
  { label: 'Поиск Вакансий', path: '/' },
  { label: 'Избранное', path: '/favorites' },
];

export default function HeaderComponent() {
  const [active, setActive] = useState(0);
  return (
    <>
      <Header height={87} mb={40}>
        {
          <Container size={1116} mx="auto" pt={26} sx={{ display: 'flex' }}>
            <Group position="left" w="36.8%" sx={{ gap: "0.8rem" }}>
              <Logo />
              <Title order={1} fz="24px" fw={600} lts="-0.04em" sx={{ fontFamily: 'Poppins' }}>
                Jobored
              </Title>
            </Group>
            <Group position="left" w="32%" noWrap>
              {dataLinks.map((link, index) => (
                <NavLink
                  noWrap
                  component={Link}
                  to={link.path}
                  key={link.label}
                  active={index === active}
                  label={link.label}
                  onClick={() => setActive(index)}
                  variant="subtle"
                />
              ))}
            </Group>
          </Container>
        }
      </Header>
    </>
  );
}
