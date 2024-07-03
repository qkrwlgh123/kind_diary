import styled from "styled-components";

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 15px;
`;

const InputTodoBox = styled.div`
  position: relative;
  margin-top: 7px;
`;

const InputTodo = styled.input<{ $isVisible: boolean }>`
  display: ${(props) => (props.$isVisible ? "flex" : "none")};
  background: inherit;
  border: none;
  outline: none;
  padding-bottom: 10px;
  font-size: 16px;
  width: 75%;
  color: ${(props) => props.theme.fontColor};
  transition: border-bottom 500s ease;
`;

const InputTodoBorder = styled.span<{
  $isVisible: boolean;
  $fontColor: string;
}>`
  opacity: ${(props) => (props.$isVisible ? "1" : "0")};
  position: absolute;
  content: "";
  height: 2px;
  background: ${(props) => props.$fontColor};
  width: 75%;
  bottom: -5px;
  transition: ${(props) => (props.$isVisible ? "opacity 1.5s ease" : "none")};
`;

export default {
  TodoListContainer,
  InputTodoBox,
  InputTodo,
  InputTodoBorder,
};
