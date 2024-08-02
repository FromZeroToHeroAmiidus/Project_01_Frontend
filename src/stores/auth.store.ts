import { makeAutoObservable } from "mobx";
import { UserType } from "../models/auth";
import { userStorage } from "../utils/localStorage";

export interface AuthContextType {
  user?: UserType | null;
  login: () => void;
  signout: () => void;
}

class AuthStore {
  user?: UserType | null = userStorage.getUser() || null;
  isAuthenticated = false; // extra

  constructor() {
    makeAutoObservable(this);
  }

  login(user: UserType) {
    userStorage.setUser(user);
    this.user = user;
    this.isAuthenticated = true;
  }

  signout() {
    userStorage.clearUser();
    this.user = undefined;
    this.isAuthenticated = false;
    window.location.href = "/";
    //window.location.pathname = "/";
  }
}

const authStore = new AuthStore();
export default authStore;
