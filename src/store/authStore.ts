import { create } from "zustand";

/** 로그인 전역 상태 및 상태 갱신 함수 */
interface AuthState {
  isLoggedIn: boolean;
  loginSuccess: (token: string) => void;
  logOut: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: localStorage.getItem("token") ? true : false,
  loginSuccess: (token: string) => {
    localStorage.setItem("token", token);
    set((state) => ({ isLoggedIn: true }));
  },
  logOut: () => {
    localStorage.removeItem("token");
    set((state) => ({ isLoggedIn: false }));
  },
}));

export default useAuthStore;
