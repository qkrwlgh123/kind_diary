import { StartDateChangeInterface } from "../types/calendar";
import { convertDateToMonthString } from "../utils/dateUitls";

/** 캘린더 내 목표 리스트 렌더링을 위한 연-월 상태 변경 함수 */
export const handleChangeYearMonthInCalendar = (
  object: StartDateChangeInterface,
  setStateFunc: React.Dispatch<React.SetStateAction<string>>
) => {
  if (object.activeStartDate) {
    setStateFunc(convertDateToMonthString(object.activeStartDate));
  }
};
