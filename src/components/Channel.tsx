import { useParams } from "solid-app-router";
import { Show } from "solid-js";
import { useStore } from "../store";
import { MessageWithoutAvatar } from "./Chat";
import ChatInputForm from "./ChatInputForm";
import Members from "./Members";
import MessagesList from "./MessagesList";
import styles from "./styles/Chat.module.css";

function Channel() {
  const params = useParams();
  const [store] = useStore();

  return (
    <div class={styles.ChatContainer}>
      <div class={styles.ChatMain}>
        <div class={styles.ChatInfo}>
          <div class={styles.ChannelName}>#{params.slug}</div>
        </div>
        <div class={styles.Messages}>
          <div class={styles.EndOfMessages}>{"That's every message!"}</div>
          <div>
            <div class={styles.Day}>
              <div class={styles.DayLine} />
              <div class={styles.DayText}>12/6/2018</div>
              <div class={styles.DayLine} />
            </div>
          </div>
          <MessageWithoutAvatar> works now 1</MessageWithoutAvatar>
          <MessageWithoutAvatar> works now 2</MessageWithoutAvatar>

          <Show when={store.directs.get(`${params.email}@gmail.com`)}>
            <MessagesList
              messages={store.directs?.get(`${params.email}@gmail.com`)?.chats}
            />
          </Show>
        </div>
        <ChatInputForm />
      </div>
      <Members />
    </div>
  );
}

export default Channel;
