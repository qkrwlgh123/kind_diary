import { useState } from "react";
import Style from "./login.style";
import { handleRequestLogin } from "../../api/user/login";
import { useNavigate } from "react-router-dom";
import { UserLoginInfo } from "../../types/user";
import useStore from "../../store/authStore";

const Login = () => {
  const navigate = useNavigate();

  /** 로그인 성공 시, 상태 갱신하는 zustand 함수 */
  const { loginSuccess } = useStore();

  /** 로그인 유저 정보 입력 상태 */
  const [userInfo, setUserInfo] = useState<UserLoginInfo>({
    name: "",
    password: "",
  });

  /** 유저 이름 입력 함수 */
  const handleTypeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, name: event.target.value }));
  };

  /** 유저 비밀번호 입력 함수 */
  const handleTypePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, password: event.target.value }));
  };

  /** 로그인 요청 함수 */
  const handleLogin = async () => {
    if (!userInfo.name || !userInfo.password) {
      alert("로그인 정보를 입력해주세요.");
      return;
    }

    const loginResult = await handleRequestLogin(userInfo);

    if (loginResult?.code === 200) {
      localStorage.setItem("token", loginResult.data);

      loginSuccess();
      navigate("/", { replace: true });
    } else {
      alert("로그인 정보를 다시 확인해주세요.");
    }
  };

  return (
    <Style.LoginContainer>
      <h1>로그인</h1>
      <div>
        <Style.Input value={userInfo.name} onChange={handleTypeUserName} />
      </div>
      <div>
        <Style.Input
          value={userInfo.password}
          type="password"
          onChange={handleTypePassword}
        />
      </div>
      <div>
        <Style.SubmitButton onClick={handleLogin}>로그인</Style.SubmitButton>
      </div>
    </Style.LoginContainer>
  );
};

export default Login;
