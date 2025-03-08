import { useContext } from "react";
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
import { saveMessage } from "../../services/message/index.ts";
import { useChatRoom } from "../../hooks/useChatRoom.ts";
import { useChatSocket } from "../../hooks/useChatSocket.ts";
import { MessageType } from "../../types/index.tsx";

export default function ChatRooms() {
  const chatRooms = ["General", "Tech Talk", "Gaming", "Movies", "Sports"];

  const { user } = useContext(AuthContext);

  const username = user?.username || "Anonymous";

  const {
    selectedRoom,
    encryptionKey,
    messagesByRoom,
    handleRoomSelect,
    setMessagesByRoom,
    setEncryptionKey,
  } = useChatRoom();

  useChatSocket({
    encryptionKey,
    onMessageReceived: (room, message) => {
      setMessagesByRoom((prev) => ({
        ...prev,
        [room]: [...(prev[room] || []), message],
      }));
    },
    onKeyReceived: async ({ room, key }) => {
      if (selectedRoom === room) {
        const importedKey = await Encryption.importKey(key);
        setEncryptionKey(importedKey);
      }
    },
  });

  const handleSendMessage = async (message: string) => {
    if (!selectedRoom || !encryptionKey) return;

    try {
      const { encryptedData, iv } = await Encryption.encryptMessage(
        message,
        encryptionKey
      );

      const messageData: MessageType = {
        encryptedData,
        iv,
        room: selectedRoom,
        senderName: username,
        timestamp: new Date(),
        text: message,
        isSentByUser: true,
      };

      await saveMessage(messageData);
      socketConfig.emit("send_message", messageData);

      setMessagesByRoom((prev) => ({
        ...prev,
        [selectedRoom]: [...(prev[selectedRoom] || []), messageData],
      }));
    } catch (error) {
      console.error("Error encrypting or sending message:", error);
    }
  };

  return (
    <Container>
      <Sidebar
        chatRooms={chatRooms}
        onRoomSelect={(room) => handleRoomSelect(room, username)}
      />
      <MainContent>
        <Header>
          {selectedRoom ? `Chat Room: ${selectedRoom}` : `Hello ${username}`}
        </Header>
        {selectedRoom ? (
          <ChatSection>
            <MessagesContainer>
              {(messagesByRoom[selectedRoom] || []).map((msg, index) => (
                <Message
                  key={index}
                  text={msg.text || ""}
                  isSentByUser={msg.isSentByUser || false}
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
