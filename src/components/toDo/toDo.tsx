import { ObjectInferface, TodoInterface } from "../../pages/home/home";
import AddNewObject from "./newObject/addNewObject";
import Object from "./object/object";
import Style from "./toDo.style";

const Todo = ({
  handleControlModal,
  objectList,
  handleChangeAddingTodoMode,
  handleAddTodo,
}: {
  handleControlModal: () => void;
  objectList: ObjectInferface[];
  handleChangeAddingTodoMode: (objectId: number) => void;
  handleAddTodo: (objectId: number, toDo: TodoInterface) => void;
}) => {
  return (
    <Style.TodoContainer>
      <AddNewObject handleControlModal={handleControlModal} />

      {objectList.map((object: ObjectInferface) => (
        <Object
          key={object.id}
          id={object.id}
          name={object.name}
          toDoList={object.toDoList}
          isAddingTodo={object.isAddingTodo}
          handleChangeAddingTodoMode={handleChangeAddingTodoMode}
          handleAddTodo={handleAddTodo}
        />
      ))}
    </Style.TodoContainer>
  );
};

export default Todo;
