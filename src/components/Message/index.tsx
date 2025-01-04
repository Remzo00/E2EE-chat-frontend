import { Container, MessageContainer, Username } from "./index.styled";

interface MessageProps {
  text: string;
  isSentByUser: boolean;
  username: string;
}
export default function Message({
  text,
  isSentByUser,
  username,
}: MessageProps) {
  return (
    <Container isSentByUser={isSentByUser}>
      <Username>{username}</Username>
      <MessageContainer isSentByUser={isSentByUser}>{text}</MessageContainer>
    </Container>
  );
}
