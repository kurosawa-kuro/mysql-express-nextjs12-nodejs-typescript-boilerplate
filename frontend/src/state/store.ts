// frontend\src\state\store.ts

import { create } from "zustand";

type UserInfo = {
  avatarPath: string | null;
  createdAt: string;
  email: string;
  id: number;
  isAdmin: boolean;
  name: string;
  updatedAt: string;
};

export interface UserAuth {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  logout: () => void;
}

const getLocalStorageItem = (key: string): string | null => {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(key);
};

const setLocalStorageItem = (key: string, value: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

const removeLocalStorageItem = (key: string): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const useAuthStore = create<UserAuth>((set) => {
  const storedUserInfo = getLocalStorageItem("userInfo");
  const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  return {
    userInfo: parsedUserInfo,
    setUserInfo: (userInfo: UserInfo) => {
      setLocalStorageItem("userInfo", JSON.stringify(userInfo));
      set({ userInfo });
    },
    logout: () => {
      removeLocalStorageItem("userInfo");
      set({ userInfo: null });
    },
  };
});
