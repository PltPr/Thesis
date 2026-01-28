import api from "./api";
import { UserManagementDto, UserProfileToken } from "../Models/User";

export const loginAPI = async (email: string, password: string) => {
  try {
    const response = await api.post<UserProfileToken>("/api/account/login", {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error("Something went wrong", error);
    throw error;
  }
};

export const registerAPI = async (
  name: string,
  surname: string,
  phoneNumber: string,
  email: string,
  password: string,
  repeatPassword: string
) => {
  try {
    const response = await api.post<UserProfileToken>("/api/account/register", {
      name,
      surname,
      phoneNumber,
      email,
      password,
      repeatPassword,
    });
    return response;
  } catch (error) {
    console.error("Something went wrong", error);
    throw error;
  }
};

export const forgotPasswordApi = async (email: string) => {
  try {
    const response = await api.post("/api/account/forgot-password", {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPasswordApi = async (
  token: string,
  email: string,
  newPassword: string
) => {
  try {
    const response = await api.post("/api/account/reset-password", {
      token,
      email,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutApi = async () => {
  try {
    const response = await api.post("/api/account/logout");
    return response.data;
  } catch (err) {
    console.error("Logout error: ", err);
    throw err;
  }
};

export const getUserAboutMe = async () => {
  try {
    const response = await api.get("/api/account/GetUserAboutMe");
    return response.data;
  } catch (err) {
    console.error("getUserAboutMeError: ", err);
  }
};

export const EditUserAboutMe = async (aboutMe: string) => {
  try {
    const response = await api.put("/api/account/AccountEdit", { aboutMe });
    return response.data;
  } catch (err) {
    console.error("EditUserAboutMeError: ", err);
    throw err;
  }
};

export const GetAllUsers = async () => {
  try {
    const response = await api.get<UserManagementDto[]>("/api/account/GetAllUsers");
    return response.data;
  } catch (err) {
    console.error("getAllUsersError: ", err);
  }
};

export const AddRoleToUser = async (userId: string, role: string) => {
  try {
    const response = await api.post("/api/account/AddRole", {
      userId,
      role,
    });
    return response.data;
  } catch (err) {
    console.error("addRoleToUserError: ", err);
    throw err;
  }
};

export const DeleteRoleFromUser = async (userId: string, role: string) => {
  try {
    const response = await api.post("/api/account/DeleteRole", {
      userId,
      role,
    });
    return response.data;
  } catch (err) {
    console.error("deleteRoleFromUserError: ", err);
    throw err;
  }
};
