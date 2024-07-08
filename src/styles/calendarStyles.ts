import { createGlobalStyle } from "styled-components";

const CalendarStyle = createGlobalStyle`
  .react-calendar {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 100%;
    background-color: ${({ theme }) => theme.calendarBackground};
    border: none;
  }

  .react-calendar * {
    color: ${({ theme }) => theme.calendarColor};
  }

  .react-calendar__tile {
    display: flex;
    flex-direction: column;
  }  

  .react-calendar__tile:hover {
    background-color: ${({ theme }) =>
      theme.calendarHoverBackground} !important;
  }  
  
  .react-calendar__tile--now {
    background-color: ${({ theme }) => theme.calendarTodayBackground};
  }

  .react-calendar__tile--active {
    background-color: ${({ theme }) =>
      theme.calendarActiveBackground} !important;
  }
`;

export default CalendarStyle;
