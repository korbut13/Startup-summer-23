const fontInter = {
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 400,
}
const fontInterBold = {
  fontFamily: "InterBold",
  fontWeight: 700,
}

import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  header: {
    margin: "0 auto",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  navLinks: {
    [theme.fn.smallerThan("xs")]: {
      display: "none"
    }
  },
  link: {
    width: "24.4%",
    [theme.fn.smallerThan("md")]: {
      width: "50%",
    },
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
    }
  },
  container: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    gap: "28px",
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    }
  },
  containerPages: {
    margin: "0 auto",
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  initFilters: {
    [theme.fn.smallerThan("sm")]: {
      display: "none"
    }
  },
  searchButton: {
    position: "absolute",
    top: "8px",
    right: "12px",
    background: "#5E96FC",
    borderRadius: "8px",
    border: "none",
    padding: "0px 20px",
    height: "31px",
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 500,
    [theme.fn.smallerThan("xs")]: {
      padding: "0px 5px"
    }
  },
  openFilters: {
    width: "100%",
    background: "#5E96FC",
    [theme.fn.largerThan("sm")]: {
      display: "none"
    }
  },
  filtersBox: {
    backgroundColor: 'white',
    textAlign: 'center',
    padding: "18px 20px",
    borderRadius: theme.radius.md,
    border: '1px solid #EAEBED',
    width: '274px',
    maxHeight: 320,
    [theme.fn.smallerThan("sm")]: {
      width: '90%',
      margin: "0 auto"
    }
  },
  select: {
    label: {
      ...fontInterBold,
      fontSize: "16px",
      lineHeight: "18px",
      marginBottom: "9px"
    },
    input: {
      borderRadius: "8px",
      height: "42px",
      marginBottom: "17px",
      fontFamily: "Inter",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "20px",
    },
    [theme.fn.smallerThan("sm")]: {

    }
  },
  resetFilters: {
    color: "#ACADB9",
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "20px",
    paddingRight: "0px",
    height: "auto"
  },
  numberInputFrom: {
    label: {
      ...fontInterBold,
      fontSize: "16px",
      lineHeight: "19px",
      marginBottom: "8px"
    },
    input: {
      borderRadius: "8px",
      marginBottom: "8px",
      height: "42px",
      fontFamily: "Inter",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "20px",
    }
  },
  vacancyPaper: {
    borderRadius: "12px",
    border: "1px solid #EAEBED",
    marginBottom: "19px",
    padding: "23px 22px 23px 23px",
  },
  vacanciesPaper: {
    borderRadius: "12px",
    border: "1px solid #EAEBED",
    marginBottom: "16px",
    padding: "23px 22px 23px 22px",
  },
  group: {
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'start',
  },
  vacancyProfession: {
    ...fontInterBold,
    fontSize: "28px",
    lineHeight: "34px",
    color: "black",
    marginBottom: "16px",
    [theme.fn.smallerThan("xs")]: {
      fontSize: "20px",
      lineHeight: "30px",
      marginBottom: "8px"
    }
  },
  vacanciesProfession: {
    fontFamily: "Inter",
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: "24px",
    letterSpacing: "0.2px",
    color: "#5E96FC",
    marginBottom: "14px",
    [theme.fn.smallerThan("xs")]: {
      fontSize: "15px",
      marginBottom: "8px",
    }
  },
  vacancyIconAndTown: {
    marginTop: "16.7px",
    gap: "8px",
    [theme.fn.smallerThan("xs")]: {
      gap: "3px",
      marginBottom: "10px",
    }
  },
  vacanciesIconAndTown: {
    marginTop: "12px",
    gap: "8px",
    [theme.fn.smallerThan("xs")]: {
      gap: "3px",
      marginBottom: "8px",
    }
  },
  vacancyPayment: {
    ...fontInterBold,
    fontSize: "20px",
    lineHeight: "20px",
    [theme.fn.smallerThan("xs")]: {
      fontSize: "15px",
    }
  },
  vacanciesPayment: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "20px",
    letterSpacing: "0.2px",
    [theme.fn.smallerThan("xs")]: {
      fontSize: "14px",
    }
  },
  vacancyTypeOfWork: {
    fontFamily: "Inter",
    fontSize: "20px",
    fontWeight: 400,
    lineHeight: "20px",
  },
  vacanciesTypeOfWork: {
    ...fontInter,
    lineHeight: "20px",
    letterSpacing: "0.1px",
    [theme.fn.smallerThan("xs")]: {
      fontSize: "14px",
    }
  },
  vacancyTown: {
    ...fontInter,
    lineHeight: "140%",
  },
  vacanciesTown: {
    ...fontInter,
    lineHeight: "20px"
  },
  vacancyDescription: {
    b: {
      ...fontInterBold,
      fontSize: "20px",
      margin: "0px",
      [theme.fn.smallerThan("xs")]: {
        fontSize: "14px",
      }
    },
    p: {
      ...fontInter,
      margin: "0px",
      [theme.fn.smallerThan("xs")]: {
        fontSize: "14px",
      }
    },
    border: "1px solid #EAEBED",
    borderRadius: "12px",
    background: "white",
    padding: "24px",
    ...fontInter,
    lineHeight: "22.4px",
    [theme.fn.smallerThan("xs")]: {
      fontSize: "14px",
      padding: "15px",
    }
  },
}));
