import { useState } from "react";
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

export default function ChatRooms() {
  const chatRooms = ["General", "Tech Talk", "Gaming", "Movies", "Sports"];
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [messagesByRoom, setMessagesByRoom] = useState<{
    [room: string]: { text: string; isSentByUser: boolean }[];
  }>({});

  const handleRoomSelect = (room: string) => {
    setSelectedRoom(room);
  };

  const handleSendMessage = (message: string) => {
    if (!selectedRoom) return;

    setMessagesByRoom((prev) => {
      const roomMessages = prev[selectedRoom] || [];
      return {
        ...prev,
        [selectedRoom]: [
          ...roomMessages,
          { text: message, isSentByUser: true },
        ],
      };
    });

    setTimeout(() => {
      setMessagesByRoom((prev) => {
        const roomMessages = prev[selectedRoom] || [];
        return {
          ...prev,
          [selectedRoom]: [
            ...roomMessages,
            { text: `Response to: "${message}"`, isSentByUser: false },
          ],
        };
      });
    }, 1000);
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
