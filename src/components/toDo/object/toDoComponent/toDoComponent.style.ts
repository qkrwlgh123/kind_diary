import styled from "styled-components";

const ComponentContainer = styled.div<{ isLightTheme: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  @media (max-width: 950px) {
    width: 100%;
  }
  background-color: ${(props) => props.theme.todoComponentBgColor};

  padding: ${(props) => (props.isLightTheme ? "10px 10px" : "")};
  border-radius: 7px;
`;

const LeftAreaContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CheckBox = styled.div<{ $objectColor: string }>`
  margin-right: 10px;

  padding: 5px;
  border: 1px solid ${(props) => props.theme.fontColor};
  cursor: pointer;
  svg {
    width: 25px;
    height: 25px;
    color: ${(props) => props.$objectColor};
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DotsIconBox = styled.div`
  cursor: pointer;
`;

export default { ComponentContainer, LeftAreaContainer, CheckBox, DotsIconBox };
