import { useEffect } from "react";
import { socketConfig } from "../utils/socketConfig";
import { Encryption } from "../utils/encryption";
import { MessageType } from "../types";

interface UseChatSocketProps {
    encryptionKey: CryptoKey | null;
    onMessageReceived: (room: string, message: MessageType) => void;
    onKeyReceived: (data: { room: string; key: string }) => void;
  }

  
export function useChatSocket({ encryptionKey, onMessageReceived, onKeyReceived }: UseChatSocketProps) {
    useEffect(() => {
        if (!encryptionKey) return;
    
        const handleReceiveMessage = async (data: { room: string; encryptedData: string; iv: string; senderName: string }) => {
          try {
            const decryptedMessage = await Encryption.decryptMessage(data.encryptedData, data.iv, encryptionKey);
            onMessageReceived(data.room, {
              text: decryptedMessage,
              encryptedData: data.encryptedData,
              iv: data.iv,
              isSentByUser: false,
              senderName: data.senderName,
              timestamp: new Date(),
              room: data.room,
            });
          } catch (error) {
            console.error("Error decrypting message:", error);
          }
        };
    
        socketConfig.on("receive_message", handleReceiveMessage);
        socketConfig.on("receive_key", onKeyReceived);
    
        return () => {
          socketConfig.off("receive_message", handleReceiveMessage);
          socketConfig.off("receive_key", onKeyReceived);
        };
      }, [encryptionKey, onMessageReceived, onKeyReceived]);

}