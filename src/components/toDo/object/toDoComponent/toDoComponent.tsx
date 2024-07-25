import Style from "./toDoComponent.style";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaRegSmile } from "react-icons/fa";
import { TodoInterface } from "../../../../types/object";
import { useEffect, useState } from "react";
import useThemeStore from "../../../../store/themeStore";

const TodoComponent = ({
  id,
  name,
  object_id,
  handleControlBottomModal,
  handleClickMenuboxInTodoComponent,
  objectColor,
  handleCompleteTodo,
  isCompleted,
}: {
  id: number | undefined;
  name: string;
  object_id: number;
  handleControlBottomModal: () => void;
  handleClickMenuboxInTodoComponent: ({
    id,
    name,
    isCompleted,
    object_id,
  }: TodoInterface) => void;
  objectColor: string;
  handleCompleteTodo: (objectId: number, todoId: number) => void;
  isCompleted?: boolean;
}) => {
  /** 메뉴박스 클릭 함수 */
  const handleClickDotsIconBox = () => {
    handleControlBottomModal();
    handleClickMenuboxInTodoComponent({ id, name, isCompleted, object_id });
  };

  /** theme 전역 상태 */
  const { themeMode } = useThemeStore();

  return (
    <Style.ComponentContainer $isLightTheme={themeMode === "light"}>
      <Style.LeftAreaContainer>
        <Style.CheckBox
          $objectColor={objectColor}
          onClick={() => {
            if (isCompleted) return;
            if (object_id && id) handleCompleteTodo(object_id, id);
          }}
        >
          {isCompleted && <FaRegSmile />}
        </Style.CheckBox>
        <div>
          <span>{name}</span>
        </div>
      </Style.LeftAreaContainer>
      <Style.DotsIconBox onClick={handleClickDotsIconBox}>
        <HiOutlineDotsHorizontal />
      </Style.DotsIconBox>
    </Style.ComponentContainer>
  );
};

export default TodoComponent;
