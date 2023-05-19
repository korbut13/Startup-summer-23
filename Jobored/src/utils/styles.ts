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
  openFilters: {
    width: "100%",
    background: "#5E96FC",
    [theme.fn.largerThan("sm")]: {
      display: "none"
    }
  },
  select: {
    label: {
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "18px",
      fontFamily: "InterBold",
      marginBottom: "9px"
    },
    input: {
      borderRadius: "8px",
      height: "42px",
      marginBottom: "17px",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
      fontFamily: "Inter",
    }
  },
  resetFilters: {
    color: "#ACADB9",
    fontWeight: 500,
    fontSize: "14px",
    fontFamily: "Inter",
    lineHeight: "20px",
    paddingRight: "0px",
    height: "auto"
  },
  numberInputFrom: {
    label: {
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "19px",
      fontFamily: "InterBold",
      marginBottom: "8px"
    },
    input: {
      borderRadius: "8px",
      marginBottom: "8px",
      height: "42px",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
      fontFamily: "Inter"
    }
  },
  paper: {
    borderRadius: "12px",
    border: "1px solid #EAEBED", marginBottom: "16px", padding: "23px 22px 21px 23px",
  },
  group: {
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'start',
  },
  vacancyProfession: {
    fontWeight: 700,
    fontSize: "28px",
    lineHeight: "34px",
    fontFamily: "InterBold",
    color: "black",
    marginBottom: "16px",
  },
  vacanciesProfession: {
    fontWeight: 600,
    fontSize: "20px",
    fontFamily: "Inter",
    letterSpacing: "0.2px",
    lineHeight: "24px",
    color: "#5E96FC",
    marginBottom: "13px"
  },
  vacancyPayment: {
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "20px",
    fontFamily: "InterBold"
  },
  vacanciesPayment: {
    fontWeight: 600,
    fontSize: "16px",
    letterSpacing: "0.2px",
    fontFamily: "Inter",
    lineHeight: "20px"
  },
  vacancyTypeOfWork: {
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "20px",
    fontFamily: "Inter"
  },
  vacanciesTypeOfWork: {
    fontWeight: 400,
    fontSize: "16px",
    letterSpacing: "0.1px",
    fontFamily: "Inter",
    lineHeight: "20px"
  },
  vacancyTown: {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "140%",
    fontFamily: "Inter"
  },
  vacanciesTown: {
    fontWeight: 400,
    fontSize: "16px",
    fontFamily: "Inter",
    lineHeight: "20px"
  },
  vacancyDescription: {
    b: {
      fontFamily: "InterBold",
      fontWeight: 700,
      fontSize: "20px",
      margin: "0px",
    },
    p: {
      fontFamily: "InterBold",
      fontWeight: 700,
      fontSize: "20px",
      margin: "0px",
    },
    border: "1px solid #EAEBED",
    borderRadius: "12px",
    background: "white",
    padding: "24px",
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "22.4px"
  },
}));
