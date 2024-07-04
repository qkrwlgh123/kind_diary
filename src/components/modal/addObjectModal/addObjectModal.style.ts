import styled from "styled-components";

const InputContainer = styled.div`
  width: 200px;
  margin-bottom: 10px;
`;

const ObjectInput = styled.input`
  width: 100%;
  padding: 5px 10px;
  border: none;
  outline-color: ${(props) => props.theme.backgroundColor};
  border-radius: 5px;
`;

export default { InputContainer, ObjectInput };
