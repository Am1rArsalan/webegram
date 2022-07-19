import dayjs from "dayjs";
import { useParams } from "solid-app-router";
import { Component, For, Show } from "solid-js";
import { useStore } from "../store";
import { MessageWithAvatar } from "./Chat";
import styles from "./styles/Chat.module.css";

const MessagesList: Component = () => {
  const [store] = useStore();
  const params = useParams();

  return (
    <Show when={store.directs.get(`${params.email}@gmail.com`)}>
      <For each={[...store.directs.get(`${params.email}@gmail.com`)!.chats]}>
        {(messageGroup) => {
          const date = messageGroup[0];
          const messages = messageGroup[1];
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
                  const profile = store.profile;
                  const activeDirect = store.directs.get(
                    `${params.email}@gmail.com`
                  )!;
                  if (!profile) return null;
                  return (
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
};

export default MessagesList;
