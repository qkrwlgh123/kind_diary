import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  light: {
    backgroundColor: "#D4F0F0",
    fontColor: "#222222",

    buttonBgColor: "#dbead5",
    modalBgColor: "#ffffff",

    calendarBackground: "#ffffff",
    calendarColor: "#222222",
    calendarTodayBackground: "#ffff76",
    calendarHoverBackground: "",
    calendarActiveBackground: "",

    todoComponentBgColor: "azure",

    skeletonBackground: "#E2E2E2",
  },

  dark: {
    backgroundColor: "#121212",
    fontColor: "#ffffff",
    buttonBgColor: "#212529",
    modalBgColor: "#282828",

    calendarBackground: "#000000",
    calendarColor: "#ffffff",
    calendarTodayBackground: "#212529",
    calendarHoverBackground: "#2A303E",
    calendarActiveBackground: "#2A303E",

    todoComponentBgColor: "",

    skeletonBackground: "#3f3f3f",
  },

  objectBgColor: {
    first: "#7367F0",
    second: "#32CCBC",
    third: "#EA5455",
    fourth: "green",
    fifth: "purple",
    sixth: "#744524",
    seventh: "#C89898",
  },

  achievementBgColor: {
    first: "#7367F0",
    second: "#32CCBC",
    third: "#EA5455",
    fourth: "green",
    fifth: "purple",
    sixth: "#744524",
    seventh: "#C89898",
    eighth: "#881616",
    nineth: "#A55959",
    tenth: "#C0DDD0",
    eleventh: "#F6B488",
  },

  commonColor: {
    white: "#ffffff",
    blue: "#3B81F6",
    rateBgColor: "#3473a0",
  },
};

export default theme;
