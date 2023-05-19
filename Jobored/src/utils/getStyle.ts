import { useStyles } from "./styles";

export default function getStyle(vacancyParam: string) {
  const { classes } = useStyles();
  if (window.location.href.includes('vacancy')) {
    switch (vacancyParam) {
      case "profession":
        return classes.vacancyProfession;
        break;
      case "payment":
        return classes.vacancyPayment;
        break;
      case "typeOfWork":
        return classes.vacancyTypeOfWork;
        break;
      case "town":
        return classes.vacancyTown;
        break;
      default:
        return classes.vacancyTown
    }
  } else {
    switch (vacancyParam) {
      case "profession":
        return classes.vacanciesProfession;
        break;
      case "payment":
        return classes.vacanciesPayment;
        break;
      case "typeOfWork":
        return classes.vacanciesTypeOfWork;
        break;
      case "town":
        return classes.vacanciesTown;
        break;
      default:
        return classes.vacancyTown
    }
  }
}
