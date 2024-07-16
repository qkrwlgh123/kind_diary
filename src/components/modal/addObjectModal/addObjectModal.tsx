import { useState } from "react";
import theme from "../../../styles/layout/themes";
import Button from "../../common/button/button";
import CenterModal from "../../common/modal/center/centerModal";
import Style from "./addObjectModal.style";
import useThemeStore from "../../../store/themeStore";

const AddObjectModal = ({
  inputRef,
  isCenterModalOpen,
  handleControlModal,
  typedObject,
  handleTypingObject,
  handleAddObject,
}: {
  inputRef: React.RefObject<HTMLInputElement>;
  isCenterModalOpen: boolean;
  handleControlModal: () => void;
  typedObject: string;
  handleTypingObject: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddObject: () => void;
}) => {
  /** theme 전역 상태 */
  const { themeMode } = useThemeStore();
  return (
    <CenterModal
      display={isCenterModalOpen ? "flex" : "none"}
      controlFunc={handleControlModal}
    >
      <div>
        <h3>새 목표 생성</h3>
      </div>
      <Style.InputContainer>
        <Style.ObjectInput
          ref={inputRef}
          placeholder="목표 입력"
          value={typedObject}
          onChange={handleTypingObject}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              if (event.nativeEvent.isComposing) {
                return;
              }
              handleAddObject();
            }
          }}
        />
      </Style.InputContainer>

      <Button
        onClickFunc={handleAddObject}
        bgColor={theme.commonColor.blue}
        specificColor={themeMode === "light" && theme.commonColor.white}
      >
        생성
      </Button>
    </CenterModal>
  );
};

export default AddObjectModal;
