import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Group, Title, NavLink, Header, Menu, Burger, MediaQuery } from "@mantine/core";
import { Logo } from "./_logo";
import { useStyles } from "../../utils/styles";

const dataLinks = [
  { label: 'Поиск Вакансий', path: '/' },
  { label: 'Избранное', path: '/favorites' },
];

export default function App() {
  const { classes } = useStyles();
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
      w="24.4%"
      lts="0.2px"
    />
  ))
  return (
    <Header height={87} mb={38} >
      <Container size={1116} className={classes.header}>
        <Card sx={{ display: "flex", gap: "0.8rem" }} pl={0} component="a" href="/">
          <Logo />
          <Title order={1} fz="24px" fw={600} lts="-0.04em" sx={{ fontFamily: 'Poppins' }}>
            Jobored
          </Title>
        </Card>
        <MediaQuery largerThan="xs" styles={{ display: "none" }}>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
              />
            </Menu.Target>
            <Menu.Dropdown>
              {navLinks}
            </Menu.Dropdown>
          </Menu>
        </MediaQuery>
        <Group w="63.3%" noWrap className={classes.navLinks} >
          {navLinks}
        </Group>
      </Container>
    </Header>
  );
}
