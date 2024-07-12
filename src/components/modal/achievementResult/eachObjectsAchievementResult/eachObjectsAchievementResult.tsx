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

const EachObjectsAchievementResult = ({
  eachObjectsAchievementResult,
  handleFlipPage,
}: {
  eachObjectsAchievementResult: EachObjectAchievementResultInterface[];
  handleFlipPage: () => void;
}) => {
  const [lessThanEightyListStr, setLessThanEightyListStr] = useState("");

  const [delayedProgressRate, setDelayedProgressRate] = useState<number[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setDelayedProgressRate(
        eachObjectsAchievementResult.map((object) => object.completedRate)
      );
    }, 300);

    setTimeout(() => {
      setLessThanEightyListStr(
        eachObjectsAchievementResult
          .filter((achieveResult) => achieveResult.completedRate < 80)
          .map((result) => result.object)
          .join(", ")
      );
    }, 1000);
  }, [eachObjectsAchievementResult]);

  return (
    <ResultContainer onClick={handleFlipPage}>
      <TitleContainer>
        <h2>이번 주 목표별 달성률</h2>
      </TitleContainer>
      <Style.ResultListContainer>
        {eachObjectsAchievementResult.map((achievementResult, index) => (
          <BarGraphComponent
            key={achievementResult.object}
            title={achievementResult.object}
            progressRate={
              delayedProgressRate[index] ? delayedProgressRate[index] : 0
            }
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
