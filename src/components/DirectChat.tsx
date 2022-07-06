import { useParams } from "solid-app-router";
import { Component, createComputed } from "solid-js";
import { useStore } from "../store";
import ChatInputForm from "./ChatInputForm";
import styles from "./styles/Chat.module.css";
import MessagesList from "./MessagesList";

const DirectChat: Component = () => {
  const params = useParams();
  const [_, actions] = useStore();

  createComputed(() => {
    actions.fetchDirect(params.email);
  });

  return (
    <div class={styles.ChatContainer}>
      <div class={styles.ChatMain}>
        <div class={styles.ChatInfo}>
          {/*<div class={styles.Topic}>
            Topic: <input class={styles.TopicInput} value="Awesome stuff" />
          </div>*/}
          <div class={styles.ChannelName}>#{`${params.email}@gmail.com`}</div>
        </div>
        <div class={styles.Messages} id="ChatMain">
          <div class={styles.EndOfMessages}>{"That's every message!"}</div>
          <MessagesList />
          {/* <MessageWithoutAvatar> chat in direct </MessageWithoutAvatar> */}
        </div>
        <ChatInputForm />
      </div>
      {/*
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
      </div> */}
    </div>
  );
};

export default DirectChat;
