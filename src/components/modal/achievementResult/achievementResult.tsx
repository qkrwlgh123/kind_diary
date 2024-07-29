import { useEffect, useState } from "react";
import CenterModal from "../../common/modal/center/centerModal";
import Style from "./achievementResult.style";
import EachObjectsAchievementResult from "./eachObjectsAchievementResult/eachObjectsAchievementResult";
import GeneralAchievementResult from "./generalAchievementResult/generalAchievementResult";
import { handleRequestGeneralAchievementResult } from "../../../api/achievementResult/generalResult";
import { convertDateToString } from "../../../utils/dateUitls";
import { handleRequestEachObjectsAchievementResult } from "../../../api/achievementResult/eachObjectsResult";
import { EachObjectAchievementResultInterface } from "../../../types/achievementResult";

const AchievementResult = ({
  isAchievementResultModalOpen,
  handleControlAchievementResultModal,
}: {
  isAchievementResultModalOpen: boolean;
  handleControlAchievementResultModal: () => void;
}) => {
  /** 현재 페이지 번호 */
  const [currentPage, setCurrentPage] = useState(1);

  /** 클릭 시, 다음 페이지로 넘어가는 함수 */
  const handleFlipPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <CenterModal
      display={isAchievementResultModalOpen ? "flex" : "none"}
      top={250}
      controlFunc={handleControlAchievementResultModal}
      isForbidExternalClick={true}
      isHideCloseButton={currentPage === 1 ? true : false}
    >
      <Style.ResultContainer>
        {currentPage === 1 ? (
          <GeneralAchievementResult handleFlipPage={handleFlipPage} />
        ) : (
          <EachObjectsAchievementResult />
        )}
      </Style.ResultContainer>
    </CenterModal>
  );
};

export default AchievementResult;
