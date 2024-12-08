import { MessageContainer } from "./index.styled";

interface MessageProps {
  text: string;
  isSentByUser: boolean;
}
export default function Message({ text, isSentByUser }: MessageProps) {
  return (
    <MessageContainer isSentByUser={isSentByUser}>{text}</MessageContainer>
  );
}
