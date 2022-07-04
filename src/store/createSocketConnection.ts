import io from "socket.io-client";
import { createSignal } from "solid-js";
import { Actions } from ".";
import { SOCKET_URL } from "../constants/api";
import { StoreType } from "../types/store";

export interface SocketActions {
  resetSocketConnection(): void;
  sendMessage(content: string, to: string): void;
}

export default function createSocketConnection(
  state: StoreType,
  actions: Actions
) {
  //if (!state.token) return;

  const socket = io(SOCKET_URL, {
    query: {
      token: state.token || "",
    },
  });
  const [connectionStatus, setConnectionStatus] = createSignal(
    socket.connected
  );

  socket.on("connect", () => {
    setConnectionStatus(true);
  });

  socket.on("disconnect", () => {
    setConnectionStatus(false);
  });

  socket.on("messageCreated", ({ createdMessage, pendingItemCreationTime }) => {
    //console.log("message created", id);
    actions.revalidatePendingChat(pendingItemCreationTime, createdMessage);
  });

  socket.on("messageReceived", (createdMessage) => {
    actions.addMessage(createdMessage);
  });

  Object.assign<Actions, SocketActions>(actions, {
    resetSocketConnection() {
      socket.off("connect");
      socket.off("disconnect");
    },
    sendMessage(content: string, to: string) {
      const pendingItemCreationTime = new Date().toISOString();
      socket.emit("message", {
        from: state?.profile?._id,
        to,
        content,
        pendingItemCreationTime,
      });
      actions.createPendingChat(content, pendingItemCreationTime, to);
    },
  });

  return connectionStatus;
}
