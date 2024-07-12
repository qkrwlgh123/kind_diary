import styled from "styled-components";

export const ResultContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const TitleContainer = styled(TextContainer)`
  font-size: 15px;
  margin-bottom: 80px;
`;

export const MessageContainer = styled(TextContainer)<{
  $animationText: boolean;
}>`
  font-size: 20px;
  margin-top: 80px;
  margin-bottom: 50px;
  opacity: ${(props) => (props.$animationText ? 1 : 0)};
  transition: opacity 10s ease;
  height: 10px;
  white-space: pre-line;
`;
