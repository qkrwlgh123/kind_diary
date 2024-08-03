import styled from "styled-components";

const ObjectInfoBox = styled.div<{ $isHoverOnObject: boolean }>`
  display: flex;
  align-items: center;

  width: fit-content;
  padding-right: ${(props) => (props.$isHoverOnObject ? "20px" : 0)};
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.7rem;
  width: 13px;
  height: 13px;

  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
  }
`;

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
  ObjectInfoBox,

  IconBox,
  TodoListContainer,
  InputTodoBox,
  InputTodo,
  InputTodoBorder,
};
