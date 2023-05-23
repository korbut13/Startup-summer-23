import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Card,
  Group,
  Title,
  NavLink,
  Header,
  Menu,
  Burger,
  MediaQuery,
} from '@mantine/core';

import { Logo } from './_logo';
import { UseStyles } from '../../utils/styles';
import { AppRoutes } from '../../main';

const dataLinks = [
  { label: 'Поиск Вакансий', path: '/' },
  { label: 'Избранное', path: '/favorites' },
];

export default function App() {
  const { classes } = UseStyles();
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState(0);

  const navLinks = dataLinks.map((link, index) => (
    <NavLink
      noWrap
      component={Link}
      to={link.path}
      key={link.label}
      active={index === active}
      label={link.label}
      onClick={() => setActive(index)}
      variant="subtle"
      className={classes.link}
      styles={{ label: { fontSize: '16px', fontFamily: 'Inter', fontWeight: 500, lineHeight: 0 } }}
    />
  ));
  return (
    <Header height={86}>
      <Container size={1116} className={classes.header}>
        <Card sx={{ display: 'flex', gap: '0.8rem' }} pl={0} component={Link} to={AppRoutes.ROOT}>
          <Logo />
          <Title order={1} fz="24px" fw={600} lts="-0.04em" sx={{ fontFamily: 'Poppins' }}>
            Jobored
          </Title>
        </Card>

        <MediaQuery largerThan="xs" styles={{ display: 'none' }}>
          <Menu shadow="md" width={220}>
            <Menu.Target>
              <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="sm" mr="xl" />
            </Menu.Target>
            <Menu.Dropdown>{navLinks}</Menu.Dropdown>
          </Menu>
        </MediaQuery>

        <Group w="63.3%" noWrap className={classes.navLinks}>
          {navLinks}
        </Group>
      </Container>
    </Header>
  );
}
