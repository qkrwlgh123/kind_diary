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
  handleFlipPage: () => void;
}) => {
  const [feedbackMessage, setFeedbackMessage] = useState("");

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
