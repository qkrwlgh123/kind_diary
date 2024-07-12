import { useEffect, useState } from "react";
import { generalResultMessage } from "../../../../asset/message/messageByAcheivementResult";
import BarGraphComponent from "../barGraphComponent/barGraphComponent";
import {
  MessageContainer,
  ResultContainer,
  TitleContainer,
} from "../commonStyle";

const GeneralAchievementResult = ({
  generalAchievementResult,
  handleFlipPage,
}: {
  generalAchievementResult: null | number;
  handleFlipPage?: () => void;
}) => {
  /** 하단 피드백 메세지 */
  const [feedbackMessage, setFeedbackMessage] = useState("");

  /** 달성률에 따른 피드백 메세지로 갱신 Effect(트랜지션 적용을 위해 지연시간 적용) */
  useEffect(() => {
    setTimeout(() => {
      if (generalAchievementResult) {
        if (generalAchievementResult < 80) {
          setFeedbackMessage(generalResultMessage.lessThanEighty);
        } else if (
          generalAchievementResult >= 80 &&
          generalAchievementResult < 90
        ) {
          setFeedbackMessage(generalResultMessage.moreThanEighty);
        } else if (
          generalAchievementResult >= 80 &&
          generalAchievementResult < 100
        ) {
          setFeedbackMessage(generalResultMessage.moreThanNinety);
        } else if (generalAchievementResult === 100) {
          setFeedbackMessage(generalResultMessage.perfect);
        }
      }
    }, 1000);
  }, [generalAchievementResult]);

  return (
    <ResultContainer onClick={handleFlipPage}>
      <TitleContainer>
        <h2>이번 주 전체 달성률</h2>
      </TitleContainer>
      <BarGraphComponent
        progressRate={generalAchievementResult ? generalAchievementResult : 0}
      />
      <MessageContainer
        $animationText={generalAchievementResult ? true : false}
      >
        {feedbackMessage}
      </MessageContainer>
    </ResultContainer>
  );
};

export default GeneralAchievementResult;
