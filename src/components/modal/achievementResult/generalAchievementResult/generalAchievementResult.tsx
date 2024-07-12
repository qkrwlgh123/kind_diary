import { useEffect, useState } from "react";
import { generalResultMessage } from "../../../../asset/message/messageByAcheivementResult";
import BarGraphComponent from "../barGraphComponent/barGraphComponent";
import {
  MessageContainer,
  ResultContainer,
  TitleContainer,
} from "../commonStyle";
import NextButtonComponent from "./nextButtonComponent/nextButtonComponent";

const GeneralAchievementResult = ({
  generalAchievementResult,
  handleFlipPage,
}: {
  generalAchievementResult: null | number;
  handleFlipPage: () => void;
}) => {
  /** 페이지가 렌더링 된 후, 지난 시간(렌더링된 후, 3초가 지나야 페이지 넘어가는 것이 가능) */
  const [isTimePassed, setIsTimePassed] = useState(false);

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

  /** 페이지 넘기기는 3초 후에 가능하도록 하는 Effect */
  useEffect(() => {
    setTimeout(() => {
      setIsTimePassed(true);
    }, 4000);
  }, []);

  return (
    <ResultContainer>
      <TitleContainer>
        <h2>이번 주 전체 달성률</h2>
      </TitleContainer>
      <BarGraphComponent
        progressRate={generalAchievementResult ? generalAchievementResult : 0}
      />
      <MessageContainer
        $animationText={generalAchievementResult ? true : false}
      >
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
