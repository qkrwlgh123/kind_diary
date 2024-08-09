import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import CalendarComponent from "../../components/calendar/calendar";
import Todo from "../../components/toDo/toDo";
import Style from "./home.style";
import {
  convertDateToMonthString,
  convertDateToString,
} from "../../utils/dateUitls";
import AchievementResult from "../../components/modal/achievementResult/achievementResult";
import useAuthStore from "../../store/authStore";

const Home = forwardRef(
  (
    {
      handleUpdateRectValueOfContentsComponent,
    }: {
      handleUpdateRectValueOfContentsComponent: (rectValue: number) => void;
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    /** 사용자 이름 전역 상태 */
    const { username } = useAuthStore();

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
        const popupFlagInLocalstorage = localStorage.getItem(
          `popup_flag_${username}`
        );
        if (!popupFlagInLocalstorage) {
          handleControlAchievementResultModal();
          localStorage.setItem(`popup_flag_${username}`, "alreadyRendered");
        }
        return;
      }
      localStorage.removeItem(`popup_flag_${username}`);
    }, []);

    /**
     * ====================
     */

    /** 스크롤 위치에 따라 본문 컴포넌트의 Top rect value를 업데이트하는 effect */
    useEffect(() => {
      const rect = ref;

      if (rect && typeof rect !== "function" && rect.current) {
        handleUpdateRectValueOfContentsComponent(
          rect.current.getBoundingClientRect().top
        );
      }

      const handleScroll = () => {
        if (rect && typeof rect !== "function" && rect.current) {
          handleUpdateRectValueOfContentsComponent(
            rect.current.getBoundingClientRect().top
          );
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return (
      <>
        {/* 토요일 팝업, 이번 주 성취 결과 */}
        <AchievementResult
          isAchievementResultModalOpen={isAchievementResultModalOpen}
          handleControlAchievementResultModal={
            handleControlAchievementResultModal
          }
        />

        <Style.Container ref={ref}>
          <CalendarComponent
            currentMonth={currentMonth}
            handleChangeMonthInCalendar={handleChangeMonthInCalendar}
            handleClickDateInCalendar={handleClickDateInCalendar}
          />
          <Todo currentMonth={currentMonth} currentDate={currentDate} />
        </Style.Container>
      </>
    );
  }
);

export default Home;
