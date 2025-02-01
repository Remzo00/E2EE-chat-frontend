/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_URL } from "../../api";
export const saveMessage = async (messageData: { room: string; senderName: string; encryptedData: string; iv: string; timestamp: Date; }) => {
    try {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(`${API_URL}/api/message`, messageData, config);
      return response.data;
    } catch (error: any) {
      console.error("Error saving message:", error);
      throw new Error(error.response?.data?.message || "Failed to save message");
    }
};

export const getMessagesByRoom = async (room: string) => {
    try {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(`${API_URL}/api/messages/${room}`, config);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      throw new Error(error.response?.data?.message || "Failed to fetch messages");
    }
  };
