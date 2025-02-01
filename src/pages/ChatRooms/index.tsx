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
    socketConfig.on(
      "receive_message",
      async (data: {
        encryptedData: string;
        iv: string;
        room: string;
        senderName: string;
      }) => {
        if (!encryptionKey) return;

        try {
          // Parsiraj encryptedData i iv iz stringa u Uint8Array
          const encryptedDataArray = new Uint8Array(
            data.encryptedData.split(",").map(Number)
          );
          const ivArray = new Uint8Array(data.iv.split(",").map(Number));

          const decryptedMessage = await Encryption.decryptMessage(
            encryptedDataArray,
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

    try {
      // Učitajte poruke iz baze
      const messages = await getMessagesByRoom(room);

      // Dodajte učitane poruke u stanje
      setMessagesByRoom((prev) => ({
        ...prev,
        [room]: messages.map((msg) => ({
          text: msg.encryptedData, // Pretpostavimo da će decryptMessage biti potreban ovde
          isSentByUser: msg.senderName === username,
          senderName: msg.senderName,
        })),
      }));

      const key = await Encryption.generateAESKey();
      setEncryptionKey(key);

      const exportedKey = await Encryption.exportKey(key);
      socketConfig.emit("share_key", { room, key: Array.from(exportedKey) });
    } catch (error) {
      console.error("Error loading messages:", error);
    }
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
        encryptedData: Array.from(encryptedData).join(","),
        iv: Array.from(iv).join(","),
        room: selectedRoom,
        senderName: username,
        timestamp: new Date(),
      };

      // Emitujte poruku preko socket-a
      socketConfig.emit("send_message", messageData);

      // Spremite poruku u bazu
      await saveMessage(messageData);

      // Dodajte poruku u lokalno stanje za prikaz u UI-ju
      setMessagesByRoom((prev) => ({
        ...prev,
        [selectedRoom]: [
          ...(prev[selectedRoom] || []),
          { text: message, isSentByUser: true, senderName: username },
        ],
      }));
    } catch (error) {
      console.error("Error encrypting or saving message:", error);
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
