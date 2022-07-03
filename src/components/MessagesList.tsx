import { Component, For, onMount } from "solid-js";
import { useStore } from "../store";
import { MessageWithAvatar } from "./Chat";
import styles from "./styles/Chat.module.css";

const MessagesList: Component = () => {
  const [store] = useStore();

  onMount(() => {
    const chatContainer = document.querySelector("#ChatMain") as HTMLDivElement;
    console.log("element to scroll", chatContainer);
    chatContainer.scrollTop = chatContainer?.scrollHeight;
  });

  return (
    <>
      <div>
        <div class={styles.Day}>
          <div class={styles.DayLine} />
          <div class={styles.DayText}>12/6/2018</div>
          <div class={styles.DayLine} />
        </div>
      </div>
      <For each={store.direct}>
        {(message) => {
          return (
            <MessageWithAvatar
              image={message.from.image}
              username={message.from.displayName}
              disabled={message._id === "Pending"}
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
