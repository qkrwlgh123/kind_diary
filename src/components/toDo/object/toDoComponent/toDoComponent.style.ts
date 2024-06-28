import styled from "styled-components";

const ComponentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;

const LeftAreaContainer = styled.div`
  display: flex;
`;

const CheckBox = styled.div`
  margin-right: 5px;
  input {
    width: 15px;
    height: 15px;
  }
`;

const DotsIconBox = styled.div`
  cursor: pointer;
`;

export default { ComponentContainer, LeftAreaContainer, CheckBox, DotsIconBox };
