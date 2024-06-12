import styled from "styled-components";

const OuterLayout = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  height: 100vh;
  color: ${(props) => props.theme.fontColor};
  display: flex;
  justify-content: center;
`;

const InnerLayout = styled.div`
  margin-top: 150px;
`;

export default { OuterLayout, InnerLayout };
