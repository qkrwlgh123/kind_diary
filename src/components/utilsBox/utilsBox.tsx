import useStore from "../../store/authStore";
import ThemeToggleBtn from "./themeToggleBtn/themeToggleBtn";
import Style from "./utilsBox.style";

const UtilsBox = ({
  themeMode,
  handleFunc,
}: {
  themeMode: string | number;
  handleFunc: () => void;
}) => {
  /** 로그아웃으로 상태 갱신하는 함수 */
  const { isLoggedIn, logOut } = useStore();

  /** 로그아웃 함수 */
  const handleLogout = () => {
    logOut();
  };
  return (
    <Style.UtilsBox>
      <Style.IconBox>
        <ThemeToggleBtn themeMode={themeMode} handleFunc={handleFunc} />
      </Style.IconBox>
      {isLoggedIn && (
        <Style.LogoutButton onClick={handleLogout}>로그아웃</Style.LogoutButton>
      )}
    </Style.UtilsBox>
  );
};

export default UtilsBox;
