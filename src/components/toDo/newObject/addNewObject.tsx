import Style from "./addNewObject.style";

const AddNewObject = ({
  handleControlModal,
}: {
  handleControlModal: () => void;
}) => {
  return (
    <Style.ButtonContainer>
      <div onClick={handleControlModal}>
        <button>새 목표 생성</button>
      </div>
    </Style.ButtonContainer>
  );
};

export default AddNewObject;
