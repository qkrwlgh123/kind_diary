/** Date 객체 => 연-월-일 문자열로 변환 */
export const convertDateToString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/** Date 객체 => 연-월 문자열로 변환 */
export const convertDateToMonthString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  return `${year}-${month}`;
};

const isSameDate = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/** 연-월-일 문자열 => 년 월 일 요일 문자열로 변환 */
export const convertDateToFullDateString = (dateStr: string) => {
  const date = new Date(dateStr);

  const todayDate = new Date();

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${
    isSameDate(date, todayDate) ? "[Today]" : ""
  } ${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
};
