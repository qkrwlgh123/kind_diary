import Style from "./calendar.style";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

const CalendarComponent = () => {
  return (
    <Style.CalendarContainer>
      <Calendar onClickDay={(value) => alert(value)} calendarType="gregory" />
    </Style.CalendarContainer>
  );
};

export default CalendarComponent;
