import { useParams } from "solid-app-router";
import { Component } from "solid-js";
import { MessageWithoutAvatar } from "./Chat";
import ChatInputForm from "./ChatInputForm";
import Members from "./Members";
import styles from "./styles/Chat.module.css";

function Channel() {
  const params = useParams();

  return (
    <div class={styles.ChatContainer}>
      <div class={styles.ChatMain}>
        <div class={styles.ChatInfo}>
          <div class={styles.Topic}>
            Topic: <input class={styles.TopicInput} value="Awesome stuff" />
          </div>
          <div class={styles.ChannelName}>#{params.name}</div>
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
        </div>
        <ChatInputForm />
      </div>
      <Members />
    </div>
  );
}

export default Channel;
