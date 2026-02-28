import { create } from "zustand";
import { persist } from "zustand/middleware";
import { queryClient } from "../@core/@tanstack/queryClint";
import { useNavigate } from "react-router-dom";

type User = {
  userEmail: string;
  userName?: string;
  fullName?: string;
  userId?: number;
  role: "user" | "admin";
};

type AuthState = {
  user: User | null;
  token: string | null;
  role: "user" | "admin" | "manager" | null;
  setUser: (user: User, token: string) => void;
  logout: () => void;
};

const navigate = useNavigate();

export const userAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,

      setUser: (user, token) => set({ user, token, role: user.role }),

      logout: () => {
        set({ user: null, token: null, role: null });

        queryClient.cancelQueries();
        queryClient.clear();

        navigate("/");
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        role: state.role,
      }),
    }
  )
);
