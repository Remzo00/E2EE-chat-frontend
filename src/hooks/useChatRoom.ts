import { useState, useCallback } from "react";
import { MessageType } from "../types";
import {socketConfig} from "../utils/socketConfig";
import { Encryption } from "../utils/encryption";
import { getMessagesByRoom } from "../services/message";

export function useChatRoom(){
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null);
    const [messagesByRoom, setMessagesByRoom] = useState<Record<string, MessageType[]>>({});

    const handleRoomSelect = useCallback(async (room: string, username: string) => {
        setSelectedRoom(room);
        socketConfig.emit("join_room", room);
    
        try {
          const key = await Encryption.generateAESKey();
          setEncryptionKey(key);
          const exportedKey = await Encryption.exportKey(key);
          socketConfig.emit("share_key", { room, key: exportedKey });
    
          const messages: MessageType[] = await getMessagesByRoom(room);
          const decryptedMessages: MessageType[] = await Promise.all(
            messages.map(async (msg) => ({
              ...msg,
              text: await Encryption.decryptMessage(msg.encryptedData, msg.iv, key),
              isSentByUser: msg.senderName === username,
            }))
          );
    
          setMessagesByRoom((prev) => ({
            ...prev,
            [room]: decryptedMessages,
          }));
        } catch (error) {
          console.error("Error setting up room:", error);
        }
      }, []);
    
      return { selectedRoom, encryptionKey, messagesByRoom, handleRoomSelect, setMessagesByRoom, setEncryptionKey };
}