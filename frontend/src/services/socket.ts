
import { io } from "socket.io-client";

const SOCKET_URL = 
  process.env.NODE_ENV === "production"
    ? "https://devforge-backend.onrender.com" // your Render deployment
    : "http://localhost:8080";

export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
