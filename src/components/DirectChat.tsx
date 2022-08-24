import { useParams } from "solid-app-router";
import { Show } from "solid-js";
import styles from "./styles/Chat.module.css";
import MessagesList from "./MessagesList";
import ChatInputForm from "./ChatInputForm";
import { useStore } from "../store";
import { MessageType } from "../types/message";

function DirectChat() {
  const params = useParams();
  const [store] = useStore();

  function getMessages() {
    const room = store.directs.get(`${params.email}@gmail.com`);

    if (room) {
      return room.chats;
    }

    return new Map<string, MessageType[]>();
  }

  return (
    <div class={styles.ChatContainer}>
      <div class={styles.ChatMain}>
        <div class={styles.ChatInfo}>
          <div class={styles.ChannelName}>#{`${params.email}@gmail.com`}</div>
        </div>
        <div class={styles.Messages} id="ChatMain">
          <div class={styles.EndOfMessages}>{"That's every message!"}</div>
          <Show
            when={store.directs.has(`${params.email}@gmail.com`)}
            fallback="loading..."
          >
            <MessagesList messages={getMessages()} />
          </Show>
        </div>
        <ChatInputForm />
      </div>
    </div>
  );
}

export default DirectChat;
