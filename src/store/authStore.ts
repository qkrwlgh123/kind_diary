import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  loginSuccess: () => void;
  logOut: () => void;
}

const useStore = create<AuthState>((set) => ({
  isLoggedIn: localStorage.getItem("token") ? true : false,
  loginSuccess: () => set((state) => ({ isLoggedIn: true })),
  logOut: () => set((state) => ({ isLoggedIn: false })),
}));

export default useStore;
