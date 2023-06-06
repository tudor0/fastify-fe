import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  id: string;
};

type UserStore = {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        id: ""
      },
      setUser: (user) => set({ user }),
      clearUser: () =>
        set({
          user: {
            firstName: "",
            lastName: "",
            email: "",
            userName: "",
            id: ""
          }
        })
    }),
    {
      name: "user-storage"
    }
  )
);

export default useUserStore;
