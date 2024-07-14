import useStore from "../../store/authStore";
import Style from "./utilsBox.style";
import { FaMoon, FaSun } from "react-icons/fa";

const UtilsBox = ({
  themeMode,
  handleFunc,
}: {
  themeMode: string | number;
  handleFunc: () => void;
}) => {
  /** 로그아웃으로 상태 갱신하는 함수 */
  const { logOut } = useStore();

  /** 로그아웃 함수 */
  const handleLogout = () => {
    logOut();
  };
  return (
    <Style.UtilsBox>
      <Style.IconBox onClick={handleFunc}>
        {themeMode === "light" ? <FaMoon /> : <FaSun />}
      </Style.IconBox>
      <Style.LogoutButton onClick={handleLogout}>로그아웃</Style.LogoutButton>
    </Style.UtilsBox>
  );
};

export default UtilsBox;
