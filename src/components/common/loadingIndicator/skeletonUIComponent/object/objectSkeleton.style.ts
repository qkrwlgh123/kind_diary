import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;

const ObjectSkeletonBox = styled.div`
  width: 150px;
  height: 30px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.skeletonBackground};
`;

const TodoSkeletonBox = styled.div`
  width: 350px;
  height: 20px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.skeletonBackground};
  margin: 10px 0;
`;

export default { Container, ObjectSkeletonBox, TodoSkeletonBox };
