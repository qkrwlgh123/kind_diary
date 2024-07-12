import styled, { keyframes } from "styled-components";

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const ButtonContainer = styled.div<{ $isVisible: boolean }>`
  font-size: 18px;
  margin-top: 30px;
  animation: ${blink} 2s infinite;
  text-align: center;
  visibility: ${(props) => (props.$isVisible ? "visible" : "hidden")};
  span {
    cursor: pointer;
  }
`;

export default { ButtonContainer };
