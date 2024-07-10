import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  light: {
    backgroundColor: "#95D2B3",
    fontColor: "#222222",
    buttonBgColor: "#dbead5",
    modalBgColor: "white",

    calendarBackground: "#ffffff",
    calendarColor: "#000000",
    calendarTodayBackground: "#ffff76",
    calendarHoverBackground: "",
    calendarActiveBackground: "",

    skeletonBackground: "#3f3f3f",
  },

  dark: {
    backgroundColor: "#121212",
    fontColor: "white",
    buttonBgColor: "#212529",
    modalBgColor: "#282828",

    calendarBackground: "#000000",
    calendarColor: "#ffffff",
    calendarTodayBackground: "#212529",
    calendarHoverBackground: "#2A303E",
    calendarActiveBackground: "#2A303E",

    skeletonBackground: "#3f3f3f",
  },

  objectFontColor: {
    first: "#7367F0",
    second: "#32CCBC",
    third: "#EA5455",
    fourth: "green",
    fifth: "purple",
    sixth: "#744524",
  },

  commonColor: {
    white: "#ffffff",
    blue: "#3B81F6",
  },
};

export default theme;
