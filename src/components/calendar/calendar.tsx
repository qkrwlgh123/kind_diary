import Style from "./calendar.style";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { handleRequestObjectList } from "../../api/object/list";
import { handleChangeYearMonthInCalendar } from "../../function/calendar";

const CalendarComponent = ({
  currentMonth,
  handleChangeMonthInCalendar,
  handleClickDateInCalendar,
}: {
  currentMonth: string;
  handleChangeMonthInCalendar: (date: Date) => void;
  handleClickDateInCalendar: (date: Date) => void;
}) => {
  /** 현재 캘린더 내 보여지는 연-월 => 월 별 목표리스트 서버 호출 및 캘린더 내 리스트 렌더링 */
  const [currentMonthToRenderInCalendar, setCurrentMonthToRenderInCalendar] =
    useState<string>(convertDateToMonthString(new Date()));

  /** 캘린더 내 연-월에 해당하는 목표를 렌더링 하기 위한 useQuery 호출, [캐시 옵션: 30분] */
  const { data } = useQuery<{ code: number; data: ObjectQueryResult[] }>({
    queryKey: ["MonthlyData", currentMonthToRenderInCalendar],
    queryFn: () => handleRequestObjectList(currentMonthToRenderInCalendar),
    staleTime: 30 * 60 * 1000,
  });

  /** 일자 변경 함수, [월 변경될 경우 현재 월 갱신] */
  const handleClickDate = (value: Date) => {
    /** 선택된 일자의 연-월이 현재 연-월(currentMonth)과 다른 경우, 현재 월 덥데이트 */
    const clickedMonth = convertDateToMonthString(value);

    if (currentMonth !== clickedMonth) handleChangeMonthInCalendar(value);
    handleClickDateInCalendar(value);
  };

  return (
    <Style.CalendarContainer>
      <Calendar
        onActiveStartDateChange={(object: StartDateChangeInterface) =>
          handleChangeYearMonthInCalendar(
            object,
            setCurrentMonthToRenderInCalendar
          )
        }
        onClickDay={(value: Date) => handleClickDate(value)}
        tileContent={(object: TileContentInterface) => (
          <TileContent
            list={(data?.data ?? []).filter(
              (eachObject: ObjectQueryResult) =>
                eachObject.date === convertDateToString(object.date)
            )}
          />
        )}
        calendarType="gregory"
        formatDay={(locale: string | undefined, date: Date) =>
          String(date.getDate())
        }
        showNeighboringMonth={false}
      />
    </Style.CalendarContainer>
  );
};

export default CalendarComponent;
