import theme from "../styles/layout/themes";

/** 순서에 따른 목표별 색상 부여 */
export const getObjectBgColor = (index: number) => {
  switch (index) {
    case 0:
      return theme.objectBgColor.first;
    case 1:
      return theme.objectBgColor.second;
    case 2:
      return theme.objectBgColor.third;
    case 3:
      return theme.objectBgColor.fourth;
    case 4:
      return theme.objectBgColor.fifth;
    case 5:
      return theme.objectBgColor.sixth;
    case 6:
      return theme.objectBgColor.seventh;
  }
};

/** 순서에 따른 목표 달성률 색상 부여 */
export const getAchievementRateBgColor = (index: number) => {
  switch (index) {
    case 0:
      return theme.achievementBgColor.first;
    case 1:
      return theme.achievementBgColor.second;
    case 2:
      return theme.achievementBgColor.third;
    case 3:
      return theme.achievementBgColor.fourth;
    case 4:
      return theme.achievementBgColor.fifth;
    case 5:
      return theme.achievementBgColor.sixth;
    case 6:
      return theme.achievementBgColor.seventh;
    case 7:
      return theme.achievementBgColor.eighth;
    case 8:
      return theme.achievementBgColor.nineth;
    case 9:
      return theme.achievementBgColor.tenth;
    case 10:
      return theme.achievementBgColor.eleventh;
  }
};
