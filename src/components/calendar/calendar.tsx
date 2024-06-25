import Style from "./calendar.style";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import { convertDateToMonthString } from "../../utils/dateUitls";

const CalendarComponent = ({
  currentMonth,
  handleChangeMonthInCalendar,
  handleClickDateInCalendar,
}: {
  currentMonth: string;
  handleChangeMonthInCalendar: (date: Date) => void;
  handleClickDateInCalendar: (date: Date) => void;
}) => {
  /** 일자 변경 함수, 월 변경될 경우 현재 월 갱신 */
  const handleClickDate = (value: Date) => {
    /** 선택된 일자의 연-월이 현재 연-월(currentMonth)과 다른 경우, 현재 월 덥데이트 */
    const clickedMonth = convertDateToMonthString(value);

    if (currentMonth !== clickedMonth) handleChangeMonthInCalendar(value);
    handleClickDateInCalendar(value);
  };
  return (
    <Style.CalendarContainer>
      <Calendar
        onClickDay={(value) => handleClickDate(value)}
        calendarType="gregory"
      />
    </Style.CalendarContainer>
  );
};

export default CalendarComponent;
