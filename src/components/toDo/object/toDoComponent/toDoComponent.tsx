import Style from "./toDoComponent.style";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaRegSmile } from "react-icons/fa";

const TodoComponent = ({
  id,
  name,
  objectColor,
  handleCompleteTodo,
  isCompleted,
}: {
  id: number | undefined;
  name: string;
  objectColor: string;
  handleCompleteTodo: (todoId: number) => void;
  isCompleted?: boolean;
}) => {
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
      <Style.DotsIconBox>
        <HiOutlineDotsHorizontal />
      </Style.DotsIconBox>
    </Style.ComponentContainer>
  );
};

export default TodoComponent;
