import { useParams, useRouteData } from "solid-app-router";
import { Component, createSignal } from "solid-js";
import { useStore } from "../store";
import { MessageWithAvatar, MessageWithoutAvatar } from "./Chat";
import styles from "./styles/Chat.module.css";
import { classNames } from "./UI/utils/classNames";

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
