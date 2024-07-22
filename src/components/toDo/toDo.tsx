import { ObjectInferface, TodoInterface } from "../../types/object";
import { convertDateToFullDateString } from "../../utils/dateUitls";
import ObjectSkeleton from "../common/loadingIndicator/skeletonUIComponent/object/objectSkeleton";
import AddNewObject from "./newObject/addNewObject";
import Object from "./object/object";
import Placeholder from "./placeholder/placeholder";
import Style from "./toDo.style";

const Todo = ({
  currentDate,
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
  currentDate: string;
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
      {/* 새 목표 생성 버튼 */}
      <AddNewObject handleControlModal={handleControlModal} />

      {/* 선택된 날짜에 해당하는 연-월-일 문자열 */}
      <Style.SelectedDateBox>
        <span>{convertDateToFullDateString(currentDate)}</span>
      </Style.SelectedDateBox>

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
