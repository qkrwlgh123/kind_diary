import Style from "./calendar.style";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import {
  convertDateToMonthString,
  convertDateToString,
} from "../../utils/dateUitls";
import { ObjectQueryResult } from "../../types/queryResult/objectList";
import TileContent from "./tileContent/tileContent";
import {
  StartDateChangeInterface,
  TileContentInterface,
} from "../../types/calendar";

const CalendarComponent = ({
  currentMonth,
  handleChangeMonthToRenderhInCalendar,
  wholeObjectListToRenderInCalendar,
  handleChangeMonthInCalendar,
  handleClickDateInCalendar,
}: {
  currentMonth: string;
  wholeObjectListToRenderInCalendar: ObjectQueryResult[];
  handleChangeMonthToRenderhInCalendar: (date: Date) => void;
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

  /** 캘린더 내 목표 리스트 렌더링을 위한 연-월 상태 변경 함수 */
  const handleChangeYearMonthInCalendar = (
    object: StartDateChangeInterface
  ) => {
    if (object.activeStartDate) {
      handleChangeMonthToRenderhInCalendar(object.activeStartDate);
    }
  };

  return (
    <Style.CalendarContainer>
      <Calendar
        onActiveStartDateChange={handleChangeYearMonthInCalendar}
        onClickDay={(value) => handleClickDate(value)}
        tileContent={(object: TileContentInterface) => (
          <TileContent
            list={wholeObjectListToRenderInCalendar.filter(
              (eachObject: ObjectQueryResult) =>
                eachObject.date === convertDateToString(object.date)
            )}
          />
        )}
        calendarType="gregory"
      />
    </Style.CalendarContainer>
  );
};

export default CalendarComponent;
