import { useParams, useRouteData } from "solid-app-router";
import { Component } from "solid-js";
import { MessageWithAvatar, MessageWithoutAvatar } from "./Chat";
import styles from "./styles/Chat.module.css";
import { classNames } from "./UI/utils/classNames";

const DirectChat: Component = () => {
  const params = useParams();
  const data = useRouteData();
  console.log("chats...", data);

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
          <MessageWithAvatar> with avatar </MessageWithAvatar>
          <MessageWithoutAvatar>chat in direct</MessageWithoutAvatar>
        </div>
        <div class={styles.ChatInputBox}>
          <input class={styles.ChatInput} placeholder="Message #general" />
        </div>
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
