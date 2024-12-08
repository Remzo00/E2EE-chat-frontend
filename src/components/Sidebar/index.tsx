import { Container, Header, RoomItem, RoomList } from "./index.styled";

interface SidebarProps {
  chatRooms: string[];
  onRoomSelect: (room: string) => void;
}

export default function Sidebar({ chatRooms, onRoomSelect }: SidebarProps) {
  return (
    <Container>
      <Header>Chat Rooms</Header>
      <RoomList>
        {chatRooms.map((room, index) => (
          <RoomItem key={index} onClick={() => onRoomSelect(room)}>
            {room}
          </RoomItem>
        ))}
      </RoomList>
    </Container>
  );
}
