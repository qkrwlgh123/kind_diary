import AddNewObject from "./newObject/addNewObject";
import Object from "./object/object";
import Style from "./toDo.style";

const Todo = () => {
  return (
    <Style.TodoContainer>
      <AddNewObject />
      <Object />
    </Style.TodoContainer>
  );
};

export default Todo;
