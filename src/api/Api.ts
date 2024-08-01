// api/apiRequest.ts
import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import axiosInstance from "./AxiosConfig";
import { getRefreshToken } from "../utils/getRefreshToken";
import { apiRoutes } from "../constants/apiConstants";
import authStore from "../stores/auth.store";
import { userFullStorage, userIdStorage } from "../utils/localStorage";
import fullUserStore from "../stores/fullUser.store";

export async function apiRequest<D = Record<string, unknown>, R = unknown>(
  method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch",
  path: string,
  input?: D,
  options?: {
    headers?: AxiosRequestHeaders;
  } & AxiosRequestConfig
) {
  try {
    let success = await refreshTokens();

    if (success) {
      const response = await axiosInstance.request<R>({
        url: path,
        method: method,
        data: input,
        headers: options?.headers,
      });
      //  console.log("Response Object:", JSON.stringify(response, null, 2)); // Log the entire response object as a string
      //  console.log("Response Data:", JSON.stringify(response.data, null, 2)); // Log the response data specifically as a string
      return response;
    } else {
      authStore.signout();
      userIdStorage.clearUser();
      fullUserStore.signout();
    }
  } catch (error: any) {
    // console.error("Error Response:", JSON.stringify(error.response, null, 2)); // Log the error response as a string
    return error.response;
  }
}

// no token req approach
export async function apiRequestNoToken<
  D = Record<string, unknown>,
  R = unknown
>(
  method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch",
  path: string,
  input?: D,
  options?: {
    headers?: AxiosRequestHeaders;
  } & AxiosRequestConfig
) {
  try {
    const response = await axiosInstance.request<R>({
      url: path,
      method: method,
      data: input,
      headers: options?.headers,
    });
    //  console.log("Response Object:", JSON.stringify(response, null, 2)); // Log the entire response object as a string
    //  console.log("Response Data:", JSON.stringify(response.data, null, 2)); // Log the response data specifically as a string
    return response;
  } catch (error: any) {
    //  console.error("Error Response:", JSON.stringify(error.response, null, 2)); // Log the error response as a string
    return error.response;
  }
}

//
// Function to refresh tokens
async function refreshTokens() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    console.error("No refresh token available");
    return false;
  }

  try {
    const response = await axiosInstance.post(apiRoutes.REFRESH_ACCESS_TOKEN, {
      token: refreshToken,
    });
    const { access_token } = response.data;

    // Update tokens in local storage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    user.access_token = access_token;
    //user.refresh_token = refresh_token;
    // mogoce : auth.user?
    localStorage.setItem("user", JSON.stringify(user));

    return true;
  } catch (error) {
    console.error("Failed to refresh tokens", error);
    return false;
  }
}

export * from "./User";
export * from "./Auctions";
