import { useContext } from "react";
import { AuthContext } from "../../context";
import { Container, Header, RoomItem, RoomList } from "./index.styled";
import Button from "../Button";

interface SidebarProps {
  chatRooms: string[];
  onRoomSelect: (room: string) => void;
}

export default function Sidebar({ chatRooms, onRoomSelect }: SidebarProps) {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };
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
      <Button backgroundColor="#fff" textColor="#202020" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}
