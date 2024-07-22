import styled from "styled-components";

const TodoContainer = styled.div`
  width: 50%;
  margin: -40px 0 0 40px;
  @media (max-width: 950px) {
    width: 100%;
    margin: 0;
    padding: 0 15px;
  }
`;

const SelectedDateBox = styled.div`
  margin-bottom: 20px;
  font-size: 17px;
`;

const ObjectListContainer = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

export default { TodoContainer, SelectedDateBox, ObjectListContainer };
