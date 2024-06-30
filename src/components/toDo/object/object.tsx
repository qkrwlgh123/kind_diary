import React, { useEffect, useRef, useState } from "react";
import { TodoInterface } from "../../../types/object";
import Button from "../../common/button/button";
import Style from "./object.style";
import TodoComponent from "./toDoComponent/toDoComponent";
import { getFontColor } from "../../../utils/colorUtils";

const Object = ({
  id,
  name,
  toDoList,
  isAddingTodo,
  handleChangeAddingTodoMode,
  handleAddTodo,
  handleCompleteTodo,
  index,
}: {
  id: number;
  name: string;
  toDoList: TodoInterface[];
  isAddingTodo: boolean;
  handleChangeAddingTodoMode: (objectId: number) => void;
  handleAddTodo: (objectId: number, toDo: TodoInterface) => void;
  handleCompleteTodo: (todoId: number) => void;
  index: number;
}) => {
  /** 클릭시 할입 입력 필드를 생성 및 활성화하는 함수 */
  const handleClickObject = (objectId: number) => {
    handleChangeAddingTodoMode(objectId);
  };

  /** 입력 중인 할일 */
  const [typedTodo, setTypedTodo] = useState("");

  /** 할일 입력 함수 */
  const handleTypingTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypedTodo(event.target.value);
  };

  /** 입력 중 엔터키 누를 시 할일이 추가되는 함수 */
  const handlePressEnter = (event: React.KeyboardEvent) => {
    if (event.nativeEvent.isComposing) {
      return;
    }

    if (event.key === "Enter") {
      if (toDoList.map((todo) => todo.name).includes(typedTodo)) {
        alert("중복된 할일이 존재합니다.");
        return;
      }
      handleAddTodo(id, { name: typedTodo });
      setTypedTodo("");
    }
  };

  /** Input 창에 대한 참조 생성 */
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAddingTodo && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingTodo]);

  return (
    <div>
      <Button onClickFunc={() => handleClickObject(id)} index={index}>
        {name}
      </Button>
      <div>
        <Style.TodoListContainer>
          {toDoList.map((toDo: TodoInterface) => (
            <TodoComponent
              key={toDo.id}
              id={toDo.id}
              name={toDo.name}
              isCompleted={toDo.isCompleted}
              handleCompleteTodo={handleCompleteTodo}
              objectColor={getFontColor(index)}
            />
          ))}
        </Style.TodoListContainer>
        <Style.InputTodoBox>
          <Style.InputTodo
            $isAddingTodo={isAddingTodo}
            ref={inputRef}
            value={typedTodo}
            onChange={handleTypingTodo}
            placeholder="할 일 입력"
            onKeyDown={handlePressEnter}
          />
          <Style.InputTodoBorder
            $isAddingTodo={isAddingTodo}
            $fontColor={getFontColor(index)}
          />
        </Style.InputTodoBox>
      </div>
    </div>
  );
};

export default Object;
