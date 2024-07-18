import styled from "styled-components";

const OuterLayout = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};

  color: ${(props) => props.theme.fontColor};
  display: flex;
`;

const InnerLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 120px;
  width: 100%;

  padding-bottom: 50px;
`;

export default { OuterLayout, InnerLayout };
