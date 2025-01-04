import { useContext, useEffect, useState } from "react";
import {
  Container,
  MainContent,
  Header,
  Placeholder,
  ChatSection,
  MessagesContainer,
} from "./index.styled";
import Sidebar from "../../components/Sidebar";
import MessageInput from "../../components/MessageInput";
import Message from "../../components/Message";
import { socketConfig } from "../../utils/socketConfig.ts";
import { AuthContext } from "../../context/index.tsx";
import { Encryption } from "../../utils/encryption.ts";

export default function ChatRooms() {
  const chatRooms = ["General", "Tech Talk", "Gaming", "Movies", "Sports"];
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null);
  const [messagesByRoom, setMessagesByRoom] = useState<{
    [room: string]: {
      text: string;
      isSentByUser: boolean;
      senderName: string;
    }[];
  }>({});

  const { user } = useContext(AuthContext);
  const username = user?.username || "Anonymous";

  useEffect(() => {
    socketConfig.on(
      "receive_message",
      async (data: {
        encryptedData: number[];
        iv: number[];
        room: string;
        senderName: string;
      }) => {
        if (!encryptionKey) return;

        try {
          const encryptedArray = new Uint8Array(data.encryptedData);
          const ivArray = new Uint8Array(data.iv);

          const decryptedMessage = await Encryption.decryptMessage(
            encryptedArray,
            ivArray,
            encryptionKey
          );

          setMessagesByRoom((prev) => ({
            ...prev,
            [data.room]: [
              ...(prev[data.room] || []),
              {
                text: decryptedMessage,
                isSentByUser: false,
                senderName: data.senderName,
              },
            ],
          }));
        } catch (error) {
          console.error("Error decrypting message:", error);
        }
      }
    );

    return () => {
      socketConfig.off("receive_message");
    };
  }, [encryptionKey]);

  const handleRoomSelect = async (room: string) => {
    setSelectedRoom(room);
    socketConfig.emit("join_room", room);

    const key = await Encryption.generateAESKey();
    setEncryptionKey(key);

    const exportedKey = await Encryption.exportKey(key);
    socketConfig.emit("share_key", { room, key: Array.from(exportedKey) });
  };

  useEffect(() => {
    socketConfig.on(
      "receive_key",
      async (data: { room: string; key: number[] }) => {
        if (selectedRoom === data.room) {
          const importedKey = await Encryption.importKey(
            new Uint8Array(data.key)
          );
          setEncryptionKey(importedKey);
        }
      }
    );

    return () => {
      socketConfig.off("receive_key");
    };
  }, [selectedRoom]);

  const handleSendMessage = async (message: string) => {
    if (!selectedRoom || !encryptionKey) return;

    try {
      const { encryptedData, iv } = await Encryption.encryptMessage(
        message,
        encryptionKey
      );

      const messageData = {
        encryptedData: Array.from(encryptedData),
        iv: Array.from(iv),
        room: selectedRoom,
        senderName: username,
      };

      socketConfig.emit("send_message", messageData);

      setMessagesByRoom((prev) => ({
        ...prev,
        [selectedRoom]: [
          ...(prev[selectedRoom] || []),
          { text: message, isSentByUser: true, senderName: username },
        ],
      }));
    } catch (error) {
      console.error("Error encrypting message:", error);
    }
  };

  const currentMessages = selectedRoom
    ? messagesByRoom[selectedRoom] || []
    : [];

  return (
    <Container>
      <Sidebar chatRooms={chatRooms} onRoomSelect={handleRoomSelect} />
      <MainContent>
        <Header>
          {selectedRoom
            ? `Chat Room: ${selectedRoom}`
            : "Welcome to the Chat App"}
        </Header>
        {selectedRoom ? (
          <ChatSection>
            <MessagesContainer>
              {currentMessages.map((msg, index) => (
                <Message
                  key={index}
                  text={msg.text}
                  isSentByUser={msg.isSentByUser}
                  username={msg.senderName}
                />
              ))}
            </MessagesContainer>
            <MessageInput onSendMessage={handleSendMessage} />
          </ChatSection>
        ) : (
          <Placeholder>
            Select a room from the sidebar to start chatting!
          </Placeholder>
        )}
      </MainContent>
    </Container>
  );
}
