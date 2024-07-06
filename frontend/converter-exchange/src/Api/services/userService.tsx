import { apiClient } from "../axios/api";

// Signup
export const signup = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string
) => {
  try {
    const response = await apiClient.post("/user/signup", {
      firstName: first_name,
      lastName: last_name,
      email: email,
      password: password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//signin 
export const signin = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/user/signin", {
      email: email,
      password: password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//Forgot password token request
export const forgotPassword = async (email: string) => {
  try {
    const response = await apiClient.post("/user/forgotpassword", {
      email: email,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//Token verification
export const verifyToken = async (token: string) => {
  try {
    const response = await apiClient.post("/user/resetpasswordverification", {
      token: token,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//Reset password
export const resetPassword = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/user/resetpassword", {
      email: email,
      password: password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};