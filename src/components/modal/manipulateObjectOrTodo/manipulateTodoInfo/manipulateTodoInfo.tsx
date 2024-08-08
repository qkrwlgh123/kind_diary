import { TodoInterface } from "../../../../types/object";
import BottomModal from "../../../common/modal/bottom/bottomModal";
import Style from "../manipulate.style";

interface ManipulateTodoInfoProps {
  isBottomModalOpen: boolean;
  handleControlBottomModal: () => void;
  selectedTodo: TodoInterface | undefined;
  handleChangeUpdatingTodoMode: (todoId: number) => void;
  handleDeleteTodo: (objectId: number, todoId: number) => Promise<void>;
  handleUncompleteTodo: (objectId: number, todoId: number) => Promise<void>;
}

const ManipulateTodoInfo: React.FC<ManipulateTodoInfoProps> = ({
  isBottomModalOpen,
  handleControlBottomModal,
  selectedTodo,
  handleChangeUpdatingTodoMode,
  handleDeleteTodo,
  handleUncompleteTodo,
}) => {
  return (
    <BottomModal
      display={isBottomModalOpen ? "flex" : "none"}
      controlFunc={handleControlBottomModal}
    >
      <Style.BottonModalTitle>{selectedTodo?.name}</Style.BottonModalTitle>
      <Style.ButtonsContainer>
        <Style.FuncButton
          onClick={() => {
            if (selectedTodo?.id) handleChangeUpdatingTodoMode(selectedTodo.id);
          }}
        >
          수정하기
        </Style.FuncButton>
        <Style.FuncButton
          onClick={() => {
            if (selectedTodo?.object_id && selectedTodo?.id)
              handleDeleteTodo(selectedTodo.object_id, selectedTodo.id);
          }}
        >
          삭제하기
        </Style.FuncButton>
      </Style.ButtonsContainer>
      <Style.BottomModalListContainer>
        {selectedTodo?.isCompleted && (
          <div
            onClick={() => {
              if (selectedTodo?.object_id && selectedTodo?.id)
                handleUncompleteTodo(selectedTodo.object_id, selectedTodo.id);
            }}
          >
            <span>할일 미완료 처리</span>
          </div>
        )}
      </Style.BottomModalListContainer>
    </BottomModal>
  );
};

export default ManipulateTodoInfo;
