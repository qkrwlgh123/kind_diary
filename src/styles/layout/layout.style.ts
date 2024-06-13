import styled from "styled-components";

const OuterLayout = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  height: 100vh;
  color: ${(props) => props.theme.fontColor};
  display: flex;
`;

const InnerLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 150px;
  width: 100%;
  height: 50%;
`;

export default { OuterLayout, InnerLayout };
