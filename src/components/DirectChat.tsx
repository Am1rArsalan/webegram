import { useParams } from "solid-app-router";
import { Component, createComputed, For } from "solid-js";
import { useStore } from "../store";
import { MessageWithAvatar } from "./Chat";
import ChatInputForm from "./ChatInputForm";
import styles from "./styles/Chat.module.css";
import { classNames } from "./UI/utils/classNames";

const DirectChat: Component = () => {
  const params = useParams();
  const [{ direct, profile }, { fetchDirect }] = useStore();

  createComputed(() => {
    fetchDirect(params.email);
  });

  console.log("profile is", profile);

  return (
    <div class={styles.ChatContainer}>
      <div class={styles.ChatMain}>
        <div class={styles.ChatInfo}>
          {/*<div class={styles.Topic}>
            Topic: <input class={styles.TopicInput} value="Awesome stuff" />
          </div>*/}
          <div class={styles.ChannelName}>#{`${params.email}@gmail.com`}</div>
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
          <For each={direct()}>
            {(message) => (
              <MessageWithAvatar
                image={
                  message.from == profile?._id
                    ? profile?.image
                    : message.to.image
                }
                username={
                  message.from == profile?._id
                    ? profile?.displayName
                    : message.to.displayName
                }
              >
                {message.content}
              </MessageWithAvatar>
            )}
          </For>
          {/* <MessageWithoutAvatar> chat in direct </MessageWithoutAvatar> */}
        </div>
        <ChatInputForm to={`${params.email}@gmail.com`} />
      </div>
      <div class={styles.Members}>
        <div>
          <div class={styles.Member}>
            <div class={classNames(styles.MemberStatus, styles.offline)} />
            Ryan Florence
          </div>
          <div class={styles.Member}>
            <div class={classNames(styles.MemberStatus, styles.online)} />
            cleverbot
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectChat;
