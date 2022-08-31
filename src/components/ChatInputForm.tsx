import { createSignal } from "solid-js";
import styles from "./styles/ChatInputForm.module.css";

export function scrollToEndOfList() {
  const chatContainer = document.querySelector("#ChatMain");
  if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}

type Props = {
  sendMessage(content: string): void;
};

function ChatInputForm(props: Props) {
  const [message, setMessage] = createSignal("");

  function handleSend(ev: Event) {
    ev.preventDefault();
    if (message().length === 0) return;
    props.sendMessage(message());
    setMessage("");
  }

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
}

export default ChatInputForm;
