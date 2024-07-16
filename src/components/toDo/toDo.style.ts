import styled from "styled-components";

const TodoContainer = styled.div`
  width: 50%;
  margin: -40px 0 0 40px;
  @media (max-width: 950px) {
    width: 100%;
    margin: 0;
    padding: 0 15px;
  }

  @media (min-width: 951px) {
    height: 83vh;
  }
`;

const ObjectListContainer = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;

  @media (min-width: 951px) {
    height: 100%;
    overflow-y: scroll;
  }
`;

export default { TodoContainer, ObjectListContainer };
