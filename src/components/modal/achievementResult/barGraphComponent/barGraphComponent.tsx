import { useEffect, useState } from "react";
import Style from "./barGraphComponent.style";

const BarGraphComponent = ({
  title,
  progressRate,
}: {
  title?: string;
  progressRate: number;
}) => {
  /** 0부터 prgressRate까지 count하기 위한 변수 */
  const [countNumber, setCountNumber] = useState(0);

  /** countNumber를 일정 시간간격 뒤 증가시키는 함수 */
  const handleCountUpNumber = () => {
    setTimeout(() => {
      setCountNumber((prev) => prev + 1);
    }, 10);
  };

  useEffect(() => {
    if (countNumber === progressRate) return;
    handleCountUpNumber();
  }, [progressRate, countNumber]);
  return (
    <Style.BarComponentContainer>
      <Style.TitleBox>
        <span>{title}</span>
      </Style.TitleBox>
      <Style.ProgressContainer>
        <Style.ProgressBar $progressRate={progressRate} />
      </Style.ProgressContainer>
      <Style.ProgressTextBox>
        <span>{countNumber}%</span>
      </Style.ProgressTextBox>
    </Style.BarComponentContainer>
  );
};

export default BarGraphComponent;
