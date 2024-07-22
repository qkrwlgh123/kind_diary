import { create } from "zustand";

/** 로그인 전역 상태 및 상태 갱신 함수 */
interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  loginSuccess: (token: string, username: string) => void;
  logOut: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: localStorage.getItem("token") ? true : false,
  username: localStorage.getItem("token")
    ? localStorage.getItem("username")
    : null,
  loginSuccess: (token: string, username: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    set((state) => ({ isLoggedIn: true, username }));
  },
  logOut: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    set((state) => ({ isLoggedIn: false }));
  },
}));

export default useAuthStore;
