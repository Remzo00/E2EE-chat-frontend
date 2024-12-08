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
  const [messages, setMessages] = useState<
    { text: string; isSentByUser: boolean }[]
  >([]);

  const handleRoomSelect = (room: string) => {
    setSelectedRoom(room);
    setMessages([]); // Reset messages when switching rooms
  };

  const handleSendMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isSentByUser: true },
    ]);
    // Simulate receiving a response from the other user
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `Response to: "${message}"`, isSentByUser: false },
      ]);
    }, 1000);
  };
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
              {messages.map((msg, index) => (
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
