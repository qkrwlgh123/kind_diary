import { Navigate, Outlet } from "react-router-dom";
import useStore from "../../store/authStore";

interface ProtectedRouteProps {
  component: React.ReactElement;
}

const ProtectedRoute = ({ component }: ProtectedRouteProps) => {
  const { isLoggedIn } = useStore();

  if (!isLoggedIn) {
    /** 비 로그인 상태일 시, 로그인 페이지 이동 */
    return <Navigate to="/login" replace={true} />;
  }

  /** 컴포넌트 렌더링 */
  return component;
};

export default ProtectedRoute;
