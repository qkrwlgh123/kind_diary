import useAuthStore from "../../../store/authStore";
import Style from "./userInfo.style";
import { FaFireAlt } from "react-icons/fa";

const UserInfo = () => {
  /** 사용자 정보 전역 상태 */
  const { username } = useAuthStore();

  return (
    <Style.UserInfoBox>
      <span>{username}</span>
      <Style.IconBox>
        <FaFireAlt />
      </Style.IconBox>
    </Style.UserInfoBox>
  );
};

export default UserInfo;
