import React, { useEffect, useRef, useState } from "react";
import { TodoInterface } from "../../../pages/home/home";

const Object = ({
  id,
  name,
  toDoList,
  isAddingTodo,
  handleChangeAddingTodoMode,
  handleAddTodo,
}: {
  id: number;
  name: string;
  toDoList: TodoInterface[];
  isAddingTodo: boolean;
  handleChangeAddingTodoMode: (objectId: number) => void;
  handleAddTodo: (objectId: number, toDo: TodoInterface) => void;
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
      const prevTodoList = toDoList;
      const latestObjectId = prevTodoList[prevTodoList.length - 1]?.id || 0;

      handleAddTodo(id, { id: latestObjectId + 1, name: typedTodo });
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
      <button onClick={() => handleClickObject(id)}>
        <span>{name}</span>
      </button>
      <div>
        {toDoList.map((toDo: TodoInterface) => (
          <div key={toDo.id}>
            <span>{toDo.name}</span>
          </div>
        ))}
        {isAddingTodo && (
          <input
            ref={inputRef}
            value={typedTodo}
            onChange={handleTypingTodo}
            placeholder="할일 입력"
            onKeyDown={handlePressEnter}
          />
        )}
      </div>
    </div>
  );
};

export default Object;
