import { convertDateToFullDateString } from "../../../utils/dateUitls";
import Button from "../../common/button/button";
import Style from "./addNewObject.style";

const AddNewObject = ({
  handleControlModal,
  currentDate,
}: {
  currentDate: string;
  handleControlModal: () => void;
}) => {
  return (
    <Style.ButtonContainer>
      {/* 선택된 날짜에 해당하는 연-월-일 문자열 */}
      <Style.SelectedDateBox>
        <span>{convertDateToFullDateString(currentDate)}</span>
      </Style.SelectedDateBox>
      <Button onClickFunc={handleControlModal}>새 목표 생성</Button>
    </Style.ButtonContainer>
  );
};

export default AddNewObject;
