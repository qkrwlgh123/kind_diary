import Button from "../../common/button/button";
import Style from "./addNewObject.style";

const AddNewObject = ({
  handleControlModal,
}: {
  handleControlModal: () => void;
}) => {
  return (
    <Style.ButtonContainer>
      <Button onClickFunc={handleControlModal}>새 목표 생성</Button>
    </Style.ButtonContainer>
  );
};

export default AddNewObject;
