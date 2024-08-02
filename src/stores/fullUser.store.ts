import { makeAutoObservable } from "mobx";
import { FullUserInfoType } from "../models/auth";
import { userFullStorage } from "../utils/localStorage";

export interface AuthContextType {
  user?: FullUserInfoType | null;
  login: () => void;
  signout: () => void;
}

class FullUserStore {
  user?: FullUserInfoType | null = userFullStorage.getUser() || null;

  constructor() {
    makeAutoObservable(this);
  }

  login(user: FullUserInfoType) {
    userFullStorage.setUser(user);
    this.user = user;
  }

  signout() {
    userFullStorage.clearUser();
    this.user = undefined;
  }

  fullname() {
    return userFullStorage.getUser();
  }
}

const fullUserStore = new FullUserStore();
export default fullUserStore;
