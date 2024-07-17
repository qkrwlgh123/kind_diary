import { useEffect, useRef, useState } from "react";
import Style from "./barGraphComponent.style";
import { getAchievementRateBgColor } from "../../../../utils/colorUtils";
import theme from "../../../../styles/layout/themes";

const BarGraphComponent = ({
  title,
  progressRate,
  index,
}: {
  title?: string;
  progressRate: number;
  index?: number;
}) => {
  /** 0부터 prgressRate까지 count하기 위한 변수 */
  const [countNumber, setCountNumber] = useState(0);

  /** countNumber 증가시키는 타이머를 참조할 useRef */
  const timerRef = useRef<number | null>(null);

  /** countNumber를 일정 시간간격 뒤 증가시키는 함수 */
  const handleCountUpNumber = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setCountNumber((prev) => prev + 1);
    }, 10);
  };

  useEffect(() => {
    if (countNumber === progressRate) return;
    handleCountUpNumber();
  }, [progressRate, countNumber]);

  useEffect(() => {
    /** countNumber 증가 타이머 클린업 */
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <Style.BarComponentContainer>
      <Style.TitleBox>
        <span>{title}</span>
      </Style.TitleBox>
      <Style.ProgressContainer>
        <Style.ProgressBar
          $progressRate={progressRate}
          $bgColor={
            index
              ? getAchievementRateBgColor(index)
              : theme.commonColor.rateBgColor
          }
        />
      </Style.ProgressContainer>
      <Style.ProgressTextBox>
        <span>{countNumber}%</span>
      </Style.ProgressTextBox>
    </Style.BarComponentContainer>
  );
};

export default BarGraphComponent;
