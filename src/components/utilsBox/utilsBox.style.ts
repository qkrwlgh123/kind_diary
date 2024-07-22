import styled from "styled-components";

const UtilsBox = styled.div<{ $isVisible: boolean }>`
  display: flex;
  align-items: center;
  gap: 20px;
  position: fixed;
  top: 6%;
  left: 15%;
  font-size: 20px;

  @media (max-width: 950px) {
    position: absolute;
    left: 5%;
  }

  @media (min-width: 951px) {
    opacity: ${(props) => (props.$isVisible ? 1 : 0)};
    visibility: ${(props) => (props.$isVisible ? "visible" : "hidden")};
  }
  transition: all 0.2s ease;
`;

const IconBox = styled.div`
  cursor: pointer;

  width: fit-content;
  margin-right: 30px;
`;

const LogoutButton = styled.button`
  cursor: pointer;
  background-color: ${(props) => props.theme.buttonBgColor};
  color: ${(props) => props.theme.fontColor};
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
`;

export default { UtilsBox, IconBox, LogoutButton };
