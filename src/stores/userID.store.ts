import { makeAutoObservable } from "mobx";
import { UserType } from "../models/auth";
import { userIdStorage } from "../utils/localStorage";

export interface AuthContextType {
  user?: UserType | null;
  login: () => void;
  signout: () => void;
}

class UserStore {
  user?: UserType | null = userIdStorage.getUser() || null;

  constructor() {
    makeAutoObservable(this);
  }

  login(user: UserType) {
    userIdStorage.setUser(user);
    this.user = user;
  }

  signout() {
    userIdStorage.clearUser();
    this.user = undefined;
  }
}

const userStore = new UserStore();
export default userStore;
