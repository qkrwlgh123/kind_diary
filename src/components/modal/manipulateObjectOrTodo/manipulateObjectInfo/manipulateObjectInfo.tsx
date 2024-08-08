import BottomModal from "../../../common/modal/bottom/bottomModal";
import Style from "../manipulate.style";

interface ManipulateObjectInfoProps {
  isBottomModalOpen: boolean;
  handleControlBottomModal: () => void;
  selectedObject: { id: number; name: string };
  handleDeleteObject: (objectId: number) => void;
}

const ManipulateObjectInfo: React.FC<ManipulateObjectInfoProps> = ({
  isBottomModalOpen,
  handleControlBottomModal,
  selectedObject,
  handleDeleteObject,
}) => {
  return (
    <BottomModal
      display={isBottomModalOpen ? "flex" : "none"}
      controlFunc={handleControlBottomModal}
    >
      <Style.BottonModalTitle>{selectedObject?.name}</Style.BottonModalTitle>
      <Style.ButtonsContainer>
        <Style.FuncButton
        // onClick={() => {
        //   if (selectedTodo?.id) handleChangeUpdatingTodoMode(selectedTodo.id);
        // }}
        >
          수정하기
        </Style.FuncButton>
        <Style.FuncButton
          onClick={() => {
            if (selectedObject?.id) handleDeleteObject(selectedObject.id);
          }}
        >
          삭제하기
        </Style.FuncButton>
      </Style.ButtonsContainer>
    </BottomModal>
  );
};

export default ManipulateObjectInfo;
