import Style from "./toDoComponent.style";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const TodoComponent = ({ name }: { name: string }) => {
  return (
    <Style.ComponentContainer>
      <Style.LeftAreaContainer>
        <Style.CheckBox>
          <input type="checkbox" />
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
