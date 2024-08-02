// src/stores/avatarStore.ts
import { makeAutoObservable } from "mobx";
import * as API from "../api/Api";

class AvatarStore {
  imageUrl: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAvatar() {
    const response = await API.retrieveUser();
    this.setImageUrl(
      `${import.meta.env.VITE_API_URL}/files/` + response.data.avatar
    );
  }

  async refreshAvatar() {
    try {
      const response = await API.retrieveUser();
      this.setImageUrl(
        `${import.meta.env.VITE_API_URL}/files/` + response.data.avatar
      );
    } catch (error) {
      console.error("Error refreshing avatar:", error);
    }
  }

  setImageUrl(url: string) {
    this.imageUrl = url;
  }

  clearAvatar() {
    this.setImageUrl("");
  }
}

const avatarStore = new AvatarStore();
export default avatarStore;
