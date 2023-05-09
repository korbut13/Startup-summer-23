import { useState } from "react";
import { Container, Header, Group, Title, NavLink } from "@mantine/core";
import { Link } from "react-router-dom";
import { Logo } from "./_logo";

const dataLinks = [
  { label: "Поиск вакансий", path: "/" },
  { label: "Избранное", path: "/selected" },
];

export default function HeaderComponent() {
  const [active, setActive] = useState(0);
  return (
    <>
      <Header height={84} mb={40}>
        {
          <Container
            size={1116}
            mx="auto"
            py="xl"
            style={{ display: "flex", gap: 280 }}
          >
            <Group position="left">
              <Logo />
              <Title order={1} fz="lg" sx={{ fontFamily: "Poppins" }}>
                Jobored
              </Title>
            </Group>
            <Group position="left" style={{ gap: 60 }}>
              {dataLinks.map((link, index) => (
                <NavLink
                  component={Link}
                  to={link.path}
                  key={link.label}
                  active={index === active}
                  label={link.label}
                  onClick={() => setActive(index)}
                  variant="subtle"
                  w={150}
                  fw={500}
                  fz="md"
                  sx={{ fontFamily: "Inter-Regular" }}
                />
              ))}
            </Group>
          </Container>
        }
      </Header>
    </>
  );
}
