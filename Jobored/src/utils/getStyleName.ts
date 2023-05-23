import { UseStyles } from './styles';

export default function getStyleName(vacancyParam: string) {
  const { classes } = UseStyles();
  if (window.location.href.includes('vacancy')) {
    switch (vacancyParam) {
      case 'paper':
        return classes.vacancyPaper;
        break;
      case 'profession':
        return classes.vacancyProfession;
        break;
      case 'payment':
        return classes.vacancyPayment;
        break;
      case 'typeOfWork':
        return classes.vacancyTypeOfWork;
        break;
      case 'iconAndTown':
        return classes.vacancyIconAndTown;
        break;
      case 'town':
        return classes.vacancyTown;
        break;
      default:
        return classes.vacancyTown;
    }
  } else {
    switch (vacancyParam) {
      case 'paper':
        return classes.vacanciesPaper;
        break;
      case 'profession':
        return classes.vacanciesProfession;
        break;
      case 'payment':
        return classes.vacanciesPayment;
        break;
      case 'typeOfWork':
        return classes.vacanciesTypeOfWork;
        break;
      case 'iconAndTown':
        return classes.vacanciesIconAndTown;
        break;
      case 'town':
        return classes.vacanciesTown;
        break;
      default:
        return classes.vacancyTown;
    }
  }
}