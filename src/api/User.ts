import { apiRoutes } from "../constants/apiConstants";
import { apiRequest, apiRequestNoToken } from "./Api";

import {
  FullUserInfoType,
  UserType,
  SignupUserFields,
  ResetPasswordRequest,
  ResetPasswordResponse,
  LoginUserFields,
  UpdatePasswordFields,
} from "../models/auth";

export const signout = async () =>
  apiRequest<undefined, void>("post", apiRoutes.SIGNOUT);

export const refreshTokens = async () =>
  apiRequest<undefined, UserType>("get", apiRoutes.REFRESH_ACCESS_TOKEN);

export const login = async (data: LoginUserFields) =>
  apiRequestNoToken<LoginUserFields, FullUserInfoType>(
    "post",
    apiRoutes.NEO_LOGIN,
    data
  );

export const forgotPassword = async (data: LoginUserFields) =>
  apiRequestNoToken<LoginUserFields, FullUserInfoType>(
    "post",
    apiRoutes.RESET_PASSWORD_REQUEST,
    data
  );

export const retrieveUser = async () =>
  apiRequest<undefined, FullUserInfoType>("get", apiRoutes.NEO_FETCH_UNNY);

export const editUser = async (data: FullUserInfoType) =>
  apiRequest<FullUserInfoType, void>("patch", apiRoutes.UPDATE_USER, data);

export const signup = async (data: SignupUserFields) =>
  apiRequestNoToken<SignupUserFields, SignupUserFields>(
    "post",
    apiRoutes.NEO_SIGNUP, //apiRoutes.SIGNUP,
    data
  );

export const updatePassword = async (data: UpdatePasswordFields) =>
  apiRequest<UpdatePasswordFields, UpdatePasswordFields>(
    "patch",
    apiRoutes.NEO_UPDATE_PASSWORD,
    data
  );

export const changeProfilePicture = async (formData: FormData) =>
  apiRequest<FormData, void>(
    "patch",
    apiRoutes.CHANGE_PROFILE_PICTURE,
    formData
  );

export const resetPassword = (data: ResetPasswordRequest) =>
  apiRequestNoToken<ResetPasswordRequest, ResetPasswordResponse>(
    "post",
    apiRoutes.RESET_PASSWORD_CONFIRM,
    data
  );
