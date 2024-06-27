import styled from "styled-components";

const ButtonBox = styled.div<{ $fontColor?: string }>`
  width: fit-content;
  padding: 10px;
  background-color: ${(props) => props.theme.buttonBgColor};
  cursor: pointer;
  border-radius: 17px;

  button {
    background: inherit;
    border: none;
    cursor: pointer;
    font-weight: ${(props) => (props.$fontColor ? 700 : 700)};
    color: ${(props) =>
      props.$fontColor ? props.$fontColor : props.theme.fontColor};
  }
`;

export default { ButtonBox };
