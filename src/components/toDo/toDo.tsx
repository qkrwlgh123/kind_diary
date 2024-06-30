import { ObjectInferface, TodoInterface } from "../../types/object";
import AddNewObject from "./newObject/addNewObject";
import Object from "./object/object";
import Style from "./toDo.style";

const Todo = ({
  handleControlModal,
  objectList,
  handleChangeAddingTodoMode,
  handleAddTodo,
  handleCompleteTodo,
}: {
  handleControlModal: () => void;
  objectList: ObjectInferface[];
  handleChangeAddingTodoMode: (objectId: number) => void;
  handleAddTodo: (objectId: number, toDo: TodoInterface) => void;
  handleCompleteTodo: (todoId: number) => void;
}) => {
  return (
    <Style.TodoContainer>
      <AddNewObject handleControlModal={handleControlModal} />

      <Style.ObjectListContainer>
        {objectList.map((object: ObjectInferface, index: number) => (
          <Object
            key={object.id}
            id={object.id}
            name={object.name}
            toDoList={object.toDoList}
            isAddingTodo={object.isAddingTodo}
            handleChangeAddingTodoMode={handleChangeAddingTodoMode}
            handleAddTodo={handleAddTodo}
            handleCompleteTodo={handleCompleteTodo}
            index={index}
          />
        ))}
      </Style.ObjectListContainer>
    </Style.TodoContainer>
  );
};

export default Todo;
