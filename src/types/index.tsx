export type User = {
  username: string;
  email: string;
  password: string;
};

export type MessageType = {
  room: string;
  senderName: string;
  encryptedData: string;
  iv: string;
  timestamp: Date;
  text?: string;
  isSentByUser?: boolean;
};
