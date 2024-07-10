import { ObjectInferface, TodoInterface } from "../../types/object";
import ObjectSkeleton from "../common/loadingIndicator/skeletonUIComponent/object/objectSkeleton";
import AddNewObject from "./newObject/addNewObject";
import Object from "./object/object";
import Placeholder from "./placeholder/placeholder";
import Style from "./toDo.style";

const Todo = ({
  handleControlModal,
  handleControlBottomModal,
  handleClickMenuboxInTodoComponent,
  objectList,
  isRequestLoading,
  handleChangeAddingTodoMode,
  handleAddTodo,
  handleUpdateTodo,
  handleCompleteTodo,
}: {
  handleControlModal: () => void;
  handleControlBottomModal: () => void;
  handleClickMenuboxInTodoComponent: ({
    id,
    name,
    isCompleted,
  }: TodoInterface) => void;
  objectList: ObjectInferface[];
  isRequestLoading: boolean;
  handleChangeAddingTodoMode: (objectId: number) => void;
  handleAddTodo: (objectId: number, toDo: TodoInterface) => void;
  handleUpdateTodo: (todoId: number, name: string) => void;
  handleCompleteTodo: (todoId: number) => void;
}) => {
  return (
    <Style.TodoContainer>
      <AddNewObject handleControlModal={handleControlModal} />

      <Style.ObjectListContainer>
        {isRequestLoading ? (
          <ObjectSkeleton />
        ) : objectList && objectList.length > 0 ? (
          objectList.map((object: ObjectInferface, index: number) => (
            <Object
              key={object.id}
              id={object.id}
              name={object.name}
              handleControlBottomModal={handleControlBottomModal}
              handleClickMenuboxInTodoComponent={
                handleClickMenuboxInTodoComponent
              }
              toDoList={object.toDoList}
              isAddingTodo={object.isAddingTodo}
              handleChangeAddingTodoMode={handleChangeAddingTodoMode}
              handleAddTodo={handleAddTodo}
              handleUpdateTodo={handleUpdateTodo}
              handleCompleteTodo={handleCompleteTodo}
              index={index}
            />
          ))
        ) : (
          <Placeholder />
        )}
      </Style.ObjectListContainer>
    </Style.TodoContainer>
  );
};

export default Todo;
