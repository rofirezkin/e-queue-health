import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  userId: number;
  role: string;
};

export type AuthStore = {
  token: string | null;
  user: User | null;
  isHydrated: boolean;
  setToken: (token: string) => void;
  setUser: (user: User | null) => void;
  reset: () => void;
  setIsHydrate: (isHydrated: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: "",
      user: null,
      isHydrated: false,
      setIsHydrate: (isHydrated: boolean) =>
        set((state) => ({
          ...state,
          isHydrated,
        })),
      setToken: (token: string) =>
        set((state) => ({
          ...state,
          token,
        })),
      setUser: (user: User | null) =>
        set((state) => ({
          ...state,
          user,
        })),
      reset: () =>
        set((state) => ({
          ...state,
          token: "",
          user: null,
        })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => {
        return (state) => {
          console.log("Hydration complete. Setting isHydrate true...");
          state?.setIsHydrate(true);
        };
      },
    }
  )
);
