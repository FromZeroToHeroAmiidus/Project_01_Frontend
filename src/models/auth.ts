export interface UserType {
  sub: number;
  // email: string;
  iat: number;
  exp: number;
}

export type FullUserInfoType = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
};

export interface SignupUserFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: string;
}

// Define the interface for the request data
export interface ResetPasswordRequest {
  token: string;
}

// Define the interface for the response (adjust as needed based on your backend response)
export interface ResetPasswordResponse {
  message: string;
}

export interface LoginUserFields {
  email: string;
  password?: string;
}

export interface UpdatePasswordFields {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
