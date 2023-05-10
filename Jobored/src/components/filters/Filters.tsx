import { Group, Title, Button } from "@mantine/core";
import { CloseIcon } from "./_closeIcon";
import FilterBranch from "./FilterBranch";
import FilterSalary from "./FilterSalary";
import { vacancies } from "../../requests/vacancies";
import { token } from "../../requests/token";

export default function Filters() {
  console.log("token", token)
  console.log("vacancies", vacancies)
  return (
    <>
      <Group style={{ justifyContent: "space-between" }}>
        <Title order={3} fz="lg">
          Фильтры
        </Title>
        <Button color="gray.5" rightIcon={<CloseIcon />} variant="white">
          Сбросить все
        </Button>
      </Group>
      <form action="">
        <FilterBranch />
        <FilterSalary />
        <Button
          type="submit"
          w="100%"
          bg="#5E96FC"
          fw={500}
          sx={{ fontFamily: "Inter-Regular" }}
        >
          Применить
        </Button>
      </form>
    </>
  );
}
