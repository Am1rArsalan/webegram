import { useParams, useRouteData } from "solid-app-router";
import { Component, For } from "solid-js";
import styles from "./styles/Chat.module.css";
import { classNames } from "./UI/utils/classNames";

const Chat = () => {
  return (
    <div class={classNames(styles.Message, styles.withAvatar)}>
      <div class={styles.Avatar} />
      <div class={styles.Author}>
        <div>
          <span class={styles.UserName}>Ryan Florence </span>
          <span class={styles.TimeStamp}>3:37 PM</span>
        </div>
        <div class={styles.MessageContent}>Alright, lets do this.</div>
      </div>
    </div>
  );
};

const DirectChat: Component = () => {
  const params = useParams();
  const data = useRouteData();
  console.log("chats", data);

  return (
    <div class={styles.Channel}>
      <div class={styles.ChannelMain}>
        <div class={styles.ChannelInfo}>
          {/*<div class={styles.Topic}>
            Topic: <input class={styles.TopicInput} value="Awesome stuff" />
          </div>*/}
          <div class={styles.ChannelName}>#{params.username}</div>
        </div>
        <div class={styles.Messages}>
          <div class={styles.EndOfMessages}>{"That's every message!"}</div>
          <div>
            <div class={styles.Day}>
              <div class={styles.DayLine} />
              <div class={styles.DayText}>12/6/2018</div>
              <div class={styles.DayLine} />
            </div>
            {/* remove this later  */}
            <Chat />
            <For each={data}>
              {() => {
                return <Chat />;
              }}
            </For>
          </div>
          <div>
            <div class={classNames(styles.Message, styles.noAvatar)}>
              <div class={styles.MessageContent}>works now?</div>
            </div>
          </div>
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
