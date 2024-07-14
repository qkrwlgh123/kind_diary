import styled from "styled-components";

const UtilsBox = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 10%;
  left: 15%;
  font-size: 20px;

  @media (max-width: 950px) {
    position: absolute;
    left: 5%;
  }
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
