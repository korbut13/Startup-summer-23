import { UseStyles } from './styles';

export default function getStyleName(vacancyParam: string) {
  const { classes } = UseStyles();
  if (window.location.href.includes('vacancy')) {
    switch (vacancyParam) {
      case 'paper':
        return classes.vacancyPaper;
      case 'profession':
        return classes.vacancyProfession;
      case 'payment':
        return classes.vacancyPayment;
      case 'typeOfWork':
        return classes.vacancyTypeOfWork;
      case 'iconAndTown':
        return classes.vacancyIconAndTown;
      case 'town':
        return classes.vacancyTown;
      default:
        return classes.vacancyTown;
    }
  } else {
    switch (vacancyParam) {
      case 'paper':
        return classes.vacanciesPaper;
      case 'profession':
        return classes.vacanciesProfession;
      case 'payment':
        return classes.vacanciesPayment;
      case 'typeOfWork':
        return classes.vacanciesTypeOfWork;
      case 'iconAndTown':
        return classes.vacanciesIconAndTown;
      case 'town':
        return classes.vacanciesTown;
      default:
        return classes.vacancyTown;
    }
  }
}
