import { useEffect, useRef, useState } from "react";
import ThemeToggleBtn from "./themeToggleBtn/themeToggleBtn";
import Style from "./utilsBox.style";
import { useQueryClient } from "@tanstack/react-query";
import UserInfo from "./userInfo/userInfo";
import useAuthStore from "../../store/authStore";

const UtilsBox = ({
  themeMode,
  handleFunc,
}: {
  themeMode: string | number;
  handleFunc: () => void;
}) => {
  /** React Query Client */
  const queryClient = useQueryClient();

  /** 로그아웃으로 상태 갱신하는 함수 */
  const { isLoggedIn, logOut } = useAuthStore();

  /** 로그아웃 함수 */
  const handleLogout = () => {
    /** 저장된 모든 캐시데이터 삭제 */
    queryClient.clear();
    logOut();
  };

  /** UtilsBox를 참조하는 useRef */
  const utilsBoxRef = useRef<HTMLDivElement>(null);

  /** UtilsBox의 visible 상태를 결정하는 useState */
  const [isVisible, setIsVisible] = useState(true);

  /** 스크롤 위치에 따라 UtilsBox visible 상태 변경하는 effect */
  useEffect(() => {
    const handleScroll = () => {
      const utilsBox = utilsBoxRef.current!;
      if (!utilsBox) return;

      const scrollPosition = window.scrollY;

      if (scrollPosition > 55) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Style.UtilsBox ref={utilsBoxRef} $isVisible={isVisible}>
      {isLoggedIn && (
        <>
          <UserInfo />
          <Style.LogoutButton onClick={handleLogout}>
            로그아웃
          </Style.LogoutButton>
        </>
      )}
      <Style.IconBox>
        <ThemeToggleBtn themeMode={themeMode} handleFunc={handleFunc} />
      </Style.IconBox>
    </Style.UtilsBox>
  );
};

export default UtilsBox;
