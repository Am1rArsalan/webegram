import io from "socket.io-client";
import { createSignal } from "solid-js";
import { Actions } from ".";
//import { SocketAgent } from "./agent/sockets-agent/SocketAgent";

export interface SocketActions {
  resetSocketConnection(): void;
}

export default function createSocketConnection(actions: Actions) {
  const socket = io("http://127.0.0.1:8080");
  const [connectionStatus, setConnectionStatus] = createSignal(
    socket.connected
  );

  socket.on("connect", () => {
    setConnectionStatus(true);
  });

  socket.on("disconnect", () => {
    setConnectionStatus(false);
  });

  Object.assign<Actions, SocketActions>(actions, {
    resetSocketConnection() {
      socket.off("connect");
      socket.off("disconnect");
    },
  });

  return connectionStatus;
}
