import styled from "styled-components";
import theme from "../../../../styles/layout/themes";

const BarComponentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const TitleBox = styled.div`
  width: 10%;
  font-size: 12px;
`;

const ProgressContainer = styled.div`
  width: 80%;
  height: 30px;
  margin: 0 30px 0 15px;
  background-color: ${theme.commonColor.white};
`;

const ProgressBar = styled.div<{ $progressRate: number; $bgColor: string }>`
  width: ${(props) => props.$progressRate}%;
  height: 100%;
  background-color: ${(props) => props.$bgColor};
  transition: width 1s ease;
`;

const ProgressTextBox = styled.div`
  width: 10%;
  font-size: 20px;
`;

export default {
  BarComponentContainer,
  TitleBox,
  ProgressContainer,
  ProgressBar,
  ProgressTextBox,
};
