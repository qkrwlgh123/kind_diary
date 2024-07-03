import Style from "./toDoComponent.style";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaRegSmile } from "react-icons/fa";
import { TodoInterface } from "../../../../types/object";

const TodoComponent = ({
  id,
  name,
  handleControlBottomModal,
  handleClickMenuboxInTodoComponent,
  objectColor,
  handleCompleteTodo,
  isCompleted,
}: {
  id: number | undefined;
  name: string;
  handleControlBottomModal: () => void;
  handleClickMenuboxInTodoComponent: ({
    id,
    name,
    isCompleted,
  }: TodoInterface) => void;
  objectColor: string;
  handleCompleteTodo: (todoId: number) => void;
  isCompleted?: boolean;
}) => {
  /** 메뉴박스 클릭 함수 */
  const handleClickDotsIconBox = () => {
    handleControlBottomModal();
    handleClickMenuboxInTodoComponent({ id, name, isCompleted });
  };
  return (
    <Style.ComponentContainer>
      <Style.LeftAreaContainer>
        <Style.CheckBox
          $objectColor={objectColor}
          onClick={() => {
            if (id) handleCompleteTodo(id);
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
