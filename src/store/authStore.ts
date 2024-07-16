import { create } from "zustand";

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
