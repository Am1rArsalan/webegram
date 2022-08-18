import { useParams } from "solid-app-router";
import { Component } from "solid-js";
import styles from "./styles/Chat.module.css";
import MessagesList from "./MessagesList";
import ChatInputForm from "./ChatInputForm";

function DirectChat() {
  const params = useParams();

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
        </div>
        <ChatInputForm />
      </div>
    </div>
  );
}

export default DirectChat;
