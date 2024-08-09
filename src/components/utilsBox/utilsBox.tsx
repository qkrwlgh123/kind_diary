import { ForwardedRef, forwardRef, useEffect } from "react";
import ThemeToggleBtn from "./themeToggleBtn/themeToggleBtn";
import Style from "./utilsBox.style";
import { useQueryClient } from "@tanstack/react-query";
import UserInfo from "./userInfo/userInfo";
import useAuthStore from "../../store/authStore";

const UtilsBox = forwardRef(
  (
    {
      themeMode,
      handleFunc,
      handleUpdateRectValueOfUtilsBox,
      isUtilsBoxVisible,
    }: {
      themeMode: string | number;
      handleFunc: () => void;
      handleUpdateRectValueOfUtilsBox: (rectValue: number) => void;
      isUtilsBoxVisible: boolean;
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
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

    /** UillsBox의 bottom rect value 업데이트 */
    useEffect(() => {
      const rect = ref;

      if (rect && typeof rect !== "function" && rect.current) {
        handleUpdateRectValueOfUtilsBox(
          rect.current.getBoundingClientRect().bottom
        );
      }
    }, []);
    return (
      <Style.UtilsBox ref={ref} $isVisible={isUtilsBoxVisible}>
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
  }
);

export default UtilsBox;
