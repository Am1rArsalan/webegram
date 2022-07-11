import io from "socket.io-client";
import { createSignal } from "solid-js";
import { Actions } from ".";
import { SOCKET_URL } from "../constants/api";
import { DirectApiType } from "../types/directs";
import { StoreType } from "../types/store";

export interface SocketActions {
  resetSocketConnection(): void;
  sendMessage(content: string, to: string): void;
  connectSocket(): void;
  emitNewDirect(data: { createdDirect: DirectApiType; userId: string }): void;
}

export default function createSocketConnection(
  state: StoreType,
  actions: Actions
) {
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

  socket.on("session", (data) => {
    socket.userId = data.userId;
  });

  socket.on("disconnect", () => {
    setConnectionStatus(false);
  });

  socket.on("direct:message-received", (createdMessage) => {
    actions.addMessage(createdMessage);
  });

  socket.on("direct:message-failed", (message) => {
    console.log(message);
  });

  socket.on("direct:new", (data) => {
    console.log("we are here baby");
    actions.receiveDirect(data);
  });

  Object.assign<Actions, SocketActions>(actions, {
    resetSocketConnection() {
      socket.off("connect");
      socket.off("disconnect");
    },
    sendMessage(content: string, to: string) {
      const direct = state.directs.get(`${to}@gmail.com`);
      direct &&
        content.length > 0 &&
        socket.emit("direct:message-send", {
          from: state?.profile?._id,
          to,
          content,
          room: direct._id,
        });
    },
    emitNewDirect(data: { createdDirect: DirectApiType; userId: string }) {
      socket.emit("direct:new", data);
    },
    connectSocket() {
      socket.connect();
    },
  });

  return connectionStatus;
}
