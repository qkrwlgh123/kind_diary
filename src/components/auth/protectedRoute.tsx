import { Navigate, Outlet } from "react-router-dom";
import useStore from "../../store/authStore";

interface ProtectedRouteProps {
  component: React.ReactElement;
}

const ProtectedRoute = ({ component }: ProtectedRouteProps) => {
  const { isLoggedIn } = useStore();

  if (!isLoggedIn) {
    // 유저 정보가 없다면 홈으로! 혹은 로그인페이지로 가게 할 수 있음
    return <Navigate to="/login" replace={true} />;
  }

  // 유저 정보가 있다면 자식 컴포넌트를 보여줌
  return component;
};

export default ProtectedRoute;
