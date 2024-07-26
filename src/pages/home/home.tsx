import { useEffect, useState } from "react";
import CalendarComponent from "../../components/calendar/calendar";
import Todo from "../../components/toDo/toDo";
import Style from "./home.style";
import {
  convertDateToMonthString,
  convertDateToString,
} from "../../utils/dateUitls";
import AchievementResult from "../../components/modal/achievementResult/achievementResult";

const Home = () => {
  /**
   * 목표 리스트 데이터 호출을 위한 변수 및 함수
   * ====================
   */

  /** 현재 선택된 연-월 => 월 별 목표 리스트 서버 호출 */
  const [currentMonth, setCurrentMonth] = useState(
    convertDateToMonthString(new Date())
  );

  /** 현재 선택된 연-월-일 => 일자 별 목표 리스트 업데이트 */
  const [currentDate, setCurrentDate] = useState(
    convertDateToString(new Date())
  );

  /** 월 선택에 따른 current Month 갱신 함수 */
  const handleChangeMonthInCalendar = (date: Date) => {
    setCurrentMonth(convertDateToMonthString(date));
  };

  /** 일자 선택에 따른 current Date 갱신 함수 */
  const handleClickDateInCalendar = (date: Date) => {
    setCurrentDate(convertDateToString(date));
  };

  /**
   * ====================
   */

  /**
   * 토요일 팝업 영역
   * ====================
   */

  /** 토요일 팝업, 이번 주 성취 결과 Mdoal on, off 상태 */
  const [isAchievementResultModalOpen, setIsAchievementResultModalOpen] =
    useState(false);

  /** 이번 주 성취 결과 Modal on, off control 함수 */
  const handleControlAchievementResultModal = () => {
    setIsAchievementResultModalOpen((prev) => !prev);
  };

  /** 매주 토요일, 성취 결과 팝업 on Effect */
  useEffect(() => {
    const todayDateObject = new Date();
    if (todayDateObject.getDay() === 6) {
      const popupFlagInLocalstorage = localStorage.getItem("popup_flag");
      if (!popupFlagInLocalstorage) {
        handleControlAchievementResultModal();
        localStorage.setItem("popup_flag", "alreadyRendered");
      }
      return;
    }
    localStorage.removeItem("popup_flag");
  }, []);

  /**
   * ====================
   */

  return (
    <>
      {/* 토요일 팝업, 이번 주 성취 결과 */}
      <AchievementResult
        isAchievementResultModalOpen={isAchievementResultModalOpen}
        handleControlAchievementResultModal={
          handleControlAchievementResultModal
        }
      />

      <Style.Container>
        <CalendarComponent
          currentMonth={currentMonth}
          handleChangeMonthInCalendar={handleChangeMonthInCalendar}
          handleClickDateInCalendar={handleClickDateInCalendar}
        />
        <Todo currentMonth={currentMonth} currentDate={currentDate} />
      </Style.Container>
    </>
  );
};

export default Home;
