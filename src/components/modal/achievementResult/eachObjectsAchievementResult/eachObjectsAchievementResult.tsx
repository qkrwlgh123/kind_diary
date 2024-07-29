import { useEffect, useState } from "react";
import { eachObjectsResultMessage } from "../../../../asset/message/messageByAcheivementResult";
import BarGraphComponent from "../barGraphComponent/barGraphComponent";
import {
  MessageContainer,
  ResultContainer,
  TitleContainer,
} from "../commonStyle";
import Style from "./eachObjectsAchievementResult.style";
import { EachObjectAchievementResultInterface } from "../../../../types/achievementResult";
import { convertDateToString } from "../../../../utils/dateUitls";
import { useQuery } from "@tanstack/react-query";
import { handleRequestEachObjectsAchievementResult } from "../../../../api/achievementResult/eachObjectsResult";

const EachObjectsAchievementResult = () => {
  /** 오늘 날짜 문자열 변환 */
  const todayDate = convertDateToString(new Date());

  /** 목표별 달성률을 렌더링 하기 위한 useQuery 호출, [캐시 옵션: 0] */
  const { data } = useQuery<{
    code: number;
    data: EachObjectAchievementResultInterface[];
  }>({
    queryKey: ["EachObjectsAchievement", todayDate],
    queryFn: () => handleRequestEachObjectsAchievementResult(todayDate),
    staleTime: 0,
    enabled: new Date().getDay() === 6,
  });

  /** 달성률 80퍼센트 이하인 목표들을 하나의 문자열로 join */
  const [lessThanEightyListStr, setLessThanEightyListStr] = useState("");

  /** Progress Bar에 트랜지션 속성을 부여하기 위해, 달성률을 일정 지연 시간(300ms) 이후 업데이트 */
  const [delayedProgressRate, setDelayedProgressRate] = useState<number[]>([]);

  /** 쿼리 응답이 정상적이면, 각각 300ms, 1000ms의 지연시간 이후 달성률 및 피드백 메세지 업데이트 */
  useEffect(() => {
    if (data) {
      const delayProgressRateTimer = window.setTimeout(() => {
        setDelayedProgressRate(
          data?.data.map((object) => object.completedRate)
        );
      }, 300);

      const setFeedbackMessageTimer = window.setTimeout(() => {
        setLessThanEightyListStr(
          data?.data
            .filter((achieveResult) => achieveResult.completedRate < 80)
            .map((result) => result.object)
            .join(", ")
        );
      }, 1000);

      return () => {
        clearTimeout(delayProgressRateTimer);
        clearTimeout(setFeedbackMessageTimer);
      };
    }
  }, [data]);

  return (
    <ResultContainer>
      <TitleContainer>
        <h2>이번 주 목표별 달성률</h2>
      </TitleContainer>

      <Style.ResultListContainer>
        {data?.data.map((achievementResult, index) => (
          <BarGraphComponent
            key={achievementResult.object}
            title={achievementResult.object}
            progressRate={
              delayedProgressRate[index] ? delayedProgressRate[index] : 0
            }
            index={index}
          />
        ))}
      </Style.ResultListContainer>

      <MessageContainer $animationText={lessThanEightyListStr.length > 0}>
        {lessThanEightyListStr + eachObjectsResultMessage.lessThanEighty}
      </MessageContainer>
    </ResultContainer>
  );
};

export default EachObjectsAchievementResult;
