/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_URL } from "../../api";

export const registerUser = async (values: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${API_URL}/api/register`,
      values,
      config
    );
    return response.data;
  } catch (error: any) {
    console.error("Error during registration:", error);
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async (values: {
  email: string;
  password: string;
}) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(`${API_URL}/api/login`, values, config);
    return response.data;
  } catch (error: any) {
    console.error("Error during login:", error);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
