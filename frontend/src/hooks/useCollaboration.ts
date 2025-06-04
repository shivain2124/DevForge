import { useEffect, useRef, useState } from "react";
import { socket } from "../services/socket";

// TypeScript signature; remove types if using JS
export function useCollaboration(
  roomId: string,
  userId: string,
  onRemoteCode: (code: string) => void
) {
  const [users, setUsers] = useState<string[]>([]);

  // Store handlers in ref to avoid stale closures
  const handlers = useRef({
    handleCodeUpdate: (newCode: string) => onRemoteCode(newCode),
    handleRoomUsers: (userList: string[]) => setUsers(userList),
  });

  // Update code handler if onRemoteCode changes
  useEffect(() => {
    handlers.current.handleCodeUpdate = (newCode) => onRemoteCode(newCode);
  }, [onRemoteCode]);

  useEffect(() => {
    const { handleCodeUpdate, handleRoomUsers } = handlers.current;

    // Connect if not already
    if (!socket.connected) socket.connect();

    // Join the room
    socket.emit("join_room", { roomId, userId });

    // Listen for code and user updates
    socket.on("code_update", handleCodeUpdate);
    socket.on("room_users", handleRoomUsers);

    // Cleanup on unmount or room/user change
    return () => {
      socket.off("code_update", handleCodeUpdate);
      socket.off("room_users", handleRoomUsers);
      socket.emit("leave_room", { roomId, userId });
    };
  }, [roomId, userId]);

  // Send code changes to the server
  const sendCodeChange = (newCode: string) => {
    socket.emit("code_change", { roomId, code: newCode });
  };

  // RETURN the values you want to use in your component!
  return { users, sendCodeChange };
}
