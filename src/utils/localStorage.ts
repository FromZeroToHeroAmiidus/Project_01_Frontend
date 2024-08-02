import { UserType } from "../models/auth";
import { FullUserInfoType } from "../models/auth";

const user_prefix = "user";

const userStorage = {
  getUser: (): UserType => {
    if (typeof window === "undefined") return {} as UserType;
    return JSON.parse(
      window.localStorage.getItem(`${user_prefix}`) as string
    ) as UserType;
  },
  setUser: (user: UserType): void => {
    window.localStorage.setItem(`${user_prefix}`, JSON.stringify(user));
  },
  clearUser: (): void => {
    window.localStorage.removeItem(`${user_prefix}`);
  },
};

export { userStorage };

const userIdStorage = {
  getUser: (): UserType => {
    if (typeof window === "undefined") return {} as UserType;
    return JSON.parse(
      window.localStorage.getItem("userID") as string
    ) as UserType;
  },
  setUser: (user: UserType): void => {
    window.localStorage.setItem("userID", JSON.stringify(user));
  },
  clearUser: (): void => {
    window.localStorage.removeItem("userID");
  },
};

export { userIdStorage };

const userFullStorage = {
  getUser: (): FullUserInfoType => {
    if (typeof window === "undefined") return {} as FullUserInfoType;
    return JSON.parse(
      window.localStorage.getItem("userFull") as string
    ) as FullUserInfoType;
  },
  setUser: (user: FullUserInfoType): void => {
    window.localStorage.setItem("userFull", JSON.stringify(user));
  },
  clearUser: (): void => {
    window.localStorage.removeItem("userFull");
  },
};

export { userFullStorage };
