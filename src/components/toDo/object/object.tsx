import React, { useEffect, useRef, useState } from "react";
import { TodoInterface } from "../../../types/object";
import Button from "../../common/button/button";
import Style from "./object.style";
import TodoComponent from "./toDoComponent/toDoComponent";
import { getObjectBgColor } from "../../../utils/colorUtils";

const Object = ({
  id,
  name,
  handleControlBottomModal,
  handleClickMenuboxInTodoComponent,
  toDoList,
  isAddingTodo,
  handleChangeAddingTodoMode,
  handleAddTodo,
  handleUpdateTodo,
  handleCompleteTodo,

  index,
}: {
  id: number;
  name: string;
  handleControlBottomModal: () => void;
  handleClickMenuboxInTodoComponent: ({
    id,
    name,
    isCompleted,
  }: TodoInterface) => void;
  toDoList: TodoInterface[];
  isAddingTodo: boolean;
  handleChangeAddingTodoMode: (objectId: number) => void;
  handleAddTodo: (objectId: number, toDo: TodoInterface) => void;
  handleUpdateTodo: (todoId: number, name: string) => void;
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

  /** 수정을 위한 입력 중인 할일 */
  const [typedTodoForUpdate, setTypedTodoForUpdate] = useState("");

  /** 할일 수정을 위한 입력 함수 */
  const handleTypingTodoForUpdate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTypedTodoForUpdate(event.target.value);
  };

  /** 입력 중 엔터키 누를 시 할일이 추가 또는 수정되는 함수 */
  const handlePressEnter = (event: React.KeyboardEvent) => {
    if (event.nativeEvent.isComposing) {
      return;
    }

    if (event.key === "Enter") {
      if (!typedTodo && !typedTodoForUpdate) return;

      if (
        toDoList
          .map((todo) => todo.name)
          .includes(typedTodo || typedTodoForUpdate)
      ) {
        alert("이미 존재하는 할일입니다.");
        return;
      }

      /** 할일 수정일 시 */
      const todoId = toDoList.find((todo) => todo.isUpdatingTodo === true)?.id;
      if (todoId) {
        handleUpdateTodo(todoId, typedTodoForUpdate);
        setTypedTodoForUpdate("");
        return;
      }

      /** 할일 추가일 시 */
      handleAddTodo(id, { name: typedTodo });
      setTypedTodo("");
    }
  };

  /** Input 창에 대한 참조 생성 */
  const inputRef = useRef<HTMLInputElement>(null);
  const updatedIntpuRef = useRef<HTMLInputElement>(null);

  /** 할일 추가 모드 시 effect */
  useEffect(() => {
    if (isAddingTodo && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingTodo]);

  /** 할일 수정 모드 시 effect */
  useEffect(() => {
    if (updatedIntpuRef.current) {
      updatedIntpuRef.current.focus();
    }
    const updatingTodo = toDoList.find((todo) => todo.isUpdatingTodo);
    if (updatingTodo) {
      setTypedTodoForUpdate(updatingTodo.name);
    }
  }, [toDoList]);

  return (
    <div>
      <Button onClickFunc={() => handleClickObject(id)} index={index}>
        {name}
      </Button>
      <div>
        <Style.TodoListContainer>
          {toDoList.map((toDo: TodoInterface) =>
            toDo.isUpdatingTodo ? (
              <Style.InputTodoBox key={toDo.id}>
                <Style.InputTodo
                  $isVisible={toDo.isUpdatingTodo}
                  ref={updatedIntpuRef}
                  value={typedTodoForUpdate}
                  onChange={handleTypingTodoForUpdate}
                  placeholder="할 일 입력"
                  onKeyDown={handlePressEnter}
                />
                <Style.InputTodoBorder
                  $isVisible={toDo.isUpdatingTodo}
                  $fontColor={getObjectBgColor(index)}
                />
              </Style.InputTodoBox>
            ) : (
              <TodoComponent
                key={toDo.id}
                id={toDo.id}
                name={toDo.name}
                handleControlBottomModal={handleControlBottomModal}
                handleClickMenuboxInTodoComponent={
                  handleClickMenuboxInTodoComponent
                }
                isCompleted={toDo.isCompleted}
                handleCompleteTodo={handleCompleteTodo}
                objectColor={getObjectBgColor(index)}
              />
            )
          )}
        </Style.TodoListContainer>
        <Style.InputTodoBox>
          <Style.InputTodo
            $isVisible={isAddingTodo}
            ref={inputRef}
            value={typedTodo}
            onChange={handleTypingTodo}
            placeholder="할 일 입력"
            onKeyDown={handlePressEnter}
          />
          <Style.InputTodoBorder
            $isVisible={isAddingTodo}
            $fontColor={getObjectBgColor(index)}
          />
        </Style.InputTodoBox>
      </div>
    </div>
  );
};

export default Object;
