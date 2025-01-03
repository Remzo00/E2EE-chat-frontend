import { useEffect, useState } from "react";
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

export default function ChatRooms() {
  const chatRooms = ["General", "Tech Talk", "Gaming", "Movies", "Sports"];
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [messagesByRoom, setMessagesByRoom] = useState<{
    [room: string]: { text: string; isSentByUser: boolean }[];
  }>({});

  useEffect(() => {
    socketConfig.on(
      "receive_message",
      (data: { room: string; text: string; senderId: string }) => {
        if (data.senderId === socketConfig.id) return;

        setMessagesByRoom((prev) => {
          const roomMessages = prev[data.room] || [];
          return {
            ...prev,
            [data.room]: [
              ...roomMessages,
              { text: data.text, isSentByUser: false },
            ],
          };
        });
      }
    );

    return () => {
      socketConfig.off("receive_message");
    };
  }, []);

  const handleRoomSelect = (room: string) => {
    setSelectedRoom(room);
    socketConfig.emit("join_room", room);
  };

  const handleSendMessage = (message: string) => {
    if (!selectedRoom) return;

    const messageData = {
      text: message,
      room: selectedRoom,
      isSentByUser: true,
    };

    socketConfig.emit("send_message", messageData);

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
