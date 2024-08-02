import axios from "axios";
import { UserData } from "../models/cookieDTO";
import authStore from "../stores/auth.store";

export const logout = async () => {
  try {
    const respond = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/signout`,
      {},
      { withCredentials: true }
    );

    console.log("Logout successful");

    // Optionally, you can also clear the stored token from localStorage here if you have any
  } catch (error) {
    //alert("Cookie is not present or it's expired ... please login!");
    console.error("Logout failed: ", error);
    return "Failure";
    throw error;
  }
};

// Function to check authentication status
export const checkAuthentication = async (): Promise<UserData> => {
  let userData: UserData;
  let error: string | null = null;

  // const fetchUserData = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/check`,
      {
        withCredentials: true,
      }
    );
    userData = response.data.user;
    return userData;
  } catch (error: any) {
    error = error.message;
    return error;
  }
  // };
};

export const refresh = async () => {
  try {
    const respond = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
      {},
      { withCredentials: true }
    );

    console.log("Refresh successful");
    alert("Uspesn refresh ... ");
    authStore.login(respond.data);

    // Optionally, you can also clear the stored token from localStorage here if you have any
  } catch (error) {
    alert(
      "Access and Refresh tokens are not present or are expired ... please login!"
    );
    console.error("Refresh failed: ", error);
    throw error;
  }
};

export const handleCreateAuction = async () => {
  const token = localStorage.getItem("user");
  if (!token) {
    console.error("No access token found");
    return;
  }
};
