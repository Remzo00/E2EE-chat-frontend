import { io } from "socket.io-client";

const SOCKET_URL = 'http://localhost:3000';

export const socketConfig = io(SOCKET_URL, {
  transports: ['websocket'],
  reconnection: true,
})

