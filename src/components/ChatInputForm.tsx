import { Component, createSignal } from "solid-js";
import { useStore } from "../store";
import styles from "./styles/ChatInputForm.module.css";

const ChatInputForm: Component<{ to: string }> = ({ to }) => {
  const [message, setMessage] = createSignal("");
  const [_, { sendMessage }] = useStore();

  const handleSend = (
    ev: Event & { submitter: HTMLElement } & {
      currentTarget: HTMLFormElement;
      target: Element;
    }
  ) => {
    ev.preventDefault();
    if (message().length == 0) return;

    sendMessage(message(), to);
    setMessage("");
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
