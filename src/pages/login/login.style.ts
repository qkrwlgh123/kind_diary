import styled from "styled-components";
import theme from "../../styles/layout/themes";

const LoginContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  width: 250px;
  border-radius: 5px;
  border: none;
`;

const SubmitButton = styled.button`
  font-size: 15px;

  color: ${(props) => props.theme.loginButtonFontColor};
  border: none;
  font-weight: 600;
  border-radius: 5px;

  background-color: ${(props) => props.theme.loginButtonBgColor};
  width: 250px;
  padding: 10px 0;
  margin-top: 30px;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.loginButtonBgColor};

  transition: all 0.25s ease;

  &:hover {
    background-color: ${(props) => props.theme.loginButtonHoverBgColor};
    color: ${(props) => props.theme.loginButtonHoverFontColor};
    border: 1px solid ${(props) => props.theme.loginButtonHoverBgColor};
  }
`;

export default { LoginContainer, Input, SubmitButton };
