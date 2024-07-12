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
  /** 페이지가 렌더링 된 후, 지난 시간(렌더링된 후, 3초가 지나야 페이지 넘어가는 것이 가능) */
  const [isTimePassed, setIsTimePassed] = useState(false);

  /** 현재 페이지 번호 */
  const [currentPage, setCurrentPage] = useState(1);

  /** 전체 달성률 */
  const [generalAchievementResult, setGeneralAchievementResult] = useState<
    null | number
  >(null);

  /** 목표별 달성률 */
  const [eachObjectsAchievementResult, setEachObjectsAchievementResult] =
    useState<EachObjectAchievementResultInterface[]>([]);

  /** 클릭 시, 다음 페이지로 넘어가는 함수 */
  const handleFlipPage = () => {
    if (currentPage === 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  /** 전체 달성률, 목표별 달성률 쿼리 요청 */
  useEffect(() => {
    const todayDate = convertDateToString(new Date());

    const fetchData = async () => {
      if (currentPage === 1) {
        const fetchGeneralAchievementResult =
          await handleRequestGeneralAchievementResult(todayDate);
        setTimeout(() => {
          setGeneralAchievementResult(fetchGeneralAchievementResult.data);
        }, 300);
      } else if (currentPage === 2) {
        const fetchEachObjectsAchievementResult =
          await handleRequestEachObjectsAchievementResult(todayDate);

        setEachObjectsAchievementResult(fetchEachObjectsAchievementResult.data);
      }
    };
    fetchData();
  }, [currentPage]);

  /** 페이지 넘기기는 3초 후에 가능하도록 하는 Effect */
  useEffect(() => {
    setTimeout(() => {
      setIsTimePassed(true);
    }, 3000);
  }, []);
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
          <GeneralAchievementResult
            generalAchievementResult={generalAchievementResult}
            handleFlipPage={isTimePassed ? handleFlipPage : undefined}
          />
        ) : (
          <EachObjectsAchievementResult
            eachObjectsAchievementResult={eachObjectsAchievementResult}
            handleFlipPage={handleFlipPage}
          />
        )}
      </Style.ResultContainer>
    </CenterModal>
  );
};

export default AchievementResult;
