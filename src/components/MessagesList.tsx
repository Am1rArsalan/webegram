import dayjs from "dayjs";
import { useParams } from "solid-app-router";
import { Component, For } from "solid-js";
import { useStore } from "../store";
import { MessageWithAvatar } from "./Chat";
import styles from "./styles/Chat.module.css";

const MessagesList: Component = () => {
  const params = useParams();
  const [store] = useStore();

  return (
    <>
      <div>
        <div class={styles.Day}>
          <div class={styles.DayLine} />
          <div class={styles.DayText}>12/6/2018</div>
          <div class={styles.DayLine} />
        </div>
      </div>
      <For each={store.directs.get(`${params.email}@gmail.com`)?.chats}>
        {(message) => {
          return (
            <MessageWithAvatar
              image={message.from.image}
              username={message.from.displayName}
              disabled={message._id === "Pending"}
              createdAt={dayjs(message.created_at).format("HH:MM a")}
            >
              {message.content}
            </MessageWithAvatar>
          );
        }}
      </For>
    </>
  );
};

export default MessagesList;
