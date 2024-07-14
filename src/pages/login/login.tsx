import { ChangeEventHandler, KeyboardEvent, useState } from "react";
import Style from "./login.style";
import { handleRequestLogin } from "../../api/user/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  /** 로그인 유저 정보 입력 상태 */
  const [userInfo, setUserInfo] = useState({ name: "", password: "" });

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
    const loginResult = await handleRequestLogin(userInfo);

    if (loginResult) {
      localStorage.setItem("token", loginResult.data);
      navigate("/");
    }
  };
  return (
    <Style.LoginContainer>
      <div>
        <label>name</label>
        <input value={userInfo.name} onChange={handleTypeUserName} />
      </div>
      <div>
        <label>password</label>
        <input
          value={userInfo.password}
          type="password"
          onChange={handleTypePassword}
        />
      </div>
      <div>
        <button onClick={handleLogin}>로그인</button>
      </div>
    </Style.LoginContainer>
  );
};

export default Login;
