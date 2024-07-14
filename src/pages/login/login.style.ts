import styled from "styled-components";
import theme from "../../styles/layout/themes";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  width: 250px;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  font-size: 15px;
  color: ${theme.commonColor.white};
  border: none;
  font-weight: 600;
  border-radius: 5px;
  background-color: ${theme.commonColor.blue};
  width: 250px;
  padding: 10px 0;
  margin-top: 30px;
  cursor: pointer;
  border: none;
`;

export default { LoginContainer, Input, SubmitButton };
