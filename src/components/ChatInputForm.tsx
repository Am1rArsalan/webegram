import { useParams } from "solid-app-router";
import { Component, createSignal } from "solid-js";
import { useStore } from "../store";
import styles from "./styles/ChatInputForm.module.css";

export function scrollToEndOfList() {
  const chatContainer = document.querySelector("#ChatMain") as HTMLDivElement;
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

const ChatInputForm: Component = () => {
  const [message, setMessage] = createSignal("");
  const [_, { sendMessage }] = useStore();
  const params = useParams();

  const handleSend = (ev: Event) => {
    ev.preventDefault();
    if (message().length === 0) return;
    params.email && sendMessage(message(), params.email);

    setMessage("");
    scrollToEndOfList();
  };

  return (
    <form class={styles.ChatInputBox} onSubmit={handleSend}>
      <input
        value={message()}
        onChange={(ev) => setMessage(ev.currentTarget.value)}
        class={styles.ChatInput}
        placeholder="Message #general"
      />
    </form>
  );
};

export default ChatInputForm;
