import { useEffect, useState } from "react";
import { generalResultMessage } from "../../../../asset/message/messageByAcheivementResult";
import BarGraphComponent from "../barGraphComponent/barGraphComponent";
import {
  MessageContainer,
  ResultContainer,
  TitleContainer,
} from "../commonStyle";
import NextButtonComponent from "./nextButtonComponent/nextButtonComponent";
import { useQuery } from "@tanstack/react-query";
import { handleRequestGeneralAchievementResult } from "../../../../api/achievementResult/generalResult";
import { convertDateToString } from "../../../../utils/dateUitls";

const GeneralAchievementResult = ({
  handleFlipPage,
}: {
  handleFlipPage: () => void;
}) => {
  /** 오늘 날짜 문자열 변환 */
  const todayDate = convertDateToString(new Date());

  /** 종합 달성률을 렌더링 하기 위한 useQuery 호출, [캐시 옵션: 0] */
  const { data } = useQuery<{ code: number; data: number }>({
    queryKey: ["GeneralAchievement", todayDate],
    queryFn: () => handleRequestGeneralAchievementResult(todayDate),
    staleTime: 0,
    enabled: new Date().getDay() === 6,
  });

  /** 페이지가 렌더링 된 후, 지난 시간(렌더링된 후, 3초가 지나야 페이지 넘어가는 것이 가능) */
  const [isTimePassed, setIsTimePassed] = useState(false);

  /** 하단 피드백 메세지 */
  const [feedbackMessage, setFeedbackMessage] = useState("");

  /** 달성률에 따른 피드백 메세지 갱신 Effect (Progress bar의 애니메이션이 끝난 후 렌더링, 1000ms 지연시간 적용) */
  useEffect(() => {
    const setFeedbackMessageTimer = window.setTimeout(() => {
      if (data) {
        if (data.data < 80) {
          setFeedbackMessage(generalResultMessage.lessThanEighty);
        } else if (data.data >= 80 && data.data < 90) {
          setFeedbackMessage(generalResultMessage.moreThanEighty);
        } else if (data.data >= 80 && data.data < 100) {
          setFeedbackMessage(generalResultMessage.moreThanNinety);
        } else if (data.data === 100) {
          setFeedbackMessage(generalResultMessage.perfect);
        }
      }
    }, 1000);

    return () => clearTimeout(setFeedbackMessageTimer);
  }, [data]);

  /** 페이지 넘기기는 3초 후에 가능하도록 하는 Effect */
  useEffect(() => {
    const setTimePassedTimer = window.setTimeout(() => {
      setIsTimePassed(true);
    }, 4000);

    return () => clearTimeout(setTimePassedTimer);
  }, []);

  return (
    <ResultContainer>
      <TitleContainer>
        <h2>이번 주 전체 달성률</h2>
      </TitleContainer>
      <BarGraphComponent progressRate={data?.data ? data.data : 0} />
      <MessageContainer $animationText={data?.data ? true : false}>
        <span>{feedbackMessage}</span>
      </MessageContainer>
      <NextButtonComponent
        isTimePassed={isTimePassed}
        handleFlipPage={isTimePassed ? handleFlipPage : undefined}
      />
    </ResultContainer>
  );
};

export default GeneralAchievementResult;
