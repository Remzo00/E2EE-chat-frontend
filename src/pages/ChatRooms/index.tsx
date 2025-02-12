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
import {
  getMessagesByRoom,
  saveMessage,
} from "../../services/message/index.ts";

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
    socketConfig.on("receive_message", async (data) => {
      if (!encryptionKey) return;

      try {
        const decryptedMessage = await Encryption.decryptMessage(
          data.encryptedData,
          data.iv,
          encryptionKey
        );

        setMessagesByRoom((prev) => ({
          ...prev,
          [data.room]: [
            ...(prev[data.room] || []),
            {
              text: decryptedMessage,
              encryptedData: data.encryptedData,
              iv: data.iv,
              isSentByUser: false,
              senderName: data.senderName,
            },
          ],
        }));
      } catch (error) {
        console.error("Error decrypting message:", error);
      }
    });

    return () => {
      socketConfig.off("receive_message");
    };
  }, [encryptionKey]);

  const handleRoomSelect = async (room: string) => {
    setSelectedRoom(room);
    socketConfig.emit("join_room", room);

    try {
      const key = await Encryption.generateAESKey();
      setEncryptionKey(key);

      const exportedKey = await Encryption.exportKey(key);
      socketConfig.emit("share_key", { room, key: exportedKey });

      const messages = await getMessagesByRoom(room);

      const decryptedMessages = await Promise.all(
        messages.map(async (msg) => ({
          text: await Encryption.decryptMessage(msg.encryptedData, msg.iv, key),
          encryptedData: msg.encryptedData,
          iv: msg.iv,
          isSentByUser: msg.senderName === username,
          senderName: msg.senderName,
        }))
      );

      setMessagesByRoom((prev) => ({
        ...prev,
        [room]: decryptedMessages,
      }));
    } catch (error) {
      console.error("Error setting up room:", error);
    }
  };

  useEffect(() => {
    socketConfig.on(
      "receive_key",
      async (data: { room: string; key: string }) => {
        if (selectedRoom === data.room) {
          const importedKey = await Encryption.importKey(data.key);
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
      // Enkriptuj poruku
      const { encryptedData, iv } = await Encryption.encryptMessage(
        message,
        encryptionKey
      );

      const messageData = {
        encryptedData,
        iv,
        room: selectedRoom,
        senderName: username,
        timestamp: new Date(),
      };

      // Sačuvaj u bazu
      await saveMessage(messageData);

      // Emituj poruku
      socketConfig.emit("send_message", messageData);

      // Dodaj u lokalni state
      setMessagesByRoom((prev) => ({
        ...prev,
        [selectedRoom]: [
          ...(prev[selectedRoom] || []),
          {
            text: message,
            encryptedData,
            iv,
            isSentByUser: true,
            senderName: username,
          },
        ],
      }));
    } catch (error) {
      console.error("Error encrypting or sending message:", error);
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
          {selectedRoom ? `Chat Room: ${selectedRoom}` : `Hello ${username}`}
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
