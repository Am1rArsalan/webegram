import dayjs from "dayjs";
import { useParams } from "solid-app-router";
import { For, Show } from "solid-js";
import { useStore } from "../store";
import { MessageType } from "../types/message";
import { MessageWithAvatar, MessageWithoutAvatar } from "./Chat";
import styles from "./styles/Chat.module.css";

function MessagesList(props: { messages?: Map<string, MessageType[]> }) {
  const [store] = useStore();
  const params = useParams();

  return (
    <Show when={props.messages !== undefined}>
      <For each={props.messages ? [...props.messages] : []}>
        {(messageGroup) => {
          const date = messageGroup[0];
          const messages = messageGroup[1];
          let previousMessage = "";
          return (
            <>
              <div>
                <div class={styles.Day}>
                  <div class={styles.DayLine} />
                  <div class={styles.DayText}>{date}</div>
                  <div class={styles.DayLine} />
                </div>
              </div>
              <For each={messages}>
                {(message) => {
                  let withoutAvatar = previousMessage === message.from;
                  previousMessage = message.from;
                  const profile = store.profile;
                  const activeDirect = store.directs.get(
                    `${params.email}@gmail.com`
                  )!;
                  if (!profile) return null;
                  return withoutAvatar ? (
                    <MessageWithoutAvatar>
                      {message.content}
                    </MessageWithoutAvatar>
                  ) : (
                    <MessageWithAvatar
                      image={
                        activeDirect.receiver._id === message.from
                          ? activeDirect.receiver.image
                          : profile.image
                      }
                      username={
                        activeDirect.receiver._id === message.from
                          ? activeDirect.receiver.displayName
                          : profile.displayName
                      }
                      createdAt={dayjs(message.created_at).format("HH:MM a")}
                    >
                      {message.content}
                    </MessageWithAvatar>
                  );
                }}
              </For>
            </>
          );
        }}
      </For>
    </Show>
  );
}

export default MessagesList;
